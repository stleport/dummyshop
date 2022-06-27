import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const ProductDescription = ({ title, description, category }) => (
  <Styled.ProductDescription>
    <div>
      <h2>{title}</h2>
      <div name="category">{category}</div>
      <div name="description">{description}</div>
    </div>
  </Styled.ProductDescription>
);

const Styled = {
  ProductDescription: styled.div`
    word-break: break-word;
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
        margin-bottom: 0.2rem;
        font-size: 1.2rem;
      }
      > div:nth-of-type(2) {
        font-style: bold;
        margin-bottom: 0.5rem;
        display: -webkit-box;
        max-width: 200px;
        -webkit-line-clamp: 6;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      > div:first-of-type {
        color: #aaa;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
      }
    }
  `,
};

ProductDescription.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default ProductDescription;
