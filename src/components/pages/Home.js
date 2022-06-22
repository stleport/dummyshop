import React from "react";

const ProductList = React.lazy(() => import("../organisms/ProductList"));

const ShoppingList = (props) => <ProductList {...props} />;

export default ShoppingList;
