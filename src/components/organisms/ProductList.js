import React from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import { useClient } from "../../utils/api-client";
import ProductCard from "../molecules/ProductCard";
import { Loader } from "../atoms/Spinner";
import { theme } from "../../constants/colors";

const ProductList = () => {
  const client = useClient();
  const { data, status } = useQuery("productList", () => client("products"));
  const productList =
    data?.products.length > 0 &&
    data?.products.map((item) => <ProductCard key={item.id} product={item} />);

  if (status === "loading") {
    return (
      <Styled.FullSpaceContainer>
        <Loader data-testid="loading" />
      </Styled.FullSpaceContainer>
    );
  }

  return (
    <React.Fragment>
      <Styled.H1>Notre sélection</Styled.H1>
      <Styled.Pagecount>
        {data?.products.length > 0 &&
          `${data?.products.length} produits trouvés`}
      </Styled.Pagecount>
      <Styled.CardList>{productList}</Styled.CardList>
    </React.Fragment>
  );
};

const Styled = {
  H1: styled.h1`
    font-size: 2.5rem;
    font-family: "Abel";
  `,
  Pagecount: styled.p`
    text-align: left;
  `,
  CardList: styled.section`
    display: block;
    @media only screen and (min-width: ${theme.device.tablet}) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-auto-rows: auto;
      grid-gap: 1.5rem;
    }
    @media only screen and (min-width: ${theme.device.desktop}) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media only screen and (min-width: ${theme.device.largeDesktop}) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media only screen and (min-width: ${theme.device.extraLargeDesktop}) {
      grid-template-columns: repeat(5, 1fr);
    }
  `,
  FullSpaceContainer: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
  `,
};

export default ProductList;
