import React from "react";
import { screen, within } from "@testing-library/react";
import { render } from "../../test/helpers";
import NavLinks from "./NavLinks";

test("renders navigation with one or more link", async () => {
  render(<NavLinks />);
  const navigation = screen.getByRole("navigation");
  const links = within(navigation).getAllByRole("link");
  expect(navigation).toBeInTheDocument();
  expect(links).not.toEqual([]);
});
