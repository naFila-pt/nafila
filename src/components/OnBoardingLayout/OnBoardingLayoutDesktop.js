import React from "react";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";
import bgMainDesktop from "../../assets/bg/home_desktop.svg";

import Header from "../Header";
import Footer from "../Footer";

import TitleComponent from "../TitleComponent";

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
      <TitleComponent title="Como funciona" pageId="tutorial" />
      <Header />
      <MainContainer>{children}</MainContainer>
      <Footer />
    </Grid>
  );
};

export default OnBoardingLayoutDesktop;
