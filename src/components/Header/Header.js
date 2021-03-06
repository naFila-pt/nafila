import React from "react";
import styled from "styled-components";
import logoBannerSrc from "../../assets/icons/logo_nafila.svg";

const Container = styled.div`
  background-color: ${props => props.bg};
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 50px;
  display: none;
  background-color: white;
  @media (min-width: 768px) {
    display: flex;
  }

  img {
    width: 100px;
  }
`;

const handleLogoOnClick = e => {
  window.location.href = "/";
};

const Header = ({ bg }) => (
  <Container>
    <img
      src={logoBannerSrc}
      alt="logo"
      onClick={handleLogoOnClick}
      style={{ cursor: "pointer" }}
    />
  </Container>
);

Header.defaultProps = {
  bg: "#fff"
};

export default Header;
