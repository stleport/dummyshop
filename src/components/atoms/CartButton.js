import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import styled from "styled-components";

const CartButton = ({ primary, disabled, label, onChangeQuantity }) => {
  return (
    <Styled.CartButton
      onClickButton={onChangeQuantity}
      primary={primary}
      disabled={disabled}
    >
      {label}
    </Styled.CartButton>
  );
};

const Styled = {
  CartButton: styled(Button)`
    border: 0;
    height: 2.8rem;
    cursor: pointer;
    align-items: center;
      props.primary ? theme.colors.primary : theme.colors.secondary};
    &:focus,
    &:active {
      outline: none;
      box-shadow: none;
    }
    :disabled {
      opacity: 0.5;
      cursor: default;
    }
  }`,
};

CartButton.defaultProps = {
  primary: false,
  onChangeQuantity: () => {},
};

CartButton.propTypes = {
  label: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  onChangeQuantity: PropTypes.func,
};

export default CartButton;
