import React from "react";
import { render } from "../../test/helpers";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
  renderHook,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { useCart } from "../../utils/hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import Cart from "../organisms/Cart";

const apiUrl = process.env.REACT_APP_API_URL;

const products = [
  { id: 1, title: "Product 1", price: 20 },
  { id: 2, title: "Product 2", price: 30 },
];

const cartItems = [{ productId: 1, quantity: 1 }];

const server = setupServer(
  rest.get(`${apiUrl}/products`, (req, res, ctx) => {
    return res(ctx.json(products));
  }),
  rest.put(`${apiUrl}/carts/1`, (req, res, ctx) => {
    return res(ctx.json({ products: [{ productId: 1, quantity: 2 }] }));
  }),
  rest.get(`${apiUrl}/carts/1`, (req, res, ctx) => {
    return res(ctx.json({ products: cartItems }));
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("renders cart with a heading", async () => {
  const queryClient = new QueryClient({ enabled: false });
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  render(<Cart />);

  await waitForElementToBeRemoved(() => screen.queryByTestId(/cart-loading/i));

  const { result } = renderHook(() => useCart(), {
    wrapper,
  });

  await waitFor(() => {
    return result.current.isSuccess;
  });

  await waitFor(() => {
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  userEvent.click(screen.getByRole("button", { name: "+" }));

  await waitFor(() =>
    expect(screen.getByTestId(/product-label/i)).toHaveTextContent(/\(x2\)$/)
  );
});

test("displays a message when the cart is empty", async () => {
  server.use(
    rest.get(`${apiUrl}/carts/1`, (req, res, ctx) => {
      return res(ctx.json({ products: [] }));
    })
  );

  render(<Cart />);
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(/cart.*empty/i)).toBeInTheDocument();
  });
});
