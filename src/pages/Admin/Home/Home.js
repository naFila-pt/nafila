import React from "react";

import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "../../../components/Button";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

import bgMainMobile from "../../../assets/bg/home_mobile.svg";
import bgMain from "../../../assets/bg/home_desktop.svg";
import logoSrc from "../../../assets/logo.svg";
import personSrc from "../../../assets/icons/pessoa_homepage_desktop.svg";
import personManSrc from "../../../assets/icons/person_man.svg";

import * as Routes from "../../../constants/RoutesConstants";

import TitleComponent from "../../../components/TitleComponent";

const HomeContent = styled(Grid)`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  @media (min-width: 768px) {
    height: 100vh;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  padding: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${bgMainMobile});
  & .content {
    display: grid;
    grid-template-columns: 100%;
    height: 100vh;
    justify-items: center;
  }
  @media (min-width: 768px) {
    background-image: url(${bgMain});
    min-height: 0;
    flex: 1;
    & .content {
      grid-template-columns: 50% 50%;
      grid-template-rows: 100%;
      height: 100%;
    }
  }
`;

const Column = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    justify-content: space-evenly;
  }
`;

const MobileLogo = styled(Grid)`
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    display: none;
  }
  img {
    width: 65%;
  }
`;

const DektopLogo = styled(Grid)`
  height: 50%;
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const GridIntro = styled(Grid)`
  text-align: center;
  & h1 {
    font-size: 1.75em !important;
  }
  & span {
    font-size: 20px !important;
  }
  @media (min-width: 768px) {
    text-align: left;
  }
  @media (min-width: 340px) {
    & h1 {
      font-size: 3.75em !important;
    }
    & span {
      font-size: 30px !important;
    }
  }
`;

const ButtonsWrapper = styled(Grid)`
  display: flex;
  position: absolute;
  bottom: 0px;
  margin-bottom: 10px;
  flex-direction: column;
  text-align: center;
  @media (min-width: 768px) {
    display: flex;
    margin: 0;
    position: relative;
  }
`;

const HiddenColumn = styled(Grid)`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    width: 100%;
  }
`;

const handleLogoOnClick = e => {
  window.location.href = "/";
};

const Home = () => {
  const { t } = useTranslation();

  return (
    <HomeContent>
      <TitleComponent title="Lojista" pageId="operator_home" />
      <Header />
      <Container>
        <div className="content">
          <Column>
            <MobileLogo>
              <img src={logoSrc} alt="logo" onClick={handleLogoOnClick} />
            </MobileLogo>
            <GridIntro>
              <Typography variant="h1">
                {t("onboarding#intro_welcome")}
              </Typography>
              <span
                dangerouslySetInnerHTML={{
                  __html: t("onboarding#intro_pitch")
                }}
              />
            </GridIntro>
            <DektopLogo>
              <img src={logoSrc} alt="logo" onClick={handleLogoOnClick} />
            </DektopLogo>
            <ButtonsWrapper>
              <Button
                forward
                fullWidth
                href={Routes.ADMIN_LOGIN_PATH}
                dangerouslySetInnerHTML={{
                  __html: t("admin#intro_login")
                }}
                style={{ marginBottom: "10px" }}
              />
              <Button
                forward
                fullWidth
                variant="secondary"
                href={Routes.ADMIN_HOME_ONBOARDING_PATH}
                dangerouslySetInnerHTML={{
                  __html: t("home#help_label")
                }}
              />
            </ButtonsWrapper>
          </Column>
          <HiddenColumn direction="row">
            <Grid
              container
              alignItems="flex-end"
              style={{ justifyContent: "center" }}
            >
              <img src={personSrc} alt="store" height="70%" width="100%" />
            </Grid>
            <Grid
              container
              alignItems="flex-end"
              style={{ justifyContent: "center" }}
            >
              <img src={personManSrc} alt="store" height="70%" width="100%" />
            </Grid>
          </HiddenColumn>
        </div>
      </Container>
      <Footer />
    </HomeContent>
  );
};

export default Home;
