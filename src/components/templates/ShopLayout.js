import React from "react";
import PropTypes from "prop-types";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import styled from "styled-components/macro";
import { theme } from "../../constants/colors";

const ShopLayout = ({ children }) => (
  <React.Fragment>
    <Header />
    <main>
      <Styled.PageWrapper>{children}</Styled.PageWrapper>
    </main>
    <Footer />
  </React.Fragment>
);

const Styled = {
  PageWrapper: styled.div`
    flex-direction: column;
    margin-top: 3rem;
    margin-left: auto !important;
    margin-right: auto !important;
    min-height: 100vh;

    @media only screen and (max-width: ${theme.device.tablet}) {
      width: auto !important;
      margin-left: 1em !important;
      margin-right: 1em !important;
    }

    @media only screen and (min-width: ${theme.device
        .tablet}) and (max-width: ${theme.device.desktop}) {
      max-width: 723px;
    }

    @media only screen and (min-width: ${theme.device
        .desktop}) and (max-width: ${theme.device.extraLargeDesktop}) {
      max-width: 933px;
    }

    @media only screen and (min-width: ${theme.device.extraLargeDesktop}) {
      max-width: 1127px;
    }
  `,
};

ShopLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopLayout;
