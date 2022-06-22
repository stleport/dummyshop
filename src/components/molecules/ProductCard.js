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
  ProductCard: styled.div`
    flex: 0 0 100%;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    margin-bottom: 20px;
    border: 1px solid #eee;
    background-color: white;
    border-radius: 0 0 0.4rem 0.4rem;
    box-shadow: 0 2px 4px 0 rgba(139, 159, 196, 0.2);
    margin-left: 0;
    @media only screen and (min-width: ${theme.device.tablet}) {
      flex: 0 0 200px;
      margin: 1rem 0.8rem;
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
