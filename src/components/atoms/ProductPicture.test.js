import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../test/helpers";
import ProductPicture from "./ProductPicture";

test("renders the product picture", async () => {
  const props = {
    altText: "alt",
    source: "file.jpg",
  };
  render(<ProductPicture {...props} />);
  const image = screen.getByTitle("alt");
  expect(image).toBeInTheDocument();
});
