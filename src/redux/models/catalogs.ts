import { createModel } from "@rematch/core";
import { RootModel } from "./";

import api from "../../services/api";
import { OrderType, ORDER_OPTIONS } from "../../constants";
import { productsEndpoint } from "../../services/endpoints";

export interface CatalogType {
  id: number;
  name: string;
  price: number;
  supplier: string;
  _embedded: {
    images: { url: string }[];
  };
  messaging: {
    marketing: { short: string }[];
  };
}

type DataType = {
  _embedded: {
    product: CatalogType[];
  };
};

type CatalogsStateType = {
  data: DataType;
  error: string;
  order: OrderType;
  page: number;
};

export const catalogs = createModel<RootModel>()({
  state: {
    data: {},
    error: "",
    order: ORDER_OPTIONS[0],
    page: 1,
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
        await api(
          productsEndpoint(
            rootState.catalogs.order.value,
            rootState.catalogs.page
          ),
          "GET"
        )
          .then((response) => {
            const { data }: { data: DataType } = response;
            catalogs.SET_PRODUCTS(data);
          })
          .catch((error) => {
            catalogs.SET_ERROR(error.message);
          });
      },
      async setOrder(payload: OrderType): Promise<void> {
        console.log("🚀 ~ setOrder ~ payload", payload);
        await catalogs.SET_ORDER(payload);
        await catalogs.getCatalogs();
      },
    };
  },
});
