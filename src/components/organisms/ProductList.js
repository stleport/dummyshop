import React from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import { useClient } from "../../utils/api-client";
import ProductCard from "../molecules/ProductCard";
import { SpinnerBlock } from "../atoms/Spinner";
import { theme } from "../../constants/colors";

const ProductList = () => {
  const client = useClient();
  const { data, status } = useQuery(
    "productList",
    async () => await client("products")
  );
  const productList = data?.map((item) => (
    <ProductCard key={item.id} product={item} />
  ));

  if (status === "loading") return <SpinnerBlock data-testid="loading" />;

  return (
    <React.Fragment>
      <Styled.H1>Highlight</Styled.H1>
      <Styled.Pagecount>
        {data?.length > 0 && `${data?.length} items found`}
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
};

ProductList.defaultProps = {
  data: {
    products: [],
  },
};

export default ProductList;
