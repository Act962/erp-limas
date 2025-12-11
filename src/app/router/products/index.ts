import { createProduct } from "./create";
import { listProducts } from "./list";

export const productsRoutes = {
  list: listProducts,
  create: createProduct,
};
