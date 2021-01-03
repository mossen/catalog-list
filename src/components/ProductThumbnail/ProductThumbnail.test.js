import React from "react";
import { render } from "@testing-library/react";
import ProductThumbnail from "./";

const product = {
  name: "Product name",
  supplier: "Product name",
  price: "30.50",
  _embedded: {
    images: [
      {
        url: "https://dummyimage.com/420x260",
      },
    ],
  },
};

test("renders ProductThumbnail component", () => {
  const { getByText, findAllByText, getByAltText } = render(
    <ProductThumbnail data={product} />
  );
  getByAltText(/Product name/);
  findAllByText(/Product name/);
  getByText(/30.50/);
});
