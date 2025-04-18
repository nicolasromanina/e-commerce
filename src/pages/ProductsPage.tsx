import React, { useState, useEffect } from 'react';
import { Filter, GridIcon, LayoutList, X } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import Button from '../components/ui/Button';
import ProductFilters from '../components/products/ProductFilters';
import Select, { SelectOption } from '../components/ui/Select';
import { Product, ProductFilterState } from '../types';
import { products as allProducts } from '../data/products';
import { AnimatePresence, motion } from 'framer-motion';

const sortOptions: SelectOption[] = [
  { value: 'latest', label: 'Latest' },
  { value: 'price-low-high', label: 'Price: Low to High' },
  { value: 'price-high-low', label: 'Price: High to Low' },
  { value: 'popular', label: 'Popularity' },
];

const ProductsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isGridView, setIsGridView] = useState(true);
  
  // Filter state
  const [filters, setFilters] = useState<ProductFilterState>({
    search: '',
    categories: [],
    minPrice: undefined,
    maxPrice: undefined,
    sort: 'latest',
    tags: [],
  });
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProducts(allProducts);
      setIsLoading(false);
    }, 500);
  }, []);
  
  const handleFilterChange = (newFilters: ProductFilterState) => {
    setFilters(newFilters);
  };
  
  // Apply filters
  const filteredProducts = products.filter((product) => {
    // Filter by search
    if (
      filters.search &&
      !product.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      !product.description.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by category
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }
    
    // Filter by price range
    if (
      (filters.minPrice !== undefined && product.price < filters.minPrice) ||
      (filters.maxPrice !== undefined && product.price > filters.maxPrice)
    ) {
      return false;
    }
    
    // Filter by tags
    if (
      filters.tags.length > 0 &&
      !filters.tags.some(tag => product.tags.includes(tag))
    ) {
      return false;
    }
    
    return true;
  });
  
  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sort) {
      case 'price-low-high':
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case 'price-high-low':
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case 'popular':
        return b.rating - a.rating;
      case 'latest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });
  
  // Update search filter
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: e.target.value });
  };
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setFilters({ ...filters, sort: value as ProductFilterState['sort'] });
  };
  
  // Toggle view mode
  const toggleViewMode = () => {
    setIsGridView(!isGridView);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-600 mt-2">Browse our collection of premium products</p>
        </div>
        
        {/* Filters & Products Layout */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Filters */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          
          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                {/* Left Side - Search & Mobile Filter Button */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="md:hidden"
                    onClick={() => setIsMobileFiltersOpen(true)}
                    icon={<Filter className="h-4 w-4" />}
                  >
                    Filters
                  </Button>
                  
                  <div className="relative w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={filters.search}
                      onChange={handleSearchChange}
                      className="w-full sm:w-64 h-10 pl-3 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    />
                    {filters.search && (
                      <button
                        onClick={() => setFilters({ ...filters, search: '' })}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Right Side - View Toggle & Sort */}
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  {/* View Toggle */}
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() => setIsGridView(true)}
                      className={`p-2 ${
                        isGridView
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                      aria-label="Grid view"
                    >
                      <GridIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setIsGridView(false)}
                      className={`p-2 ${
                        !isGridView
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-50'
                      }`}
                      aria-label="List view"
                    >
                      <LayoutList className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Sort Dropdown */}
                  <div className="w-40">
                    <Select
                      options={sortOptions}
                      value={filters.sort}
                      onChange={handleSortChange}
                      className="h-10"
                    />
                  </div>
                </div>
              </div>
              
              {/* Active Filters */}
              {(filters.categories.length > 0 ||
                filters.tags.length > 0 ||
                filters.minPrice !== undefined ||
                filters.maxPrice !== undefined) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm text-gray-500">Active filters:</span>
                    
                    {/* Category Filters */}
                    {filters.categories.map((category) => (
                      <span
                        key={category}
                        className="inline-flex items-center rounded-full bg-primary-50 px-2 py-1 text-xs font-medium text-primary-700"
                      >
                        {category}
                        <button
                          onClick={() =>
                            setFilters({
                              ...filters,
                              categories: filters.categories.filter((c) => c !== category),
                            })
                          }
                          className="ml-1 rounded-full text-primary-500 hover:text-primary-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    
                    {/* Tag Filters */}
                    {filters.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-accent-50 px-2 py-1 text-xs font-medium text-accent-700"
                      >
                        #{tag}
                        <button
                          onClick={() =>
                            setFilters({
                              ...filters,
                              tags: filters.tags.filter((t) => t !== tag),
                            })
                          }
                          className="ml-1 rounded-full text-accent-500 hover:text-accent-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    
                    {/* Price Filter */}
                    {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
                      <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                        Price: {filters.minPrice ? `$${filters.minPrice}` : '$0'} - {filters.maxPrice ? `$${filters.maxPrice}` : 'Any'}
                        <button
                          onClick={() =>
                            setFilters({
                              ...filters,
                              minPrice: undefined,
                              maxPrice: undefined,
                            })
                          }
                          className="ml-1 rounded-full text-gray-500 hover:text-gray-700"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    )}
                    
                    {/* Clear All */}
                    <button
                      onClick={() =>
                        setFilters({
                          ...filters,
                          categories: [],
                          tags: [],
                          minPrice: undefined,
                          maxPrice: undefined,
                        })
                      }
                      className="text-xs text-primary-600 hover:text-primary-800 hover:underline ml-2"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Products Count */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{sortedProducts.length}</span> of{' '}
                <span className="font-medium">{products.length}</span> products
              </p>
            </div>
            
            {/* Products Grid/List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isGridView ? 'grid' : 'list'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isGridView ? (
                  <ProductGrid products={sortedProducts} loading={isLoading} />
                ) : (
                  <div className="space-y-4">
                    {sortedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4"
                      >
                        <div className="w-full sm:w-48 h-48 flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover object-center rounded-md"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 mb-1">
                            {product.category}
                          </div>
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4">
                            {product.description}
                          </p>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center">
                              {product.discountPrice ? (
                                <>
                                  <span className="text-lg font-medium text-gray-900">
                                    ${product.discountPrice.toFixed(2)}
                                  </span>
                                  <span className="ml-2 text-sm text-gray-500 line-through">
                                    ${product.price.toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-lg font-medium text-gray-900">
                                  ${product.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <Button
                              variant="primary"
                              size="sm"
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {/* Mobile Filters Dialog */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl flex flex-col"
            >
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                isMobile
                onClose={() => setIsMobileFiltersOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;