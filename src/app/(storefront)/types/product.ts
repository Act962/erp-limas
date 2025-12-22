export interface ProductCatalog {
  id: string;
  name: string;
  salePrice: number;
  description?: string;
  images?: string[];
  thumbnail: string;
  categorySlug: string;
  createdAt?: Date;
}

export interface CartItem extends Omit<ProductCatalog, "images"> {
  quantity: number;
}

export type DeliveryMethod = "delivery" | "pickup";
export type PaymentMethod = "pix" | "credit" | "debit" | "cash";
