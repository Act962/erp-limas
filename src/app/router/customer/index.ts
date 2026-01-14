import { createCustomer } from "./create";
import { listCustomer } from "./list";
import { getCustomer } from "./get";
import { updateCustomer } from "./update";

export const customerRoutes = {
  list: listCustomer,
  create: createCustomer,
  getOne: getCustomer,
  update: updateCustomer,
};
