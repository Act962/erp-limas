import { createSale } from "./create";
import { listSales } from "./list";

export const SalesRoutes = {
  list: listSales,
  create: createSale,
};
