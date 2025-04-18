import { Product } from '../types';

// Mock product data
export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'Experience premium sound quality with our wireless headphones featuring active noise cancellation and 30-hour battery life.',
    price: 299.99,
    discountPrice: 249.99,
    images: [
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Electronics',
    tags: ['headphones', 'wireless', 'premium'],
    rating: 4.8,
    stock: 45,
    featured: true,
    createdAt: '2023-05-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Smart Fitness Tracker',
    description: 'Track your fitness goals with our advanced fitness tracker. Features heart rate monitoring, sleep tracking, and smartphone notifications.',
    price: 129.99,
    discountPrice: 99.99,
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Electronics',
    tags: ['fitness', 'tracker', 'smart'],
    rating: 4.5,
    stock: 78,
    featured: true,
    createdAt: '2023-06-22T14:45:00Z'
  },
  {
    id: '3',
    name: 'Designer Leather Backpack',
    description: 'Stylish and functional leather backpack perfect for work or leisure. Features multiple compartments and durable construction.',
    price: 199.99,
    discountPrice: 159.99,
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/934673/pexels-photo-934673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Fashion',
    tags: ['backpack', 'leather', 'designer'],
    rating: 4.7,
    stock: 32,
    featured: false,
    createdAt: '2023-07-05T09:15:00Z'
  },
  {
    id: '4',
    name: 'Ultra HD Smart TV - 55"',
    description: 'Experience stunning 4K resolution with our smart TV. Features built-in streaming apps and voice control.',
    price: 799.99,
    discountPrice: 699.99,
    images: [
      'https://images.pexels.com/photos/9969230/pexels-photo-9969230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6316063/pexels-photo-6316063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Electronics',
    tags: ['tv', 'smart', '4k'],
    rating: 4.6,
    stock: 20,
    featured: true,
    createdAt: '2023-08-10T16:20:00Z'
  },
  {
    id: '5',
    name: 'Artisanal Coffee Maker',
    description: 'Brew the perfect cup of coffee with our artisanal coffee maker. Features temperature control and timer functions.',
    price: 149.99,
    discountPrice: 129.99,
    images: [
      'https://images.pexels.com/photos/6063229/pexels-photo-6063229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3551717/pexels-photo-3551717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Home',
    tags: ['coffee', 'kitchen', 'appliance'],
    rating: 4.9,
    stock: 55,
    featured: false,
    createdAt: '2023-09-01T11:00:00Z'
  },
  {
    id: '6',
    name: 'Professional DSLR Camera',
    description: 'Capture stunning photos with our professional DSLR camera. Features high resolution sensor and 4K video capabilities.',
    price: 1299.99,
    discountPrice: 1199.99,
    images: [
      'https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Electronics',
    tags: ['camera', 'photography', 'professional'],
    rating: 4.8,
    stock: 15,
    featured: true,
    createdAt: '2023-09-20T13:35:00Z'
  },
  {
    id: '7',
    name: 'Ergonomic Office Chair',
    description: 'Work comfortably with our ergonomic office chair. Features adjustable height, lumbar support, and breathable mesh back.',
    price: 249.99,
    discountPrice: 199.99,
    images: [
      'https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Furniture',
    tags: ['chair', 'office', 'ergonomic'],
    rating: 4.5,
    stock: 38,
    featured: false,
    createdAt: '2023-10-05T09:45:00Z'
  },
  {
    id: '8',
    name: 'Designer Sunglasses',
    description: 'Protect your eyes in style with our designer sunglasses. Features polarized lenses and durable frame.',
    price: 179.99,
    discountPrice: 149.99,
    images: [
      'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    category: 'Fashion',
    tags: ['sunglasses', 'designer', 'accessories'],
    rating: 4.6,
    stock: 60,
    featured: false,
    createdAt: '2023-10-25T14:20:00Z'
  }
];

// Get product details by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

// Get featured products
export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

// Get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

// Search products by query
export const searchProducts = (query: string): Product[] => {
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowerCaseQuery) || 
      product.description.toLowerCase().includes(lowerCaseQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
  );
};

// Get all categories
export const getCategories = (): string[] => {
  const categoriesSet = new Set(products.map(product => product.category));
  return Array.from(categoriesSet);
};

// Get all tags
export const getAllTags = (): string[] => {
  const tagsSet = new Set(products.flatMap(product => product.tags));
  return Array.from(tagsSet);
};