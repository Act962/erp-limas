import { createSettingsCatalog } from "./create";
import { listSettingsCatalog } from "./list";
import { listProducts } from "./list-products";
import { getProductAndProductsByCategory } from "./product_with_category";
import { publicSettingsCatalog } from "./public";
import { updateSettingsCatalog } from "./update";

export const catalogSettingsRouter = {
  create: createSettingsCatalog,
  list: listSettingsCatalog,
  public: publicSettingsCatalog,
  update: updateSettingsCatalog,
  relatedProducts: getProductAndProductsByCategory,
  listProducts: listProducts,
};
