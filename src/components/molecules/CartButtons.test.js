import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../test/helpers";
import CartButtons from "./ProductCardFooter";

const product = {
  productId: 1,
  price: 98,
  quantity: 2,
  incrementCart: jest.fn(),
  decrementCart: jest.fn(),
};

test("renders '+' button", async () => {
  render(<CartButtons {...product} />);
  expect(screen.getByText(/^\+$/)).toBeInTheDocument();
});

test("hide '-' button when there is no item in cart", async () => {
  render(<CartButtons {...product} />);
  expect(screen.queryByText(/^\-$/)).not.toBeInTheDocument();
});
