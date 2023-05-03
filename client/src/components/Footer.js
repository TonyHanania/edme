import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
const Footer = () => {
  return (
    <>
      <FooterWrapper>
        <div>
          Final Project
          <img height="50px" src={Logo} /> By: Tony Hanania
        </div>
      </FooterWrapper>
    </>
  );
};
const FooterWrapper = styled.footer`
  div {
    position: fixed;
    bottom: 0;
    max-width: 1200px;
    width: 100%;
    height: 60px;
    border: rgb(221, 252, 229) 2px solid;
    background-color: #f5fdf2;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export default Footer;
