import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, LineChart, PieChart, Package, Users, DollarSign, AlertTriangle, ShoppingBag, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { useAuthStore } from '../../store/authStore';
import { formatPrice } from '../../utils/formatters';
import { products } from '../../data/products';
import { orders } from '../../data/orders';

const AdminDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is admin
    if (isAuthenticated && user) {
      if (user.role !== 'admin') {
        navigate('/');
      }
    } else {
      navigate('/login');
    }
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [isAuthenticated, user, navigate]);
  
  // Mock analytics data
  const analyticsData = {
    totalSales: 12589.99,
    totalOrders: 128,
    totalCustomers: 85,
    lowStockProducts: products.filter(p => p.stock < 10).length,
    salesByCategory: [
      { name: 'Electronics', value: 65 },
      { name: 'Fashion', value: 20 },
      { name: 'Home', value: 10 },
      { name: 'Other', value: 5 },
    ],
    recentOrders: orders,
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80 bg-gray-200 rounded-lg"></div>
              <div className="h-80 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.name}</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 flex items-start">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(analyticsData.totalSales)}
                </p>
                <p className="text-xs text-success-600 mt-1 flex items-center">
                  <svg
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  12.5% from last month
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-start">
              <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.totalOrders}
                </p>
                <p className="text-xs text-success-600 mt-1 flex items-center">
                  <svg
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  8.2% from last month
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-start">
              <div className="p-3 rounded-full bg-accent-100 text-accent-600 mr-4">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.totalCustomers}
                </p>
                <p className="text-xs text-success-600 mt-1 flex items-center">
                  <svg
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                  5.3% from last month
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 flex items-start">
              <div className="p-3 rounded-full bg-error-100 text-error-600 mr-4">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Low Stock Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {analyticsData.lowStockProducts}
                </p>
                <p className="text-xs text-error-600 mt-1 flex items-center">
                  <svg
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                  Needs attention
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
                <select className="text-sm border rounded-md py-1 px-2">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center">
                <LineChart className="h-56 w-56 text-gray-400" />
                <p className="text-sm text-gray-500 absolute">
                  Sales chart visualization
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Category Distribution */}
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Sales by Category</h2>
                <select className="text-sm border rounded-md py-1 px-2">
                  <option>Last 30 Days</option>
                  <option>Last Quarter</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center">
                  <PieChart className="h-40 w-40 text-gray-400" />
                </div>
                <div>
                  <ul className="space-y-3">
                    {analyticsData.salesByCategory.map((category) => (
                      <li key={category.name} className="flex items-center">
                        <span
                          className={`h-3 w-3 rounded-full mr-2 ${
                            category.name === 'Electronics'
                              ? 'bg-primary-500'
                              : category.name === 'Fashion'
                              ? 'bg-secondary-500'
                              : category.name === 'Home'
                              ? 'bg-accent-500'
                              : 'bg-gray-500'
                          }`}
                        />
                        <span className="text-sm text-gray-700 flex-1">
                          {category.name}
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {category.value}%
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Orders Table */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
              <button className="text-sm text-primary-600 hover:text-primary-700">
                View All Orders
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analyticsData.recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {order.shippingAddress.fullName}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatPrice(order.totalAmount)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'delivered'
                              ? 'bg-success-100 text-success-800'
                              : order.status === 'shipped'
                              ? 'bg-primary-100 text-primary-800'
                              : order.status === 'processing'
                              ? 'bg-warning-100 text-warning-800'
                              : order.status === 'cancelled'
                              ? 'bg-error-100 text-error-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;