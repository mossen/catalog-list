import { createModel } from "@rematch/core";
import { RootModel } from "./";

import api from "../../services/api";
import { ORDER_OPTIONS } from "../../constants";
import { productsEndpoint } from "../../services/endpoints";

export interface ProductType {
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
    product: ProductType[];
  };
  page_count: number;
};

type CatalogsStateType = {
  data: DataType;
  error: string;
  order: string;
  page: number;
};

export const catalogs = createModel<RootModel>()({
  state: {
    data: {},
    error: "",
    order: ORDER_OPTIONS[0].value,
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
    SET_ORDER: (state: CatalogsStateType, order: string) => {
      return {
        ...state,
        order,
        page: 1,
      };
    },
    SET_PAGE: (state: CatalogsStateType, page: number) => {
      return {
        ...state,
        page,
      };
    },
  },
  effects: (dispatch) => {
    const { catalogs } = dispatch;
    return {
      async getCatalogs({} = {}, rootState): Promise<void> {
        await api(
          productsEndpoint(rootState.catalogs.order, rootState.catalogs.page),
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
      async setOrder(payload: string): Promise<void> {
        catalogs.SET_ORDER(payload);
        await catalogs.getCatalogs();
      },
      async setPage(payload: number): Promise<void> {
        catalogs.SET_PAGE(payload);
        await catalogs.getCatalogs();
      },
    };
  },
});
