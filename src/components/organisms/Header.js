import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Github } from "../../assets/images/github.svg";
import styled from "styled-components/macro";
import NavLinks from "../molecules/NavLinks";
import CartList from "../organisms/Cart";
import { theme } from "../../constants/colors";
import { Sidebar } from "primereact/sidebar";
import { useQuery } from "react-query";
import { useClient } from "../../utils/api-client";

export const Header = () => {
  const [visible, setVisible] = React.useState(false);
  const client = useClient();
  const { data: cart } = useQuery("cart", () => client("carts/1"));
  const itemsCount = cart?.products.reduce(
    (acc, current) => acc + current.quantity,
    0
  );

  return (
    <Styled.Header>
      <Sidebar
        visible={visible}
        position="right"
        style={{ width: "23rem" }}
        onHide={() => setVisible(false)}
      >
        <CartList cart={cart} />
      </Sidebar>
      <Styled.Links>
        <Link to="/">
          <Styled.Logo>
            <strong>hi</strong>jack
          </Styled.Logo>
        </Link>
        <NavLinks />
      </Styled.Links>
      <Styled.Right>
        {itemsCount > 0 ? <div>Your cart : {itemsCount} items</div> : null}
        <i className="pi pi-shopping-cart" onClick={(e) => setVisible(true)} />
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
    i {
      cursor: pointer;
      font-size: 1.5rem;
      margin: 0 1.1rem;
    }
  `,
  Logo: styled.div`
    font-family: "Abel";
    font-size: 2rem;
    margin-left: 1rem;
  `,
  Header: styled.header`
    box-sizing: border-box;
    position: fixed;
    top: 0;
    width: 100%;
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
    products: [],
    total: 0,
  },
};

export default Header;
