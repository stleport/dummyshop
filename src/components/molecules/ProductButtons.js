import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProductButton from "../atoms/ProductButton";

const ProductButtons = ({
  quantity,
  productId,
  incrementCart,
  decrementCart,
  pending,
}) => {
  return (
    <Styled.ProductButtons>
      {quantity > 0 && (
        <ProductButton
          label="-"
          onChangeQuantity={decrementCart({ productId, quantity })}
          disabled={pending}
        />
      )}
      <ProductButton
        primary
        label="+"
        quantity={quantity}
        disabled={pending}
        onChangeQuantity={incrementCart({
          productId,
          quantity: quantity ?? 0,
        })}
        pending={pending}
      />
    </Styled.ProductButtons>
  );
};

export const Styled = {
  ProductButtons: styled.div`
    display: flex;
    align-items: stretch;
    flex-flow: row nowrap;
  `,
};

ProductButtons.propTypes = {
  productId: PropTypes.number.isRequired,
  quantity: PropTypes.number,
  available: PropTypes.bool,
  incrementCart: PropTypes.func,
  decrementCart: PropTypes.func,
};

export default ProductButtons;
