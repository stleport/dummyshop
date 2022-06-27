import React from "react";
import { screen } from "@testing-library/react";
import { render } from "../../test/helpers";
import ProductCard from "./ProductCard";
import { faker } from "@faker-js/faker";
import userEvent from "@testing-library/user-event";

const mockedUseNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUseNavigate,
}));

test("renders ProductCard", async () => {
  const originalError = console.error;
  console.error = jest.fn();
  const onClickCard = jest.fn();
  const data = {
    product: {
      id: 1,
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.datatype.number({
        min: 1,
        max: 5000,
      }),
      onClick: onClickCard,
    },
  };

  render(<ProductCard {...data} />);
  expect(
    screen.getByRole("img", { name: new RegExp(`${data.product.title}`) })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { level: 2, name: data.product.title })
  ).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(`${data.product.title}`))
  ).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(`${data.product.description}`))
  ).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(`${data.product.price}\\.\\d\\d€`))
  ).toBeInTheDocument();

  userEvent.click(screen.getByRole("article"));
  expect(mockedUseNavigate).toHaveBeenCalledWith(
    `/products/${data.product.id}`
  );
  console.error = originalError;
});
