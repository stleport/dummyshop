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
  const stockLLabel = new RegExp(`${product.stock}.*en stock`);
  // const priceLabel = new RegExp(`${product.price} €`);
  render(<ProductDescription {...product} />);
  expect(
    screen.getByRole("heading", { name: product.title })
  ).toBeInTheDocument();
  expect(screen.getByText("lorem")).toBeInTheDocument();
  expect(screen.getByText(stockLLabel)).toBeInTheDocument();
  // expect(screen.getByText(priceLabel)).toBeInTheDocument();

  console.error = originalError;
});
