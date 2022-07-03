import React from "react";
import { screen, within, waitFor } from "@testing-library/react";
import { render } from "../../test/helpers";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Header from "./Header";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer(
  rest.get(`${apiUrl}/carts/1`, (req, res, ctx) => {
    return res(
      ctx.json({
        products: [
          { productId: 1, quantity: 2 },
          { productId: 1, quantity: 3 },
        ],
      })
    );
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("renders page header", async () => {
  render(<Header />);
  const navigation = screen.getByRole("navigation");
  const headerLinks = within(navigation).getAllByRole("link");
  expect(navigation).toBeInTheDocument();
  expect(headerLinks).toBeDefined();
});

test("displays cart items count", async () => {
  render(<Header />);
  await waitFor(() => {
    expect(screen.getByTestId("cart-count")).toHaveTextContent(
      /Your cart : 5 items/i
    );
  });
});
