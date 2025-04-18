// Format price to currency
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

// Format date to readable format
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Calculate discount percentage
export const calculateDiscount = (price: number, discountPrice: number): number => {
  return Math.round(((price - discountPrice) / price) * 100);
};

// Truncate text with ellipsis
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};