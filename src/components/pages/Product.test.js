import React from "react";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { render } from "../../test/helpers";
import Product from "./Product";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";

let product = {
  id: 1,
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
};

let mockIncrementCart = () => {};
let mockDecrementCart = () => {};

jest.mock("../../utils/hooks", () => {
  return jest.fn(() => ({
    incrementCart: mockIncrementCart,
    decrementCart: mockDecrementCart,
  }));
});

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer(
  rest.get(`${apiUrl}/products/${product.id}`, (req, res, ctx) => {
    return res(ctx.json({ ...product }));
  })
);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 1,
  }),
}));

jest.mock("../../utils/hooks", () => ({
  useCart: () => ({
    incrementCart: jest.fn(),
    decrementCart: jest.fn(),
  }),
}));

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("renders loading product page", async () => {
  const productTitle = new RegExp(`${product.title}`);

  render(<Product />);
  expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: productTitle })
    ).toBeInTheDocument();
  });
});

test.skip("renders redux with defaults and update cart items count when +/- buttons are clicked", async () => {
  render(<Product />);
  await waitForElementToBeRemoved(() => screen.queryByTestId(/loading/i));
  userEvent.click(screen.getByRole("button", { name: /^\+$/i }));
  await waitFor(() => {
    expect(screen.getByText(/^\d *€/)).toHaveTextContent(/\(x1\)$/);
  });
  userEvent.click(screen.getByRole("button", { name: /^-$/i }));
  expect(screen.getByRole("heading")).not.toHaveTextContent(/\(x\d\)$/);
});
