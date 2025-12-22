import { createSettingsCatalog } from "./create";
import { listSettingsCatalog } from "./list";
import { publicSettingsCatalog } from "./public";
import { updateSettingsCatalog } from "./update";

export const catalogSettingsRouter = {
  create: createSettingsCatalog,
  list: listSettingsCatalog,
  public: publicSettingsCatalog,
  update: updateSettingsCatalog,
};
