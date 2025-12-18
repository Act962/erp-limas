import { categoryRoutes } from "./category";
import { productsRoutes } from "./products";
import { catalogSettingsRouter } from "./settings-catalog";
import { stockRoutes } from "./stock";

export const router = {
  products: productsRoutes,
  categories: categoryRoutes,
  catalogSettings: catalogSettingsRouter,
  stocks: stockRoutes,
};
