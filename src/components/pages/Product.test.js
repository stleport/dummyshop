import React from "react";
import { render } from "../../test/helpers";
import userEvent from "@testing-library/user-event";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  renderHook,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { faker } from "@faker-js/faker";
import { useCart } from "../../utils/hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import Product from "./Product";

const apiUrl = process.env.REACT_APP_API_URL;

let product = {
  id: 1,
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.datatype.number({
    min: 1,
    max: 5000,
  }),
};

const server = setupServer(
  rest.get(`${apiUrl}/products/${product.id}`, (req, res, ctx) => {
    return res(ctx.json({ ...product }));
  }),
  rest.get(`${apiUrl}/carts/1`, (req, res, ctx) => {
    return res(ctx.json({ products: [{ productId: 1, quantity: 1 }] }));
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 1,
  }),
}));

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

test("increment cart when [+] button is clicked", async () => {
  server.use(
    rest.get(`${apiUrl}/carts/1`, (req, res, ctx) => {
      return res(ctx.json({ products: [{ productId: 1, quantity: 1 }] }));
    }),
    rest.put(`${apiUrl}/carts/1`, (req, res, ctx) => {
      return res(ctx.json({ products: [{ productId: 1, quantity: 2 }] }));
    })
  );

  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  render(<Product />);

  await waitForElementToBeRemoved(() => screen.queryByTestId(/loading/i));

  const { result } = renderHook(() => useCart(), {
    wrapper,
  });

  await waitFor(() => {
    return result.current.isSuccess;
  });

  userEvent.click(screen.getByRole("button", { name: "+" }));

  await waitFor(() =>
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /\(x2\)$/
    )
  );
});

test("decrement cart when [-] button is clicked", async () => {
  server.use(
    rest.get(`${apiUrl}/carts/1`, (req, res, ctx) => {
      return res(ctx.json({ products: [{ productId: 1, quantity: 5 }] }));
    }),
    rest.put(`${apiUrl}/carts/1`, (req, res, ctx) => {
      return res(ctx.json({ products: [{ productId: 1, quantity: 4 }] }));
    })
  );

  const queryClient = new QueryClient();
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  render(<Product />);

  await waitForElementToBeRemoved(() => screen.queryByTestId(/loading/i));

  const { result } = renderHook(() => useCart(), {
    wrapper,
  });

  await waitFor(() => {
    return result.current.isSuccess;
  });

  userEvent.click(screen.getByRole("button", { name: "-" }));

  await waitFor(() =>
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /\(x4\)$/
    )
  );
});
