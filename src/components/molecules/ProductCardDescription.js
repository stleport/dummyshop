import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const ProductDescription = ({ title, description, stock, price }) => (
  <Styled.ProductDescription>
    <h2>{title}</h2>
    <div name="description">{description}</div>
    <div>{`${stock} exemplaires en stock`}</div>
    <div>{`${price} €`}</div>
  </Styled.ProductDescription>
);

const Styled = {
  ProductDescription: styled.div`
    padding: 1rem;
    line-height: 1.3rem;
    h2 {
      line-height: 1.6rem;
      margin-top: 0;
    }
    div:last-of-type {
      margin-top: 0.5rem;
      font-weight: bold;
    }
  `,
};

ProductDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
};

export default ProductDescription;
