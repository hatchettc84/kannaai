import { create } from 'zustand';
import type { Product, Dispensary } from '@kannaai/shared';

export interface CartItem {
  product: Product;
  quantity: number;
  dispensaryId: string;
  dispensary: Dispensary;
  price: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  dispensary: Dispensary;
  status: 'pending' | 'confirmed' | 'ready' | 'completed' | 'cancelled';
  total: number;
  createdAt: string;
  pickupTime: string | null;
}

interface CartState {
  items: CartItem[];
  orders: Order[];
  addItem: (product: Product, dispensary: Dispensary, price: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  placeOrder: (pickupTime: string | null) => Order;
}

const createId = () => Math.random().toString(36).substring(2, 10);

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  orders: [],

  addItem: (product, dispensary, price) => {
    set((state) => {
      const existing = state.items.find(
        (i) => i.product.id === product.id && i.dispensaryId === dispensary.id
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id && i.dispensaryId === dispensary.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { product, quantity: 1, dispensaryId: dispensary.id, dispensary, price }],
      };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((i) => i.product.id !== productId),
    }));
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  placeOrder: (pickupTime) => {
    const { items, getTotal } = get();
    if (items.length === 0) throw new Error('Cart is empty');

    const order: Order = {
      id: createId(),
      items: [...items],
      dispensary: items[0].dispensary,
      status: 'confirmed',
      total: getTotal(),
      createdAt: new Date().toISOString(),
      pickupTime,
    };

    set((state) => ({
      items: [],
      orders: [order, ...state.orders],
    }));

    return order;
  },
}));
