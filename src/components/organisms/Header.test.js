import React from "react";
import { screen, within } from "@testing-library/react";
import { render } from "../../test/helpers";
import Header from "./Header";
import { Provider } from "react-redux";
import store from "../../store";

test("renders page footer", async () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
  const navigation = screen.getByRole("navigation");
  const headerLinks = within(navigation).getAllByRole("link");
  expect(navigation).toBeInTheDocument();
  expect(headerLinks).not.toEqual([]);
});
