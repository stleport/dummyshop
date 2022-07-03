import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../test/helpers";
import ProductCardFooter from "./ProductCardFooter";

const product = {
  productId: 1,
  price: 98,
  quantity: 2,
  incrementCart: jest.fn(),
  decrementCart: jest.fn(),
};

test("renders card footer with price and 'add to cart' button", async () => {
  const price = new RegExp(`${product.price}\\.\\d\\d€`);

  render(<ProductCardFooter {...product} />);
  expect(screen.getByText(price)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /^\+$/i })).toBeInTheDocument();
});
