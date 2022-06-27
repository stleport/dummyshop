import React from "react";
import { render } from "../../test/helpers";
import { screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Cart from "../organisms/Cart";
import { faker } from "@faker-js/faker";

const apiUrl = process.env.REACT_APP_API_URL;

const data = {
  products: [
    { id: 1, title: "Product 1" },
    { id: 2, title: "Product 2" },
  ],
};

const products = Array(2)
  .fill(null)
  .map(() => ({
    id: faker.datatype.number(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    stock: faker.datatype.number({
      min: 0,
      max: 500,
    }),
    price: faker.datatype.number({
      min: 1,
      max: 5000,
    }),
  }));
const server = setupServer(
  rest.get(`${apiUrl}/carts/1`, (req, res, ctx) => {
    return res(ctx.json({ products: [{ productId: 1, quantity: 1 }] }));
  }),
  rest.get(`${apiUrl}/products`, (req, res, ctx) => {
    return res(ctx.json([{ id: 1, title: "product 1" }]));
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("renders cart with a heading", async () => {
  render(<Cart cart={data} />);
  expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});

test("displays a message when the cart is empty", async () => {
  render(<Cart />);
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(/cart.*empty/i)).toBeInTheDocument();
  });
});
