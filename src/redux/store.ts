import { init, RematchDispatch, RematchRootState } from "@rematch/core";

import { models, RootModel } from "./models";

export const store = init({
  models,
});

export type StoreType = typeof store;
export type DispatchType = RematchDispatch<RootModel>;
export type RootStateType = RematchRootState<RootModel>;
