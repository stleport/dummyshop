import React from "react";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";

jest.mock("./components/pages/Home", () => () => {
  const Home = "home-component-mock";
  return <Home>Product list</Home>;
});

jest.mock("./components/pages/Product", () => () => {
  const Product = "product-component-mock";
  return <Product>Product details</Product>;
});

jest.mock("./components/pages/NoMatch", () => () => {
  const NoMatch = "nomatch-component-mock";
  return <NoMatch>Not found</NoMatch>;
});

test("routing to the home", async () => {
  const queryClient = new QueryClient();
  const history = createMemoryHistory({ initialEntries: ["/"] });

  render(
    <QueryClientProvider client={queryClient}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </QueryClientProvider>
  );
  expect(screen.getByText(/product list/i)).toBeInTheDocument();
});

test("routing to the product page", async () => {
  const queryClient = new QueryClient();
  const history = createMemoryHistory({ initialEntries: ["/products/1"] });

  render(
    <QueryClientProvider client={queryClient}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </QueryClientProvider>
  );
  expect(screen.getByText(/product details/i)).toBeInTheDocument();
});

test("landing on a bad page", () => {
  const queryClient = new QueryClient();
  const history = createMemoryHistory({ initialEntries: ["/bad/route"] });

  render(
    <QueryClientProvider client={queryClient}>
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    </QueryClientProvider>
  );

  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});
