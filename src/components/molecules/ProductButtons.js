import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProductButton from "../atoms/ProductButton";

const StyledProductButtons = styled.div`
  display: flex;
  align-items: stretch;
  flex-flow: row nowrap;
`;

const ProductButtons = ({
  onAddToCart,
  onSubQuantity,
  quantity,
  productId,
  available,
}) => {
  return (
    <StyledProductButtons>
      {quantity > 0 && (
        <ProductButton
          label="-"
          available={available}
          onChangeQuantity={() => onSubQuantity(productId, quantity)}
        />
      )}
      <ProductButton
        primary
        label="+"
        available={available}
        onChangeQuantity={() => onAddToCart(productId)}
      />
    </StyledProductButtons>
  );
};

ProductButtons.propTypes = {
  quantity: PropTypes.number,
  productId: PropTypes.number.isRequired,
  onAddToCart: PropTypes.func,
  onSubQuantity: PropTypes.func,
};
export default ProductButtons;
