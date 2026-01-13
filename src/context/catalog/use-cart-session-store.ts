import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartSession {
  productId: string;
  quantity: string;
}

interface CartState {
  organizationCards: Record<string, CartSession[]>;
  addToCart: (
    productId: string,
    organizationSlug: string,
    quantity: string
  ) => void;
  removeFromCart: (productId: string, organizationSlug: string) => void;
  updateQuantity: (
    productId: string,
    organizationSlug: string,
    quantity: string
  ) => void;
  clearCart: (organizationSlug: string) => void;
  getCardByOrganization: (organizationSlug: string) => CartSession[];
}

export const useCartSessionStore = create<CartState>()(
  persist(
    (set, get) => ({
      organizationCards: {},

      addToCart: (productId, organizationSlug, quantity) => {
        set((state) => ({
          organizationCards: {
            ...state.organizationCards,
            [organizationSlug]: [
              ...(state.organizationCards[organizationSlug] ?? []),
              {
                productId: productId,
                quantity,
              },
            ],
          },
        }));
      },
      removeFromCart: (productId, organizationSlug) => {
        set((state) => ({
          organizationCards: {
            ...state.organizationCards,
            [organizationSlug]: (
              state.organizationCards[organizationSlug] ?? []
            ).filter((item) => item.productId !== productId),
          },
        }));
      },

      updateQuantity: (productId, organizationSlug, quantity) => {
        set((state) => ({
          organizationCards: {
            ...state.organizationCards,
            [organizationSlug]: (
              state.organizationCards[organizationSlug] ?? []
            ).map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            ),
          },
        }));
      },
      clearCart: (organizationSlug) => {
        set(() => ({
          organizationCards: {
            ...get().organizationCards,
            [organizationSlug]: [],
          },
        }));
      },
      getCardByOrganization: (organizationSlug) => {
        return get().organizationCards[organizationSlug] ?? [];
      },
    }),
    {
      name: "funroad_card",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
