import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import logoBannerSrc from "../../assets/icons/logo_nafila.svg";
import bgMainDesktop from "../../assets/bg/home_desktop.svg";

import Footer from "../Footer";

import TitleComponent from "../TitleComponent";

const Header = styled.div`
  background-color: #fff;
  width: "100%";
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

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  padding: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${bgMainDesktop});
`;

const OnBoardingLayoutDesktop = ({ children }) => {
  return (
    <Grid
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <TitleComponent title="Como funciona" />
      <Header>
        <img src={logoBannerSrc} alt="logo" />
      </Header>
      <MainContainer>{children}</MainContainer>
      <Footer />
    </Grid>
  );
};

export default OnBoardingLayoutDesktop;
