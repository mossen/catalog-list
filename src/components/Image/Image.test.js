import React from "react";
import { render } from "@testing-library/react";
import Image from "./";

test("renders Image component when no src is provided", () => {
  const { container } = render(<Image src="" />);
  const img = container.querySelector("img");

  expect(img).toBeNull();
});

it("renders Image component", () => {
  const { container, getByAltText } = render(
    <Image src="https://dummyimage.com/300.png" alt="alternative" />
  );
  const img = container.querySelector("img");

  expect(img.tagName).toMatch(/^img$/i);
  getByAltText(/alternative/);
});
