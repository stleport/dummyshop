import React from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useClient } from "../../utils/api-client";
import * as Cart from "../../store/cartSlice";
import { theme } from "../../constants/colors";
import { Loader } from "../atoms/Spinner";

const Product = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const client = useClient();
  const items = useSelector(Cart.selectItems);
  const item = items.find((item) => item.id === id);
  const { data: product, status } = useQuery(["product", id], () =>
    client(`products/${id}`)
  );
  const onIncrementCart = (e) => {
    dispatch(Cart.incrementCart(id));
  };
  const decrementCart = (e) => {
    dispatch(Cart.decrementCart(id));
  };

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
            <button onClick={onIncrementCart}>+</button>
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
            <button onClick={decrementCart}>-</button>
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
    button {
      display; flex;
      align-items; center;
      justify-content: center;
      width: 2rem;
      cursor: pointer;
      background-color: white;
      border: 1px solid ${theme.colors.grey};
      height: 2rem;
    }
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
    display: flex;
    flex-direction: column;
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
