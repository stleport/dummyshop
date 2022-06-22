import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Github } from "../../assets/images/github.svg";
import styled from "styled-components/macro";
import NavLinks from "../molecules/NavLinks";
import { theme } from "../../constants/colors";
import * as Cart from "../../store/cartSlice";
import { useSelector } from "react-redux";

export const Header = () => {
  const itemsCount = useSelector(Cart.selectItemsCount);

  return (
    <Styled.Header>
      <Styled.Links>
        <Link to="/">
          <Styled.Logo>
            <strong>hi</strong>jack
          </Styled.Logo>
        </Link>
        <NavLinks />
      </Styled.Links>
      <Styled.Right>
        <div>Nombre d'articles dans votre panier : {itemsCount}</div>
        <a
          href="https://github.com/stleport/dummyshop"
          target="_blank"
          rel="noopener noreferrer"
          alt="Project repo"
          title="Project repo"
        >
          <Github />
        </a>
      </Styled.Right>
    </Styled.Header>
  );
};

const Styled = {
  Links: styled.div`
  flex: 1
    color: white;
    display: flex;
    height: 55px;
    align-items: center;
    a {
      color: white;
      text-decoration: none;
      margin-right: 1rem;
    }
  `,
  Right: styled.div`
    display: flex;
    align-items: center;
    color: white;
    & > div {
      margin-right: 1rem;
    }
  `,
  Logo: styled.div`
    font-family: "Abel";
    font-size: 2rem;
    margin-left: 1rem;
  `,
  Header: styled.header`
    background-color: ${theme.colors.dark};
    padding: 0 1rem;
    display: flex;
    height: 55px;
    justify-content: space-between;
    text-align: left;
    align-items: center;
  `,
};

Header.defaultProps = {
  cart: {
    items: [],
    total: 0,
  },
};

export default Header;
