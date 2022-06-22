import React from "react";
import { screen, within } from "@testing-library/react";
import { render } from "../../test/helpers";
import Footer from "./Footer";

test("renders page footer", async () => {
  render(<Footer />);
  const navigation = screen.getByRole("contentinfo");
  const footerLinks = within(navigation).getAllByRole("link");
  expect(navigation).toBeInTheDocument();
  expect(footerLinks).not.toEqual([]);
});
