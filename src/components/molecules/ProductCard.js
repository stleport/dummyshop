import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import ProductPicture from "../atoms/ProductPicture";
import ProductDescription from "./ProductCardDescription";
import { theme } from "../../constants/colors";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Styled.ProductCard
      title={`${product.title} (${
        product.stock > 0 ? "en stock" : "non disponible"
      })`}
      data-testid="card"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <ProductPicture source={product.thumbnail} altText={product.title} />
      <ProductDescription
        title={product.title}
        description={product.description}
        stock={product.stock}
        price={product.price}
      />
    </Styled.ProductCard>
  );
};

const Styled = {
  ProductCard: styled.article`
    display: flex;
    cursor: pointer;
    flex-direction: column;
    border-radius: 0 0 0.5rem 0.5rem;
    box-shadow: 0 2px 4px 0 rgba(139, 159, 196, 0.45);
    box-sizing: border-box;
    margin: 0.8rem 0.5em;
    flex: 1 0 100%;
    @media only screen and (min-width: ${theme.device.mobile}) {
      max-width: calc(50% - 1em);
    }
    @media only screen and (min-width: ${theme.device.desktop}) {
      max-width: calc(25% - 1em);
    }
  `,
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    stock: PropTypes.number,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
