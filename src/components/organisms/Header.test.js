import React from "react";
import { screen, within } from "@testing-library/react";
import { render } from "../../test/helpers";
import Header from "./Header";

test("renders page footer", async () => {
  render(<Header />);
  const navigation = screen.getByRole("navigation");
  const headerLinks = within(navigation).getAllByRole("link");
  expect(navigation).toBeInTheDocument();
  expect(headerLinks).toBeDefined();
});
