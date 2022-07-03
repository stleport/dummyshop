import React from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useClient } from "../../utils/api-client";
import { theme } from "../../constants/colors";
import { SpinnerBlock } from "../atoms/Spinner";
import Product from "../organisms/Product";

const ProductPage = () => {
  const { id } = useParams();
  const client = useClient();
  const {
    data: product,
    status,
    isError,
  } = useQuery(["product", id], () => client(`products/${id}`));

  return (
    <>
      {isError ? (
        <div role="alert">
          Oops... An error occurred, please try again later.
        </div>
      ) : status === "loading" ? (
        <SpinnerBlock data-testid="loading" />
      ) : (
        <Product product={product} />
      )}
    </>
  );
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

export default ProductPage;
