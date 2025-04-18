import { Order } from '../types';
import { getProductById } from './products';

// Mock order data
export const orders: Order[] = [
  {
    id: '1',
    userId: '2',
    items: [
      {
        productId: '1',
        quantity: 1,
        product: getProductById('1')!
      },
      {
        productId: '5',
        quantity: 2,
        product: getProductById('5')!
      }
    ],
    status: 'delivered',
    totalAmount: 529.97,
    shippingAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'USA',
      phone: '555-123-4567'
    },
    paymentMethod: 'credit_card',
    createdAt: '2023-11-10T10:30:00Z',
    updatedAt: '2023-11-15T15:45:00Z',
    estimatedDelivery: '2023-11-15T00:00:00Z',
    trackingNumber: 'TRK123456789'
  },
  {
    id: '2',
    userId: '2',
    items: [
      {
        productId: '4',
        quantity: 1,
        product: getProductById('4')!
      }
    ],
    status: 'shipped',
    totalAmount: 699.99,
    shippingAddress: {
      fullName: 'John Doe',
      addressLine1: '123 Main St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94105',
      country: 'USA',
      phone: '555-123-4567'
    },
    paymentMethod: 'credit_card',
    createdAt: '2023-12-05T14:20:00Z',
    updatedAt: '2023-12-07T09:15:00Z',
    estimatedDelivery: '2023-12-12T00:00:00Z',
    trackingNumber: 'TRK987654321'
  }
];

// Get orders by user ID
export const getOrdersByUserId = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId);
};

// Get order by ID
export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};