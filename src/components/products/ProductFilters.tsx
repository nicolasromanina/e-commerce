import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { getCategories, getAllTags } from '../../data/products';
import { ProductFilterState } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductFiltersProps {
  filters: ProductFilterState;
  onFilterChange: (filters: ProductFilterState) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  isMobile = false,
  onClose,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    tags: false,
  });
  
  // Get all categories and tags from data
  const categories = getCategories();
  const tags = getAllTags();
  
  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };
  
  // Update category filters
  const handleCategoryChange = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    
    onFilterChange({
      ...filters,
      categories: updatedCategories,
    });
  };
  
  // Update tag filters
  const handleTagChange = (tag: string) => {
    const updatedTags = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    
    onFilterChange({
      ...filters,
      tags: updatedTags,
    });
  };
  
  // Update price range
  const handlePriceChange = (min?: number, max?: number) => {
    onFilterChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };
  
  // Clear all filters
  const handleClearFilters = () => {
    onFilterChange({
      search: '',
      categories: [],
      minPrice: undefined,
      maxPrice: undefined,
      sort: 'latest',
      tags: [],
    });
  };
  
  const FilterSection = ({ 
    title, 
    expanded, 
    onToggle, 
    children 
  }: { 
    title: string; 
    expanded: boolean; 
    onToggle: () => void; 
    children: React.ReactNode; 
  }) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        className="flex w-full items-center justify-between py-2 text-left text-sm font-medium"
        onClick={onToggle}
      >
        <span className="text-gray-900">{title}</span>
        <ChevronDown
          className={`h-4 w-4 text-gray-500 transition-transform ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  
  const content = (
    <div className="flex flex-col h-full">
      {/* Header (mobile only) */}
      {isMobile && (
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close filters"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      )}
      
      <div className="p-4 flex-1 overflow-y-auto">
        {/* Clear Filters */}
        {(filters.categories.length > 0 ||
          filters.tags.length > 0 ||
          filters.minPrice !== undefined ||
          filters.maxPrice !== undefined) && (
          <div className="mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="text-sm"
            >
              Clear all filters
            </Button>
          </div>
        )}
        
        {/* Categories */}
        <FilterSection
          title="Categories"
          expanded={expandedSections.categories}
          onToggle={() => toggleSection('categories')}
        >
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600"
                />
                <label
                  htmlFor={`category-${category}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
        
        {/* Price Range */}
        <FilterSection
          title="Price Range"
          expanded={expandedSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="space-y-3">
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.minPrice || ''}
                onChange={(e) => 
                  handlePriceChange(
                    e.target.value ? Number(e.target.value) : undefined, 
                    filters.maxPrice
                  )
                }
                className="w-full"
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxPrice || ''}
                onChange={(e) => 
                  handlePriceChange(
                    filters.minPrice, 
                    e.target.value ? Number(e.target.value) : undefined
                  )
                }
                className="w-full"
              />
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePriceChange(undefined, undefined)}
                className="text-xs"
              >
                Reset Price
              </Button>
            </div>
          </div>
        </FilterSection>
        
        {/* Tags */}
        <FilterSection
          title="Tags"
          expanded={expandedSections.tags}
          onToggle={() => toggleSection('tags')}
        >
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                  filters.tags.includes(tag)
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {tag}
                {filters.tags.includes(tag) && (
                  <X className="ml-1 h-3 w-3" />
                )}
              </button>
            ))}
          </div>
        </FilterSection>
      </div>
      
      {/* Apply Filters Button (mobile only) */}
      {isMobile && (
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="primary"
            fullWidth
            onClick={onClose}
          >
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
  
  // Return filters in the appropriate container based on isMobile
  return isMobile ? (
    <div className="fixed inset-0 z-50 flex">
      <div className="bg-white w-full max-w-xs h-full shadow-xl flex flex-col">
        {content}
      </div>
      <div className="flex-1 bg-black bg-opacity-50" onClick={onClose} />
    </div>
  ) : (
    <div className="sticky top-24 w-full max-h-[calc(100vh-6rem)] overflow-y-auto">
      {content}
    </div>
  );
};

export default ProductFilters;