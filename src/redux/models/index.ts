import { Models } from "@rematch/core";
import { catalogs } from "./catalogs";

export interface RootModel extends Models<RootModel> {
  catalogs: typeof catalogs;
}

export const models: RootModel = { catalogs };
