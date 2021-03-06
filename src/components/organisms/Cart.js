import styled from "styled-components";
import CartButtons from "../molecules/CartButtons";
import { useCart } from "../../utils/hooks";
import React from "react";
import { useQuery } from "react-query";
import { useClient } from "../../utils/api-client";
import { SpinnerBlock } from "../atoms/Spinner";

const CartItem = ({ item, incrementCart, decrementCart }) => {
  return (
    <Styled.CartItemContainer>
      <li key={item.productId}>
        <CartButtons
          productId={item.productId}
          quantity={item.quantity}
          incrementCart={incrementCart}
          decrementCart={decrementCart}
        />
        <Styled.Img src={item?.image} />
        <Styled.Label data-testid="product-label">
          {item.title} <strong>(x{item?.quantity}</strong>)
        </Styled.Label>
        <Styled.Price>{item.price.toFixed(2)}€</Styled.Price>
      </li>
    </Styled.CartItemContainer>
  );
};

const Cart = () => {
  const client = useClient();
  const { incrementCart, decrementCart, cartItems: cart } = useCart();
  const { data: products, status } = useQuery(
    "productList",
    async () => await client("products")
  );
  const cartItems = cart
    ?.map((cartItem) => ({
      ...cartItem,
      ...products?.find((productItem) => productItem.id === cartItem.productId),
    }))
    .filter((item) => Boolean(item.quantity));

  const cartItemsCount = cartItems?.reduce(
    (acc, current) => acc + current.quantity,
    0
  );

  const totalPrice = cartItems?.reduce(
    (acc, current) => acc + current.price * current.quantity,
    0
  );

  if (status === "loading") return <SpinnerBlock data-testid="cart-loading" />;

  return (
    <>
      <h1
        style={{
          marginTop: "0",
          marginLeft: "0.5rem",
          fontFamily: "Abel",
          fontSize: "2.4rem",
        }}
      >
        Cart
      </h1>
      {cartItems.length > 0 ? (
        <Styled.CartItemsList>
          {cartItems.map((item) => (
            <React.Fragment key={item.productId}>
              <CartItem
                item={item}
                incrementCart={incrementCart}
                decrementCart={decrementCart}
              />
              <Styled.Hr />
            </React.Fragment>
          ))}
          <Styled.SubTotal>
            Subtotal: {totalPrice.toFixed(2)}€ ({cartItemsCount} items)
          </Styled.SubTotal>
        </Styled.CartItemsList>
      ) : (
        <p>Your cart is empty</p>
      )}
    </>
  );
};

const Styled = {
  CartItemsList: styled.ul`
    padding: 0.5rem;
    margin: 0;
    li {
      list-style-type: none;
      font-size: 0.9rem;
    }
  `,
  CartItemContainer: styled.div`
    li {
      display: flex;
      button {
        display: flex;
        width: 1rem;
        height: 1rem;
        padding: 0.8rem;
      }
    }
  `,
  Price: styled.div`
    font-weight: bold;
    padding-left: 0.5rem;
  `,
  Label: styled.div`
    flex: 1;
    padding-left: 0.5rem;
  `,
  Hr: styled.div`
    border-bottom: 1px dotted #bbb;
    margin: 0.7rem 0;
  `,
  SubTotal: styled.div`
    margin-top: 1rem;
    text-align: right;
    font-weight: bold;
  `,
  Img: styled.img`
    max-width: 2rem;
    margin: 0 0.9rem;
  `,
};

export default Cart;
