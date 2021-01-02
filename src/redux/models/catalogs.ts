import { createModel } from "@rematch/core";
import { RootModel } from "./";
import api from "../../services/api";
import { productsEndpoint } from "../../services/endpoints";

export interface CatalogType {
  id: number;
  name: string;
  price: number;
  supplier: string;
}

type DataType = {
  _embedded: {
    product: CatalogType[];
  };
};

type OrderType = "popularity" | "price_high" | "new" | "price_low";

type CatalogsStateType = {
  data: DataType;
  error: string;
  order: OrderType;
};

export const catalogs = createModel<RootModel>()({
  state: {
    data: {},
    error: "",
    order: "popularity",
  } as CatalogsStateType,
  reducers: {
    SET_PRODUCTS: (state: CatalogsStateType, data: DataType) => {
      return {
        ...state,
        error: "",
        data,
      };
    },
    SET_ERROR: (state: CatalogsStateType, error: string) => {
      return {
        ...state,
        error,
      };
    },
    SET_ORDER: (state: CatalogsStateType, order: OrderType) => {
      return {
        ...state,
        order,
      };
    },
  },
  effects: (dispatch) => {
    const { catalogs } = dispatch;
    return {
      async getCatalogs({} = {}, rootState): Promise<void> {
        await api(productsEndpoint(), "GET")
          .then((response) => {
            const { data }: { data: DataType } = response;
            catalogs.SET_PRODUCTS(data);
          })
          .catch((error) => {
            catalogs.SET_ERROR(error.message);
          });
      },
      async setOrder(payload: OrderType): Promise<void> {
        await catalogs.SET_ORDER(payload);
        await catalogs.getCatalogs();
      },
    };
  },
});
