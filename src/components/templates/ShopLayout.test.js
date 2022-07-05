import React from "react";
import { render } from "../../test/helpers";
import { screen, within } from "@testing-library/react";
import ShopLayout from "../templates/ShopLayout";

test("renders ShopLayout children", () => {
  render(<ShopLayout>content</ShopLayout>);
  const main = screen.getByRole("main");

  expect(screen.getByRole("banner")).toBeInTheDocument();
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  expect(within(main).getByText(/^content$/i)).toBeInTheDocument();
});
