import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const Button = ({ onClickButton, children, primary, disabled }) => {
  return (
    <StyledButton
      type="button"
      disabled={disabled}
      onClick={onClickButton}
      primary={primary}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  background-color: #fdf18d;
  border: 0;
  height: 2.4rem;
  padding: 0 0.8rem;
  cursor: pointer;
  background-color: ${(props) => props.primary || "#26303c"};
  &:focus,
  &:active {
    outline: none;
    box-shadow: none;
  }
  :disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

Button.defaultProps = {
  buttonStyle: "",
};

Button.propTypes = {
  buttonStyle: PropTypes.string,
  onClickButton: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
