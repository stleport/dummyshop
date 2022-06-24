import React from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useClient } from "../../utils/api-client";
import * as Cart from "../../store/cartSlice";
import { theme } from "../../constants/colors";
import { Loader } from "../atoms/Spinner";
import { useCart } from "../../utils/hooks";
import ProductButton from "../atoms/ProductButton";

const Product = () => {
  const { id } = useParams();
  const client = useClient();
  const { incrementCart, decrementCart } = useCart();
  const items = useSelector(Cart.selectItems);
  const item = items.find((item) => item.id === Number(id));
  const { data: product, status } = useQuery(["product", id], () =>
    client(`products/${id}`)
  );

  return (
    <>
      {status === "loading" ? (
        <Styled.FullSpaceContainer>
          <Loader data-testid="loading" />
        </Styled.FullSpaceContainer>
      ) : (
        <Styled.Product>
          <h1>{product?.title}</h1>
          <Styled.CartQuantity style={{ display: "flex" }}>
            <ProductButton
              label="-"
              available={product.quantity > 0}
              onChangeQuantity={decrementCart(product.id)}
            />

            <span
              aria-label="count"
              style={{
                margin: "0 .5rem",
                fontSize: "1.6rem",
                minWidth: "2rem",
                textAlign: "center",
              }}
            >
              {item?.quantity ?? "0"}
            </span>
            <ProductButton
              primary
              label="+"
              available={product.quantity > 0}
              onChangeQuantity={incrementCart(product.id)}
            />
          </Styled.CartQuantity>
          <Styled.ProductDescription>
            <img
              src={product.images && product.images[0]}
              alt={product?.title}
              title={product?.title}
            />
            <p>{product?.description}</p>
          </Styled.ProductDescription>
        </Styled.Product>
      )}
    </>
  );
};

export const Styled = {
  FullSpaceContainer: styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
  `,
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
