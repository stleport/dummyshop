import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

jest.mock("./components/pages/Home", () => () => {
  const ShoppingList = "shoppingList-component-mock";
  return <ShoppingList />;
});

test("renders App", async () => {
  const { container } = render(<App />);
  expect(container).toMatchInlineSnapshot(`
    <div>
      <shoppinglist-component-mock />
    </div>
   `);
});
