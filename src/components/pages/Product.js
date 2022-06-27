import React from "react";
import styled from "styled-components/macro";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useClient } from "../../utils/api-client";
import { theme } from "../../constants/colors";
import { Loader } from "../atoms/Spinner";
import { useCart } from "../../utils/hooks";
import ProductButtons from "../molecules/ProductButtons";

const Product = () => {
  const { id } = useParams();
  const client = useClient();
  const queryClient = useQueryClient();
  const { data: product, status } = useQuery(["product", id], () =>
    client(`products/${id}`)
  );
  const cart = queryClient.getQueryData(["cart"]);
  const cartItem = cart?.products.find(
    (cartItem) => cartItem.productId === Number(id)
  );
  const { incrementCart, decrementCart, pending } = useCart();

  return (
    <>
      {status === "loading" ? (
        <Styled.FullSpaceContainer>
          <Loader data-testid="loading" />
        </Styled.FullSpaceContainer>
      ) : (
        <Styled.Product>
          <Styled.CartQuantity>
            <h1>
              {`${product?.title} 
            ${cartItem?.quantity > 0 ? `(x${cartItem?.quantity})` : ""}`}
            </h1>
          </Styled.CartQuantity>
          <Styled.ProductDescription>
            <img
              src={product?.image}
              alt={product?.title}
              title={product?.title}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p>{product?.description}</p>
              <p style={{ fontWeight: "bold", fontSize: "1.4rem" }}>
                {product?.price.toFixed(2)} €
              </p>
              <ProductButtons
                productId={product?.id}
                quantity={cartItem?.quantity ?? 0}
                incrementCart={incrementCart}
                decrementCart={decrementCart}
                pending={pending}
              />
            </div>
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
