import React from "react";

import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "../../../components/Button";
import Footer from "../../../components/Footer";

import bgMainMobile from "../../../assets/bg/home_mobile.svg";
import bgMain from "../../../assets/bg/home_desktop.svg";
import logoBannerSrc from "../../../assets/icons/logo_nafila.svg";
import logoSrc from "../../../assets/logo.svg";
import personSrc from "../../../assets/icons/pessoa_homepage_desktop.svg";
import personManSrc from "../../../assets/icons/person_man.svg";

import * as Routes from "../../../constants/RoutesConstants";

const Header = styled.div`
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
    height: 100%;
    justify-items: center;
  }
  @media (min-width: 768px) {
    background-image: url(${bgMain});
    flex: 1;
    & .content {
      grid-template-columns: 50% 50%;
      padding: 5px 100px 20px 5px;
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
  }
`;

const Home = () => {
  const { t } = useTranslation();

  return (
    <Grid
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <Header>
        <img src={logoBannerSrc} alt="logo" />
      </Header>
      <Container>
        <div className="content">
          <Column>
            <MobileLogo>
              <img src={logoSrc} alt="logo" />
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
              <img src={logoSrc} alt="logo" />
            </DektopLogo>
            <ButtonsWrapper>
              <Button
                forward
                fullWidth
                target="_blank"
                href="https://geralnafilapt.typeform.com/to/VtDUdM"
                dangerouslySetInnerHTML={{
                  __html: t("admin#register")
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
          <HiddenColumn container direction="row" wrap="nowrap">
            <Grid container alignItems="flex-end" item>
              <img src={personSrc} alt="store" height="70%" />
            </Grid>
            <Grid container alignItems="flex-end" item>
              <img src={personManSrc} alt="store" height="70%" />
            </Grid>
          </HiddenColumn>
        </div>
      </Container>
      <Footer />
    </Grid>
  );
};

export default Home;
