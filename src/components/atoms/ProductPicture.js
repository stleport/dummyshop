import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";

const ProductPicture = ({ altText, source }) => {
  return (
    <React.Fragment>
      <Styled.ProductPicture>
        <Styled.Img title={altText} src={source} data-testid="background" />
      </Styled.ProductPicture>
    </React.Fragment>
  );
};

const Styled = {
  ProductPicture: styled.div`
    display: flex;
    align-items: center;
  `,
  Img: styled.img`
    width: 100%;
    height: 9rem;
    object-fit: cover;
  `,
};
ProductPicture.propTypes = {
  altText: PropTypes.string.isRequired,
};

export default ProductPicture;
