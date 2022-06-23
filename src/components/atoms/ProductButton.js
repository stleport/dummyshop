import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const ProductButton = ({ primary, available, label, onChangeQuantity }) => {
  return (
    <React.Fragment>
      {/* <ButtonIcon 
        iconName={iconName}
        onChangeQuantity={onChangeQuantity}
        available={available}
        primary={primary}
      /> */}
      <Button onClickButton={onChangeQuantity}>{label}</Button>
    </React.Fragment>
  );
};

ProductButton.defaultProps = {
  enabled: true,
  onSubQuantity: null,
  onAddToCart: null,
  primary: false,
};

ProductButton.propTypes = {
  iconName: PropTypes.string.isRequired,
  primary: PropTypes.bool,
  enabled: PropTypes.bool,
  onAddToCart: PropTypes.func,
  onSubQuantity: PropTypes.func,
};

export default ProductButton;
