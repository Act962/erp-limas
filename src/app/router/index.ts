import { categoryRoutes } from "./category";
import { productsRoutes } from "./products";
import { catalogSettingsRouter } from "./settings-catalog";

export const router = {
  products: productsRoutes,
  categories: categoryRoutes,
  catalogSettings: catalogSettingsRouter,
};
