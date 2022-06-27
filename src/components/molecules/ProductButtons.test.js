import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../test/helpers";
import ProductButtons from "./ProductButtons";

const props = {
  productId: 1,
  quantity: 0,
  incrementCart: jest.fn(),
  decrementCart: jest.fn(),
  onChangeQuantity: jest.fn(),
};

test("renders '+' button", async () => {
  render(<ProductButtons {...props} productId={1} />);
  expect(screen.getByText(/^\+$/)).toBeInTheDocument();
});

test("hide '-' button when there is no item in cart", async () => {
  render(<ProductButtons {...props} productId={1} quantity={0} />);
  expect(screen.queryByText(/^\-$/)).not.toBeInTheDocument();
});
