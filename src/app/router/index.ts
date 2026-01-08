import { categoryRoutes } from "./category";
import { orgRoutes } from "./org";
import { productsRoutes } from "./products";
import { catalogSettingsRouter } from "./catalog";
import { stockRoutes } from "./stock";
import { checkoutRouter } from "./checkout";

export const router = {
  products: productsRoutes,
  categories: categoryRoutes,
  catalogSettings: catalogSettingsRouter,
  stocks: stockRoutes,
  org: orgRoutes,
  checkout: checkoutRouter,
};
