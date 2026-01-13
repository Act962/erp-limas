import { useCartSessionStore } from "@/context/catalog/use-cart-session-store";

export function useCart(organizationSlug: string) {
  const {
    getCardByOrganization,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    organizationCards,
  } = useCartSessionStore();

  const products = getCardByOrganization(organizationSlug) ?? [];

  const toggleProduct = (productId: string, quantity: string) => {
    if (products.some((product) => product.productId === productId)) {
      removeFromCart(productId, organizationSlug);
    } else {
      addToCart(productId, organizationSlug, quantity);
    }
  };
  const isProductInCart = (productId: string) => {
    return products.some((product) => product.productId === productId);
  };

  const clearOrganizationCart = () => {
    clearCart(organizationSlug);
  };

  return {
    products,
    toggleProduct,
    isProductInCart,
    clearOrganizationCart,
    updateQuantity,
    organizationCards,
  };
}
