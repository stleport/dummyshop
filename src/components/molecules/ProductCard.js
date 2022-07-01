import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import ProductPicture from "../atoms/ProductPicture";
import ProductDescription from "./ProductCardDescription";
import { theme } from "../../constants/colors";
import ProductCardFooter from "./ProductCardFooter";
import { useCart } from "../../utils/hooks";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { incrementCart, decrementCart, cartItems, pending } = useCart();
  const cartItem = cartItems?.find(
    (cartItem) => product.id === cartItem.productId
  );

  return (
    <Styled.ProductCard
      title={product.title}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <ProductPicture source={product.image} altText={product.title} />
      <ProductDescription
        title={product.title}
        description={product.description}
        category={product.category}
        price={product.price}
        cartItem={cartItem}
        pending={pending}
      />
      <ProductCardFooter
        price={product.price}
        productId={product.id}
        quantity={cartItem?.quantity ?? 0}
        cartItem={cartItem}
        incrementCart={incrementCart}
        decrementCart={decrementCart}
        pending={pending}
        cartData={{ products: cartItems }}
      />
    </Styled.ProductCard>
  );
};

const Styled = {
  ProductCard: styled.article`
    background-color: white;
    border-radius: 4px;
    padding: 0.5rem;
    display: flex;
    cursor: pointer;
    flex-direction: column;
    border-radius: 0 0 0.5rem 0.5rem;
    box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%),
      0 1px 3px 0 rgb(0 0 0 / 12%);
    border-radius: 6px;
    box-sizing: border-box;
    margin-bottom: 1.5rem;
    @media only screen and (min-width: ${theme.device.tablet}) {
      margin: unset;
    }
  `,
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default ProductCard;
