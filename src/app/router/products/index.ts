import { createProduct } from "./create";
import { getProduct } from "./get";
import { listProducts } from "./list";

export const productsRoutes = {
  list: listProducts,
  create: createProduct,
  get: getProduct,
};
