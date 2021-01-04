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
  messaging: {
    marketing: [],
  },
};

test("renders ProductThumbnail component", () => {
  const { getByText, findByText, getByAltText } = render(
    <ProductThumbnail data={product} />
  );

  getByAltText(/Product name/);
  findByText(/Product name/);
  getByText(/30.50/);
});
