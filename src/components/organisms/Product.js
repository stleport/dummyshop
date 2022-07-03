import React from "react";
import styled from "styled-components/macro";
import { theme } from "../../constants/colors";
import { useCart } from "../../utils/hooks";
import CartButtons from "../molecules/CartButtons";

const Product = ({ product }) => {
  const { incrementCart, decrementCart, cartItems, pending } = useCart();
  const cartItem = cartItems?.find(
    (cartItem) => cartItem.productId === Number(product.id)
  );

  return (
    <Styled.Product>
      <Styled.CartQuantity>
        <h1>
          {`${product?.title} 
      ${cartItem?.quantity > 0 ? `(x${cartItem?.quantity})` : ""}`}
        </h1>
      </Styled.CartQuantity>
      <Styled.ProductDescription>
        <img src={product?.image} alt={product?.title} title={product?.title} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <p>{product?.description}</p>
          <p style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
            {product?.price.toFixed(2)} €
          </p>
          <CartButtons
            productId={product?.id}
            quantity={cartItem?.quantity ?? 0}
            incrementCart={incrementCart}
            decrementCart={decrementCart}
            pending={pending}
          />
        </div>
      </Styled.ProductDescription>
    </Styled.Product>
  );
};

Product.defaultProps = {
  products: [],
};

export const Styled = {
  CartQuantity: styled.div`
    margin-bottom: 1.4rem;
  `,
  ProductDescription: styled.div`
    display: flex;
    flex-direction: column;
    img {
      margin-right: 1rem;
      width: 100%;
      border: 1px solid #eee;
      padding: 1rem;
    }
    @media only screen and (min-width: ${theme.device.tablet}) {
      flex-direction: row;
    }
  `,
  Product: styled.div`
    background-color: white;
    padding: 1.8rem;
    img {
      width: 100%;
      align-self: center;
      @media only screen and (min-width: ${theme.device.tablet}) {
        width: 20rem;
      }
    }
  `,
};

export default Product;
