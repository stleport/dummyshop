import React from "react";
import PropTypes from "prop-types";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import styled from "styled-components/macro";
import { theme } from "../../constants/colors";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

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
    min-height: 100vh;
    width: auto !important;
    margin-top: 6.5rem;
    margin: 6rem 1rem;
    @media only screen and (min-width: ${theme.device.tablet}) {
      margin: 6.5rem auto;
      max-width: 723px;
    }

    @media only screen and (min-width: ${theme.device.desktop}) {
      max-width: 950px;
    }

    @media only screen and (min-width: ${theme.device.largeDesktop}) {
      max-width: 1100px;
    }

    @media only screen and (min-width: ${theme.device.extraLargeDesktop}) {
      max-width: 1500px;
    }
  `,
};

ShopLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopLayout;
