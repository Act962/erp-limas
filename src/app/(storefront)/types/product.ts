export interface ProductCatalog {
  id: string;
  name: string;
  salePrice: number;
  images?: string[];
  thumbnail: string;
  categorySlug: string;
}

export interface CartItem extends Omit<ProductCatalog, "images"> {
  cartId: string;
  quantity: number;
}
