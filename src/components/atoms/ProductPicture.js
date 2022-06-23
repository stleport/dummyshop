import React from "react";
import PropTypes from "prop-types";
import { DEFAULT_PICTURE } from "../../constants";
import styled from "styled-components/macro";

const ProductPicture = ({ altText, source }) => {
  return (
    <React.Fragment>
      <Styled.ProductPicture>
        <Styled.Img title={altText} source={source} data-testid="background" />
      </Styled.ProductPicture>
    </React.Fragment>
  );
};

const Styled = {
  ProductPicture: styled.div`
    display: flex;
    align-items: center;
  `,
  Img: styled.div`
    width: 100%;
    height: 8rem;
    background-image: url(${(props) => props.source || DEFAULT_PICTURE});
    background-position: center center;
    background-size: auto 100%;
    background-repeat: no-repeat;
  `,
};
ProductPicture.propTypes = {
  altText: PropTypes.string.isRequired,
};

export default ProductPicture;
