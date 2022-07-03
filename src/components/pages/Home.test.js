import React from "react";
import { render } from "@testing-library/react";
import Home from "./Home";

jest.mock("../organisms/ProductList", () => () => {
  const ProductList = "productList-component-mock";
  return <ProductList />;
});

test("renders product list", async () => {
  const { container } = render(<Home />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <productlist-component-mock />
    </div>
  `);
});
