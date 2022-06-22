import React from "react";
import styled from "styled-components/macro";

const Footer = () => (
  <Styled.Footer role="contentinfo">
    <a href="http://google.com" target="_blank" rel="noopener noreferrer">
      © copyright HiJack
    </a>
  </Styled.Footer>
);

const Styled = {
  Footer: styled.footer`
    border-top: 1px dotted #ccc;
    padding: 0.8rem;
    margin-top: 2rem;
    text-align: center;
    a {
      color: #000;
      font-size: 0.8rem;
      text-decoration: none;
    }
  `,
};

export default Footer;
