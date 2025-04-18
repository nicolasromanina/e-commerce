import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Heart, Share2, Check, Info, Truck, ShieldCheck, RefreshCw, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { getProductById, getProductsByCategory } from '../data/products';
import { Product } from '../types';
import { formatPrice, calculateDiscount } from '../utils/formatters';
import ProductCard from '../components/products/ProductCard';
import { useCartStore } from '../store/cartStore';
import { motion } from 'framer-motion';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState('description');
  
  const { addToCart } = useCartStore();
  
  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
      
      setIsLoading(true);
      setActiveImage(0);
      setQuantity(1);
      
      const fetchedProduct = getProductById(id);
      
      setTimeout(() => {
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          
          const related = getProductsByCategory(fetchedProduct.category)
            .filter((p) => p.id !== id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
        setIsLoading(false);
      }, 500);
    }
  }, [id]);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };
  
  const discountPercentage = product?.discountPrice
    ? calculateDiscount(product.price, product.discountPrice)
    : 0;
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="animate-pulse">
          <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-24 bg-gray-200 rounded w-full"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/products">
            <Button variant="primary">Browse All Products</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <nav className="flex items-center mb-8">
          <Link 
            to="/products" 
            className="flex items-center text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Products
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link 
            to={`/categories/${product.category.toLowerCase()}`} 
            className="text-sm text-gray-600 hover:text-primary-600 transition-colors"
          >
            {product.category}
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-sm text-gray-800 font-medium">
            {product.name}
          </span>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <motion.div 
              className="bg-white rounded-lg overflow-hidden mb-4 aspect-square"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={activeImage}
              transition={{ duration: 0.3 }}
            >
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </motion.div>
            
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`rounded-md overflow-hidden border-2 transition-colors ${
                    activeImage === index
                      ? 'border-primary-600'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover aspect-square"
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-2">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className={`h-4 w-4 ${
                      index < Math.floor(product.rating)
                        ? 'text-accent-300 fill-accent-300'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} stars
              </span>
            </div>
            
            <div className="mb-6">
              {product.discountPrice ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-900 mr-2">
                    {formatPrice(product.discountPrice)}
                  </span>
                  <span className="text-lg text-gray-500 line-through mr-2">
                    {formatPrice(product.price)}
                  </span>
                  <Badge variant="error" className="bg-error-100 text-error-800">
                    Save {discountPercentage}%
                  </Badge>
                </div>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="flex items-center mb-6">
              <div 
                className={`h-3 w-3 rounded-full mr-2 ${
                  product.stock > 10 
                    ? 'bg-success-500' 
                    : product.stock > 0 
                      ? 'bg-warning-500' 
                      : 'bg-error-500'
                }`}
              />
              <span className="text-sm font-medium">
                {product.stock > 10 
                  ? 'In Stock' 
                  : product.stock > 0 
                    ? `Only ${product.stock} left in stock` 
                    : 'Out of Stock'}
              </span>
            </div>
            
            <div className="mb-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center border rounded-md h-12">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-gray-800 w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  icon={<ShoppingCart className="h-5 w-5" />}
                  className="flex-1"
                >
                  Add to Cart
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  icon={<Heart className="h-5 w-5" />}
                  aria-label="Add to wishlist"
                />
                
                <Button
                  variant="outline"
                  size="lg"
                  icon={<Share2 className="h-5 w-5" />}
                  aria-label="Share product"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 rounded-full bg-primary-100 text-primary-600 mr-2">
                  <Truck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                  <p className="text-xs text-gray-600">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 rounded-full bg-primary-100 text-primary-600 mr-2">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">2-Year Warranty</p>
                  <p className="text-xs text-gray-600">Full coverage</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 rounded-full bg-primary-100 text-primary-600 mr-2">
                  <RefreshCw className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">30-Day Returns</p>
                  <p className="text-xs text-gray-600">Hassle-free returns</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 p-1 rounded-full bg-primary-100 text-primary-600 mr-2">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Authenticity Guaranteed</p>
                  <p className="text-xs text-gray-600">100% authentic products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'description'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'specifications'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
              <button
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === 'reviews'
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </nav>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="mb-4">{product.description}</p>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies
                  tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl. Nullam auctor, nisl
                  eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
                </p>
                <p className="mb-4">
                  Vivamus euismod, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget aliquam nisl nisl
                  eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget
                  aliquam nisl nisl eget nisl.
                </p>
                <div className="flex items-start mt-6 bg-primary-50 p-4 rounded-lg">
                  <Info className="h-5 w-5 text-primary-600 mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium text-primary-900 mb-1">Product Note</p>
                    <p className="text-sm text-primary-800">
                      This product comes with a 2-year warranty and free shipping on orders over $100.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Technical Specifications</h3>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 text-gray-600">Model</td>
                          <td className="py-2 text-gray-900 font-medium">MX-{product.id}-{product.name.substring(0, 3).toUpperCase()}</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 text-gray-600">Color</td>
                          <td className="py-2 text-gray-900 font-medium">Black/Silver</td>
                        </tr>
                        <tr className="border-b border-gray-200">
                          <td className="py-2 text-gray-600">Warranty</td>
                          <td className="py-2 text-gray-900 font-medium">2 Years</td>
                        </tr>
                        <tr>
                          <td className="py-2 text-gray-600">In the Box</td>
                          <td className="py-2 text-gray-900 font-medium">
                            {product.name}, User Manual, Warranty Card
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Features</h3>
                    <ul className="space-y-2">
                      {product.tags.map((tag, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-success-500 mr-2 flex-shrink-0" />
                          <span className="text-gray-700 capitalize">
                            {tag} functionality
                          </span>
                        </li>
                      ))}
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-success-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">
                          Premium quality materials
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-success-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">
                          Designed with user comfort in mind
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{product.rating}</div>
                      <div className="flex items-center justify-center mb-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={`h-5 w-5 ${
                              index < Math.floor(product.rating)
                                ? 'text-accent-300 fill-accent-300'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">Based on 24 reviews</p>
                    </div>
                    
                    <div className="mt-6">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center">
                            <span className="text-sm text-gray-600 w-6">{stars}</span>
                            <Star className="h-4 w-4 text-accent-300 fill-accent-300 mr-2" />
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-accent-300 rounded-full"
                                style={{
                                  width: `${
                                    stars === 5
                                      ? '65%'
                                      : stars === 4
                                      ? '20%'
                                      : stars === 3
                                      ? '10%'
                                      : stars === 2
                                      ? '5%'
                                      : '0%'
                                  }`,
                                }}
                              />
                            </div>
                            <span className="text-sm text-gray-600 w-10 text-right">
                              {stars === 5
                                ? '65%'
                                : stars === 4
                                ? '20%'
                                : stars === 3
                                ? '10%'
                                : stars === 2
                                ? '5%'
                                : '0%'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="mb-4 flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                      <Button variant="outline" size="sm">
                        Write a Review
                      </Button>
                    </div>
                    
                    <div className="space-y-6">
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, index) => (
                                  <Star
                                    key={index}
                                    className={`h-4 w-4 ${
                                      index < 5
                                        ? 'text-accent-300 fill-accent-300'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <h4 className="font-medium text-gray-900 mt-1">Excellent quality!</h4>
                            </div>
                            <span className="text-sm text-gray-500">2 days ago</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            I've been using this product for a week now and I'm very impressed with the
                            quality. It exceeded my expectations in every way. Highly recommended!
                          </p>
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-900">John D.</span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-600">Verified Purchase</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, index) => (
                                  <Star
                                    key={index}
                                    className={`h-4 w-4 ${
                                      index < 4
                                        ? 'text-accent-300 fill-accent-300'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <h4 className="font-medium text-gray-900 mt-1">Great product, minor issues</h4>
                            </div>
                            <span className="text-sm text-gray-500">1 week ago</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">
                            Overall a great product that does what it promises. The only small issue I had
                            was with the delivery, which was a bit delayed. Otherwise, very satisfied with
                            my purchase.
                          </p>
                          <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-900">Sarah M.</span>
                            <span className="mx-2">•</span>
                            <span className="text-gray-600">Verified Purchase</span>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <div className="text-center">
                        <Button variant="outline">Load More Reviews</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
              <Link 
                to={`/categories/${product.category.toLowerCase()}`} 
                className="text-primary-600 hover:text-primary-700 flex items-center"
              >
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;