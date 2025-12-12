import { createCategory } from "./create";
import { duplicateCategory } from "./duplicate";
import { listCategories } from "./list";
import { listWithoutSubcategory } from "./list-without-sub";
import { updateCategory } from "./update";

export const categoryRoutes = {
  list: listCategories,
  listWithoutSubcategory: listWithoutSubcategory,
  create: createCategory,
  update: updateCategory,
  duplicate: duplicateCategory,
};
