import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <p className="text-center mt-3">
        <Link to="/about">Cookie settings</Link>|
        <Link to="/contact">Privacy Policy</Link>|
        <Link to="/policy">Terms and Conditions</Link>|
        <Link to="/policy">PUBLISHED BY</Link>|
        <Link to="/policy"> © 2020 adidas Vietnam Company Limited</Link>
      </p>
    </div>
  );
};

export default Footer;