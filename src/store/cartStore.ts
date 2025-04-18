import { create } from 'zustand';
import { CartState, CartItem, Product } from '../types';
import { persist } from 'zustand/middleware';

export const useCartStore = create<CartState & {
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  closeCart: () => void;
}>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addToCart: (product, quantity) => {
        const { items } = get();
        const existingItem = items.find(item => item.productId === product.id);
        
        if (existingItem) {
          set({
            items: items.map(item => 
              item.productId === product.id 
                ? { ...item, quantity: item.quantity + quantity } 
                : item
            )
          });
        } else {
          set({
            items: [...items, { productId: product.id, quantity, product }]
          });
        }
      },
      
      removeFromCart: (productId) => {
        const { items } = get();
        set({
          items: items.filter(item => item.productId !== productId)
        });
      },
      
      updateQuantity: (productId, quantity) => {
        const { items } = get();
        if (quantity <= 0) {
          set({
            items: items.filter(item => item.productId !== productId)
          });
        } else {
          set({
            items: items.map(item => 
              item.productId === productId 
                ? { ...item, quantity } 
                : item
            )
          });
        }
      },
      
      clearCart: () => {
        set({ items: [] });
      },
      
      toggleCart: () => {
        set(state => ({ isOpen: !state.isOpen }));
      },
      
      closeCart: () => {
        set({ isOpen: false });
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);