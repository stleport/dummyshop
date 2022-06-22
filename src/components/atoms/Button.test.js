import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../test/helpers";
import Button from "./Button";

test("renders a button”", async () => {
  const mockClickHandler = jest.fn();
  render(<Button onClickButton={mockClickHandler}>My button</Button>);
  await userEvent.click(screen.getByRole("button"));
  expect(mockClickHandler).toHaveBeenCalledTimes(1);
});
