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
import { ReactComponent as Tech4CovidIcon } from "../../assets/icons/tech4covid19-text.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/google-icon.svg";
import { ReactComponent as NOSIcon } from "../../assets/icons/nos-icon.svg";

import logoSrc from "../../assets/logo.svg";
import logoBannerSrc from "../../assets/icons/logo_nafila.svg";
import storeSrc from "../../assets/icons/store_mobile.svg";
import personSrc from "../../assets/icons/pessoa_homepage_desktop.svg";

const Header = styled.div`
  backgroud-color: whit;
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
  flex: 1;
  padding: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${bgMainMobile});
  @media (min-width: 768px) {
    background-image: url(${bgMain});
  }
`;

const useStyles = makeStyles(theme => ({
  gridContainer: {
    alignContent: "center",
    marginTop: "-1em"
  },
  gridItemIntro: {
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      textAlign: "left"
    }
  },
  gridItem: {
    textAlign: "center",
    paddingTop: "1.8em"
  },
  linkLabel: {
    marginTop: "10px",
    fontSize: "20px"
  },
  logoHome: {
    width: "85%"
  },
  column: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-evenly"
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
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    "@media (min-width:768px)": {
      display: "none"
    }
  },
  mobileLogo: {
    display: "flex",
    justifyContent: "center",
    "@media (min-width:768px)": {
      display: "none"
    }
  },
  desktopLogo: {
    display: "none",
    "@media (min-width:768px)": {
      display: "flex"
    }
  },
  footer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(19em, 1fr))",
    width: "100%",
    height: "100px",
    backgroundColor: "#8464AC",
    padding: "10px 15% 10px 15%"
  }
}));

const Home = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Grid style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <Header>
        <img src={logoBannerSrc} alt="logo" />
      </Header>
      <MainContainer>
        <div className={classes.container}>
          <Grid container direction="column" className={classes.column}>
            <Grid item className={classes.mobileLogo}>
              <img src={logoSrc} alt="logo" className={classes.logoHome} />
            </Grid>
            <Grid item className={classes.gridItemIntro}>
              <Typography
                variant="h1"
                style={{ marginBottom: "0.3em", fontSize: "3.75em" }}
              >
                {t("onboarding#intro_welcome")}
              </Typography>
              <span
                style={{ fontSize: "30px" }}
                dangerouslySetInnerHTML={{
                  __html: t("onboarding#intro_pitch")
                }}
              />
            </Grid>
            <Grid item className={classes.desktopLogo}>
              <img src={logoSrc} alt="logo" className={classes.logoHome} />
            </Grid>
            <Grid className={classes.desktopButtons}>
              <Button
                forward
                href={"https://geralnafilapt.typeform.com/to/VtDUdM"}
                target={"_blank"}
                dangerouslySetInnerHTML={{
                  __html: t("home#lojista_label")
                }}
              />
            </Grid>
            <Grid className={classes.mobileButtons}>
              <Button
                forward
                onClick={() => {}}
                dangerouslySetInnerHTML={{
                  __html: t("home#help_label")
                }}
              />
              <a
                href="https://geralnafilapt.typeform.com/to/VtDUdM"
                rel="noopener noreferrer"
                target="_blank"
                className={classes.linkLabel}
              >
                {t("home#lojista_label")}
              </a>
            </Grid>
          </Grid>
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
      <Grid className={classes.footer}>
        <div>
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
              <Tech4CovidIcon />
            </Link>
          </div>
        </div>
        <div>
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
      </Grid>
    </Grid>
  );
};

export default withRouter(Home);
