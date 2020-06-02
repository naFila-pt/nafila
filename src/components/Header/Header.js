import React from "react";
import styled from "styled-components";
import logoBannerSrc from "../../assets/icons/logo_nafila.svg";

const Container = styled.div`
  background-color: #fff;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 50px;
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }

  img {
    width: 100px;
  }
`;

const Header = () => (
  <Container>
    <img src={logoBannerSrc} alt="logo" />
  </Container>
);

export default Header;
