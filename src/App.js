import React, { Suspense } from "react";

const ShoppingList = React.lazy(() => import("./components/pages/Home"));

export function App() {
  return (
    <React.Fragment>
      <Suspense fallback={<div>Loading</div>}>
        <ShoppingList data-testid="product-list" />
      </Suspense>
    </React.Fragment>
  );
}

export default App;
