import React from "react";
import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom";
import App from "./App";

test.skip("full app rendering/navigating", async () => {
  render(<App />);
});
