import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../test/helpers";
import ProductButton from "./CartButton";

test("renders a button”", async () => {
  const mockClickHandler = jest.fn();
  const props = {
    label: "Mybutton",
    onChangeQuantity: mockClickHandler,
  };
  render(<ProductButton {...props}>My button</ProductButton>);
  await userEvent.click(screen.getByRole("button"));
  expect(mockClickHandler).toHaveBeenCalledTimes(1);
});
