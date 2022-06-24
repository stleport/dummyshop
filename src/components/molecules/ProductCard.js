import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import ProductPicture from "../atoms/ProductPicture";
import ProductDescription from "./ProductCardDescription";
import { theme } from "../../constants/colors";
import ProductButtons from "../molecules/ProductButtons";
import { useSelector } from "react-redux";
import * as Cart from "../../store/cartSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const items = useSelector(Cart.selectItems);
  const item = items.find((item) => item.id === product.id);
  const productTitle = `${product.title} ${
    item?.quantity > 0 ? ` (x${item?.quantity})` : ""
  }`;
  return (
    <Styled.ProductCard
      title={`${productTitle} (${
        product.stock > 0 ? "en stock" : "non disponible"
      })`}
      data-testid="card"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <ProductPicture source={product.thumbnail} altText={product.title} />
      <ProductDescription
        title={productTitle}
        description={product.description}
        stock={product.stock}
        price={product.price}
      />
      <Styled.ProductCardFooter>
        <div>{`${product.price} €`}</div>
        <ProductButtons
          productId={product.id}
          quantity={item?.quantity}
          available={product.quantity}
        />
      </Styled.ProductCardFooter>
    </Styled.ProductCard>
  );
};

const Styled = {
  ProductCard: styled.article`
    border: 2px solid #e7e7e7;
    border-radius: 4px;
    padding: 0.5rem;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    border-radius: 0 0 0.5rem 0.5rem;
    box-shadow: 0 2px 4px 0 rgba(139, 159, 196, 0.45);
    box-sizing: border-box;
    margin-bottom: 1.5rem;
    @media only screen and (min-width: ${theme.device.tablet}) {
      margin: unset;
    }
  `,
  ProductCardFooter: styled.div`
    display: flex;
    flex: 1 1 0;
    flex-grow: 0;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;
    font-weight: bold;
    font-size: 1.4rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
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
