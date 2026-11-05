import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { Product } from '@/features/products'

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: number) => void
  clear: () => void
}

/** Client-only state (server state lives in TanStack Query). Persisted to localStorage. */
export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
              ),
            }
          }
          return { items: [...state.items, { product, quantity }] }
        }),
      removeItem: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'rsd-cart', storage: createJSONStorage(() => localStorage) },
  ),
)

// Selectors — subscribe to the narrowest slice to avoid needless re-renders.
export const selectCartCount = (s: CartState) => s.items.reduce((n, i) => n + i.quantity, 0)
