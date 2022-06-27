import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../test/helpers";
import ProductCardFooter from "./ProductCardFooter";

test("renders card footer with price and 'add to cart' button", async () => {
  const product = {
    productId: 1,
    price: 98,
    quantity: 2,
    incrementCart: jest.fn(),
    decrementCart: jest.fn(),
  };
  const price = new RegExp(`${product.price}€`);

  render(<ProductCardFooter {...product} />);
  expect(screen.getByText(price)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /^\+$/i })).toBeInTheDocument();
});
