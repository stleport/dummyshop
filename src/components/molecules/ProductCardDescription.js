import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const ProductDescription = ({ title, description, stock }) => (
  <Styled.ProductDescription>
    <div>
      <h2>{title}</h2>
      <div name="description">{description}</div>
      <div>{`${stock} exemplaires en stock`}</div>
    </div>
  </Styled.ProductDescription>
);

const Styled = {
  ProductDescription: styled.div`
    flex: 1;
    padding: 0.5rem;
    line-height: 1.3rem;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    flex-flow: column nowrap;
    > div:first-child {
      flex-grow: 1;
      h2 {
        line-height: 1.6rem;
        margin-top: 0;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }
      > div:first-of-type {
        font-style: normal;
        margin-bottom: 0.5rem;
      }
      > div:nth-of-type(2) {
        font-style: italic;
      }
    }
  `,
};

ProductDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
};

export default ProductDescription;
