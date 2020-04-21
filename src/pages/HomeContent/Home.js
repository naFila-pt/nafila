import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import Button from "../../components/Button";
import bgMainMobile from "../../assets/bg/home_mobile.svg";
import bgMain from "../../assets/bg/home_desktop.svg";

import { ReactComponent as NaFilaIcon } from "../../assets/icons/nafila-text.svg";
import { ReactComponent as Tech4CovidIcon } from "../../assets/icons/tech4covid.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/google-icon.svg";
import { ReactComponent as NOSIcon } from "../../assets/icons/nos-icon.svg";

import logoSrc from "../../assets/logo.svg";
import logoBannerSrc from "../../assets/icons/logo_nafila.svg";
import storeSrc from "../../assets/icons/store_mobile.svg";
import personSrc from "../../assets/icons/pessoa_homepage_desktop.svg";

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
    flex: 1;
  }
`;

const LeftColumn = styled.div`
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

const Footer = styled(Grid)`
  width: 100%;
  height: 30%;
  display: grid;
  padding: 10px 15% 10px 15%;
  background-color: #8464ac;
  grid-template-columns: repeat(auto-fit, minmax(19em, 1fr));
  grid-row-gap: 20px;
  & .columns {
    width: 70%;
  }
  @media (min-width: 768px) {
    height: 200px;
  }
`;

const useStyles = makeStyles(theme => ({
  gridContainer: {
    alignContent: "center",
    marginTop: "-1em"
  },
  gridItem: {
    textAlign: "center",
    paddingTop: "1.8em"
  },
  linkLabel: {
    marginTop: "10px",
    fontSize: "20px"
  },
  column: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    "@media (min-width:768px)": {
      justifyContent: "center"
    }
  },
  rightColumn: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  logoIcon: {
    margin: "3em 0 5.5em 0"
  },
  container: {
    display: "grid",
    gridTemplateColumns: "100%",
    height: "100%",
    justifyItems: "center",
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "40% 60%",
      paddingBottom: "20px",
      paddingTop: "5px",
      paddingLeft: "5px",
      paddingRight: "100px"
    }
  },
  desktopButtons: {
    display: "none",
    flexDirection: "column",
    textAlign: "center",
    "@media (min-width:768px)": {
      display: "flex"
    }
  },
  mobileButtons: {
    position: "absolute",
    bottom: 0,
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    "@media (min-width:768px)": {
      display: "none"
    }
  },
  desktopLogo: {
    display: "none",
    "@media (min-width:768px)": {
      display: "flex"
    }
  }
}));

const Home = props => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <Header>
        <img src={logoBannerSrc} alt="logo" />
      </Header>
      <MainContainer>
        <div className={classes.container}>
          <LeftColumn>
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
            <Grid className={classes.desktopButtons}>
              <Button
                forward
                href="/como-funciona"
                dangerouslySetInnerHTML={{
                  __html: t("home#consumidor_label")
                }}
                style={{ marginBottom: "10px" }}
              />
              <Button
                forward
                variant="secondary"
                href="/lojista"
                dangerouslySetInnerHTML={{
                  __html: t("home#lojista_label")
                }}
              />
            </Grid>
            <Grid className={classes.mobileButtons}>
              {props.shouldSkipOnBoarding ? (
                <Button
                  forward
                  href={"/tirar-senha"}
                  dangerouslySetInnerHTML={{
                    __html: t("home#intro_button")
                  }}
                />
              ) : (
                <Button
                  forward
                  href={"/como-funciona"}
                  dangerouslySetInnerHTML={{
                    __html: t("home#help_label")
                  }}
                />
              )}
              <a href="/lojista" className={classes.linkLabel}>
                {t("home#lojista_label")}
              </a>
            </Grid>
          </LeftColumn>
          <Grid
            container
            direction="row"
            wrap="nowrap"
            className={classes.rightColumn}
          >
            <Grid container alignItems="flex-end" item>
              <img src={personSrc} alt="store" height="80%" />
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="space-evenly"
            >
              <Grid item>
                <img src={storeSrc} alt="store" />
              </Grid>
              <Grid item style={{ width: "90%" }}>
                <p
                  style={{ fontSize: "36px", lineHeight: "43px" }}
                  dangerouslySetInnerHTML={{ __html: t("home#intro_text") }}
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </MainContainer>
      <Footer>
        <div className="columns">
          <div style={{ display: "flex", alignItems: "center", height: "50%" }}>
            <NaFilaIcon />
          </div>
          <div style={{ display: "flex", alignItems: "center", height: "50%" }}>
            <Link
              style={{ color: "white" }}
              target="_blank"
              rel="noopener"
              href="https://tech4covid19.org"
            >
              <div style={{ display: "flex" }}>
                <p>Um projecto no âmbito do</p>
                <Tech4CovidIcon />
                <p>#tech4COVID19</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="columns">
          <div style={{ display: "flex", alignItems: "center", height: "30%" }}>
            <p style={{ margin: 0, color: "white", fontSize: "20px" }}>
              Parceiros
            </p>
          </div>
          <div
            style={{
              display: "flex",
              height: "30%",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <Link
              style={{ color: "white" }}
              target="_blank"
              rel="noopener"
              href="https://google.pt"
            >
              <GoogleIcon />
            </Link>
            <Link
              style={{ color: "white" }}
              target="_blank"
              rel="noopener"
              href="https://nos.pt"
            >
              <NOSIcon />
            </Link>
          </div>
          <div style={{ display: "flex", alignItems: "center", height: "30%" }}>
            <p style={{ margin: 0, color: "white", fontSize: "13px" }}>
              <Link
                style={{ color: "white" }}
                href="/termos-condicoes"
                target="_blank"
                rel="noopener"
              >
                {t("terms#title")}
              </Link>
              {" | "}
              <Link
                style={{ color: "white" }}
                href="https://facebook.com/nafila.pt"
                target="_blank"
                rel="noopener"
              >
                Facebook
              </Link>
            </p>
          </div>
        </div>
      </Footer>
    </Grid>
  );
};

export default withRouter(Home);
