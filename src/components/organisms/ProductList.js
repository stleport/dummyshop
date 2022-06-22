import React from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import { useClient } from "../../utils/api-client";
import ProductCard from "../molecules/ProductCard";
import { Loader } from "../atoms/Spinner";

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
    text-align: left;
    font-family: "Abel";
  `,
  Pagecount: styled.p`
    text-align: left;
  `,
  CardList: styled.section`
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
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
