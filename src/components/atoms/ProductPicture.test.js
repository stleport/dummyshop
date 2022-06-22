import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../test/helpers";
import ProductPicture from "./ProductPicture";
import { DEFAULT_PICTURE } from "../../constants";

test("renders the product picture", async () => {
  const props = {
    altText: "alt",
    source: "file.jpg",
  };
  render(<ProductPicture {...props} />);
  const image = screen.getByTitle("alt");
  expect(image).toBeInTheDocument();
});

test("displays fallback image when the product image is not found", async () => {
  const props = {
    altText: "alt",
    source: "",
  };
  render(<ProductPicture {...props} />);
  expect(screen.getByTestId("background")).toHaveStyle(
    `background-image: url(${DEFAULT_PICTURE})`
  );
});
