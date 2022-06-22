import React from "react";
import { Link } from "react-router-dom";

export const NavLinks = () => (
  <React.Fragment>
    <nav role="navigation">
      <Link to="/">Articles</Link>
    </nav>
  </React.Fragment>
);

export default NavLinks;
