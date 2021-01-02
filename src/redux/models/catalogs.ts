import { createModel } from "@rematch/core";
import { RootModel } from ".";

export const catalogs = createModel<RootModel>()({
  state: [],
});
