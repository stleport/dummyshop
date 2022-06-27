import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import styled from "styled-components";

const ProductButton = ({
  primary,
  disabled,
  label,
  onChangeQuantity,
  pending,
}) => {
  return (
    <React.Fragment>
      <Styled.ProductButton
        onClickButton={onChangeQuantity}
        primary={primary}
        disabled={disabled}
        pending={pending}
      >
        {label}
      </Styled.ProductButton>
    </React.Fragment>
  );
};

const Styled = {
  ProductButton: styled(Button)`
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

ProductButton.defaultProps = {
  primary: false,
  available: false,
  onChangeQuantity: null,
};

ProductButton.propTypes = {
  primary: PropTypes.bool,
  available: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onChangeQuantity: PropTypes.func,
};

export default ProductButton;
