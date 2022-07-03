import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import { theme } from "../../constants/colors";

const Button = ({ onClickButton, primary, disabled, children }) => {
  return (
    <Styled.Button
      type="button"
      disabled={disabled}
      onClick={onClickButton}
      primary={primary}
    >
      {children}
    </Styled.Button>
  );
};

const Styled = {
  Button: styled.button`
    border: 0;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    color: ${(props) =>
      props.primary ? theme.colors.secondary : theme.colors.primary};
    background-color: ${(props) =>
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
  `,
};

Button.defaultProps = {
  primary: false,
};

Button.propTypes = {
  primary: PropTypes.bool,
  onClickButton: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
