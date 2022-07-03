import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import CartButton from "../atoms/CartButton";

const CartButtons = ({
  productId,
  quantity,
  incrementCart,
  decrementCart,
  pending,
}) => {
  return (
    <Styled.CartButtons>
      {quantity > 0 && (
        <CartButton
          label="-"
          onChangeQuantity={decrementCart({ productId, quantity })}
          disabled={pending}
        />
      )}
      <CartButton
        primary
        label="+"
        quantity={quantity}
        disabled={pending}
        onChangeQuantity={incrementCart({
          productId,
          quantity: quantity ?? 0,
        })}
      />
    </Styled.CartButtons>
  );
};

export const Styled = {
  CartButtons: styled.div`
    display: flex;
    align-items: stretch;
    flex-flow: row nowrap;
  `,
};

CartButtons.propTypes = {
  productId: PropTypes.number.isRequired,
  quantity: PropTypes.number,
  available: PropTypes.bool,
  incrementCart: PropTypes.func,
  decrementCart: PropTypes.func,
};

export default CartButtons;
