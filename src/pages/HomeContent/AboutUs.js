import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import bgMainMobile from "@src/assets/bg/home_mobile.svg";
import bgMain from "@src/assets/bg/home_desktop.svg";
import logoBannerSrc from "@src/assets/icons/logo_nafila.svg";
import twoPeopleSrc from "@src/assets/icons/two_people.svg";

import Grid from "@material-ui/core/Grid";
import Footer from "@src/components/Footer";

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
  position: relative;
  height: 100vh;
  padding: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${bgMainMobile});

  @media (min-width: 768px) {
    background-image: url(${bgMain});
    height: unset;
    padding: 24px 166px;
  }
`;

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <Grid
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <Header>
        <img src={logoBannerSrc} alt="logo" />
      </Header>
      <MainContainer>
        <Grid container>
          <Grid item xs={7}>
            <h1>{t("about_us#title_about_us")}</h1>
            <h3>{t("about_us#title_what")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("about_us#text_what") }} />

            <h3>{t("about_us#title_why")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("about_us#text_why") }} />

            <h1>{t("about_us#title_team")}</h1>
            <p dangerouslySetInnerHTML={{ __html: t("about_us#text_team") }} />
          </Grid>
          <Grid item xs={5}>
            <img src={twoPeopleSrc} alt="Two people" />
          </Grid>
        </Grid>
      </MainContainer>
      <Footer />
    </Grid>
  );
};

export default AboutUs;
