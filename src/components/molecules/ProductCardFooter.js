import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import ProductButtons from "../molecules/ProductButtons";

const ProductCardFooter = ({
  price,
  productId,
  cartItem,
  incrementCart,
  decrementCart,
  pending,
}) => {
  return (
    <Styled.ProductFooter>
      <div>
        {`${price}€ ${
          cartItem?.quantity > 0 ? `(x${cartItem?.quantity})` : ""
        }`}
      </div>
      <ProductButtons
        productId={productId}
        quantity={cartItem?.quantity}
        incrementCart={incrementCart}
        decrementCart={decrementCart}
        pending={pending}
      />
    </Styled.ProductFooter>
  );
};

const Styled = {
  ProductFooter: styled.div`
    display: flex;
    flex: 1 1 0;
    flex-grow: 0;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    font-weight: bold;
    font-size: 1.4rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
  `,
};

ProductCardFooter.propTypes = {
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  productId: PropTypes.number.isRequired,
};

export default ProductCardFooter;
