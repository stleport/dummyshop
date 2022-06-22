import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import store from "./store";
import ReactDOM from "react-dom/client";
import App from "./App";
import Product from "./components/pages/Product";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import ShopLayout from "./components/templates/ShopLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <ShopLayout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="products/:id" element={<Product />} />
          </Routes>
        </ShopLayout>
      </Router>
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
