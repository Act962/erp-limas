import { createSettingsCatalog } from "./create";
import { listSettingsCatalog } from "./list";
import { listProducts } from "./list-products";
import { loginCatalog } from "./login";
import { getProductAndProductsByCategory } from "./product_with_category";
import { publicSettingsCatalog } from "./public";
import { signupCatalog } from "./signup";
import { updateSettingsCatalog } from "./update";

export const catalogSettingsRouter = {
  create: createSettingsCatalog,
  list: listSettingsCatalog,
  public: publicSettingsCatalog,
  update: updateSettingsCatalog,
  relatedProducts: getProductAndProductsByCategory,
  listProducts: listProducts,
  loginCatalog: loginCatalog,
  signupCatalog: signupCatalog,
};
