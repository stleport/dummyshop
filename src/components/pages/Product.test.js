import React from "react";
import { render } from "../../test/helpers";
import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { faker } from "@faker-js/faker";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductPage from "./Product";

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 1,
      retry: 0,
    },
  },
});

const Wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const server = setupServer(
  rest.get(`${apiUrl}/products/${product.id}`, (req, res, ctx) => {
    return res(ctx.json({ ...product }));
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

jest.mock("../organisms/Product", () => () => <h1>Product details</h1>);
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: 1,
  }),
}));

test("renders loading product page", async () => {
  render(<ProductPage />);
  expect(screen.getByTestId(/loading/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: /product details/i })
    ).toBeInTheDocument();
  });
});

test("unknown server error displays the error message", async () => {
  server.use(
    rest.get(`${apiUrl}/products/1`, (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: "someting went wrong" }));
    })
  );
  const originalError = console.error;
  console.error = jest.fn();

  render(
    <Wrapper>
      <ProductPage />
    </Wrapper>
  );

  await waitForElementToBeRemoved(await screen.findByTestId("loading"));

  await waitFor(() => {
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
  console.error = originalError;
});
