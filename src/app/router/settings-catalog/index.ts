import { createCatalogSettings } from "./create";
import { listCatalogSettings } from "./list";

export const catalogSettingsRouter = {
  create: createCatalogSettings,
  list: listCatalogSettings,
};
