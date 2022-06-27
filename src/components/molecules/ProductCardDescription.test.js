import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../test/helpers";
import ProductDescription from "./ProductCardDescription";

test("renders navigation with one or more link", async () => {
  const originalError = console.error;
  console.error = jest.fn();
  const product = {
    title: "My product",
    description: "lorem",
    price: 98,
    stock: 24,
  };
  render(<ProductDescription {...product} />);
  expect(
    screen.getByRole("heading", { name: product.title })
  ).toBeInTheDocument();
  expect(screen.getByText("lorem")).toBeInTheDocument();

  console.error = originalError;
});
