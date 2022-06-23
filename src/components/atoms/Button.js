import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import { theme } from "../../constants/colors";

const Button = ({ onClickButton, children, primary, disabled }) => {
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
    display: flex;
    background-color: #fdf18d;
    border: 0;
    height: 2.4rem;
    padding: 0 0.8rem;
    cursor: pointer;
    align-items: center;
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
  buttonStyle: "",
};

Button.propTypes = {
  buttonStyle: PropTypes.string,
  onClickButton: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
