import React from "react";
import { render } from "./test/helpers";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { faker } from "@faker-js/faker";

const ShoppingList = React.lazy(() => import("./components/pages/Home"));

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

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer(
  rest.get(`${apiUrl}/products`, (req, res, ctx) => {
    return res(ctx.json({ products }));
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test.skip("renders App", async () => {
  const ComponentToTest = (props) => {
    const { LazyComponentProp } = props;
    return (
      <React.Suspense fallback={<div>loading</div>}>
        <LazyComponentProp />
      </React.Suspense>
    );
  };

  render(<ComponentToTest LazyComponentProp={ShoppingList} />);
});
