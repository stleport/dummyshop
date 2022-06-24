import React from "react";
import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test/helpers";
import ProductList from "./ProductList";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { faker } from "@faker-js/faker";
import store from "../../store";
import { Provider } from "react-redux";

const apiUrl = process.env.REACT_APP_API_URL;

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
  rest.get(`${apiUrl}/products`, (req, res, ctx) => {
    return res(ctx.json({ products }));
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("renders product list", async () => {
  const originalError = console.error;
  console.error = jest.fn();
  render(
    <Provider store={store}>
      <ProductList />
    </Provider>
  );
  expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: /sélection/i })
    ).toBeInTheDocument();
  });
  expect(screen.getAllByTitle(/(en stock|non disponible)/i)).toHaveLength(2);
  console.error = originalError;
});
