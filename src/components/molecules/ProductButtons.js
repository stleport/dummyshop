import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProductButton from "../atoms/ProductButton";
import { useCart } from "../../utils/hooks";

const StyledProductButtons = styled.div`
  display: flex;
  align-items: stretch;
  flex-flow: row nowrap;
`;

const ProductButtons = ({ quantity, productId, available }) => {
  const { incrementCart, decrementCart } = useCart();

  return (
    <StyledProductButtons>
      {quantity > 0 && (
        <ProductButton
          label="-"
          available={available}
          onChangeQuantity={decrementCart(productId)}
        />
      )}
      <ProductButton
        primary
        label="+"
        available={available}
        onChangeQuantity={incrementCart(productId)}
      />
    </StyledProductButtons>
  );
};

ProductButtons.propTypes = {
  quantity: PropTypes.number,
  available: PropTypes.number,
  productId: PropTypes.number.isRequired,
  incrementCart: PropTypes.func,
  decrementCart: PropTypes.func,
};
export default ProductButtons;
