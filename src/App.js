import React from "react";
import ShopLayout from "./components/templates/ShopLayout";
import Home from "./components/pages/Home";
import Product from "./components/pages/Product";
import NoMatch from "./components/pages/NoMatch";
import { Routes, Route } from "react-router-dom";

export function App() {
  return (
    <ShopLayout>
      <Routes>
        <Route path="/" element={<Home data-testid="product-list" />} />
        <Route path="products/:id" element={<Product />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </ShopLayout>
  );
}

export default App;
