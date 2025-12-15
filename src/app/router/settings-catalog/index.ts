import { createSettingsCatalog } from "./create";
import { listSettingsCatalog } from "./list";
import { updateSettingsCatalog } from "./update";

export const catalogSettingsRouter = {
  create: createSettingsCatalog,
  list: listSettingsCatalog,
  update: updateSettingsCatalog,
};
