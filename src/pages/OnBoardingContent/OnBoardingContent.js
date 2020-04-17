import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import OnBoardingLayout from "../../components/OnBoardingLayout";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "../../components/Button";

import bgIntro from "../../assets/bg/user_intro.svg";
import bgStore from "../../assets/bg/user_store.svg";
import bgMain from "../../assets/bg/user_onboard_main.svg";

import { ReactComponent as NaFilaIcon } from "../../assets/icons/nafila-text.svg";
import { ReactComponent as NaFilaIconBanner } from "../../assets/icons/nafila-text-second.svg";
import { ReactComponent as Tech4CovidIcon } from "../../assets/icons/tech4covid19-text.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/google-icon.svg";
import { ReactComponent as NOSIcon } from "../../assets/icons/nos-icon.svg";
import { ReactComponent as AmazonIcon } from "../../assets/icons/amazon-icon.svg";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as EmailNotification } from "../../assets/icons/onboarding_email_notification.svg";

const useStyles = makeStyles({
  gridContainer: {
    alignContent: "center",
    marginTop: "-1em"
  },
  gridItemIntro: {
    textAlign: "center",
    marginTop: "-2.5em"
  },
  gridItem: {
    textAlign: "center",
    paddingTop: "1.8em"
  },
  inputRoot: {
    width: "calc(100% - 4em)",
    textAlign: "center",
    fontWeight: 900,
    margin: "0 2em"
  },
  inputElement: {
    textAlign: "center",
    color: "#4C0788"
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
    justifyContent: "center",
    "@media (min-width:768px)": {
      width: "50%"
    }
  },
  logoIcon: {
    margin: "3em 0 1.5em 0"
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
  footer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(19em, 1fr))",
    width: "100%",
    height: "30vh",
    backgroundColor: "#8464AC",
    padding: "10px 15% 10px 15%"
  }
});

const OnBoardingContent = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [activeMenu, setActiveMenu] = React.useState("home");

  const endOnBoarding = () => {
    try {
      localStorage.setItem("skipOnBoarding", true);
    } catch (error) {}
    window.location.href = "/?skipIntro";
  };

  const HomeContent = () => (
    <div style={{ height: "100vh" }}>
      <div className="Home-Container-Wrapper">
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "10%"
          }}
        >
          <div>
            <NaFilaIconBanner />
          </div>
        </div>
        <Grid container direction="column" className={classes.column}>
          <div
            style={{
              height: "100%",
              display: "grid",
              gridTemplateRows: "20% 50% 30%",
              alignItems: "center"
            }}
          >
            <Grid item className={classes.gridItemIntro}>
              <Typography
                variant="h1"
                style={{ marginBottom: "0.3em", fontSize: "2.375em" }}
              >
                {t("onboarding#intro_welcome")}
              </Typography>
              <span
                style={{ fontSize: "24px" }}
                dangerouslySetInnerHTML={{
                  __html: t("onboarding#intro_pitch")
                }}
              />
            </Grid>
            <Grid item className={classes.gridItemIntro}>
              <Logo className={classes.logoIcon} />
            </Grid>
            <Grid className={classes.desktopButtons}>
              <Button
                forward
                onClick={() => setActiveMenu("onboarding")}
                dangerouslySetInnerHTML={{
                  __html: t("home#lojista_label")
                }}
              />
            </Grid>
            <Grid className={classes.mobileButtons}>
              <Button
                forward
                onClick={() => setActiveMenu("onboarding")}
                dangerouslySetInnerHTML={{
                  __html: t("home#help_label")
                }}
              />
              <a
                href="http://google.pt"
                rel="noopener noreferrer"
                target="_blank"
                className={classes.linkLabel}
              >
                {t("home#lojista_label")}
              </a>
            </Grid>
          </div>
        </Grid>
      </div>
      <Grid className={classes.footer}>
        <div>
          <div style={{ display: "flex", alignItems: "center", height: "50%" }}>
            <NaFilaIcon />
          </div>
          <div style={{ display: "flex", alignItems: "center", height: "50%" }}>
            <Tech4CovidIcon />
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
            <GoogleIcon />
            <NOSIcon />
            <AmazonIcon />
          </div>
          <div style={{ display: "flex", alignItems: "center", height: "30%" }}>
            <p style={{ margin: 0, color: "white", fontSize: "13px" }}>
              Termos e Condições | Privacidade | Contactos | Facebook
            </p>
          </div>
        </div>
      </Grid>
    </div>
  );
  if (activeMenu === "home") {
    return <HomeContent />;
  }
  return (
    <OnBoardingLayout
      bg={[bgIntro, bgStore, bgMain]}
      endOnBoarding={endOnBoarding}
    >
      <Grid container direction="column" className={classes.gridContainer}>
        <div style={{ textAlign: "center" }}>
          <Logo className="logo-icon" />
        </div>
        <Grid item className={classes.gridItemIntro}>
          <Typography
            variant="h1"
            style={{ margin: "0.3em 0 0", fontSize: "2.375em" }}
          >
            {t("onboarding#intro_welcome")}
          </Typography>
          <span
            style={{ fontSize: "24px" }}
            dangerouslySetInnerHTML={{ __html: t("onboarding#intro_pitch") }}
          />
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography
            variant="h1"
            style={{ color: "#FFC836", marginBottom: "0.95em" }}
            gutterBottom
          >
            {t("onboarding#store_title")}
          </Typography>
          <Typography
            variant="h4"
            style={{ padding: "0 1em" }}
            dangerouslySetInnerHTML={{
              __html: t("onboarding#store_description")
            }}
          />
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography
            variant="h1"
            style={{ marginBottom: "0.95em" }}
            gutterBottom
          >
            {t("onboarding#useCode_title")}
          </Typography>
          <Typography
            variant="h4"
            style={{ padding: "0 1.5em" }}
            dangerouslySetInnerHTML={{
              __html: t("onboarding#useCode_description")
            }}
          />
          <Input
            value={t("onboarding#useCode_inputPlaceholder")}
            classes={{ root: classes.inputRoot, input: classes.inputElement }}
            style={{
              fontSize: "1.625em",
              margin: "0.9em 0 0.385em"
            }}
            disabled
          />
          <div>{t("onboarding#useCode_instruction")}</div>
          <Button
            size={window.innerWidth < 350 ? "small" : ""}
            variant="onboarding"
            forward
            style={{ marginTop: "2em", color: "#4C0788" }}
            disabled
          >
            {t("onboarding#useCode_button")}
          </Button>
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography
            variant="h1"
            style={{ color: "#FFC836", padding: "0 1em" }}
          >
            {t("onboarding#insertEmail_title")}
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            style={{ padding: "0 1em" }}
            dangerouslySetInnerHTML={{
              __html: t("onboarding#insertEmail_description")
            }}
          />
          <EmailNotification className="email-icon" />
          <Typography
            variant="h4"
            gutterBottom
            style={{ marginBottom: "2em" }}
            dangerouslySetInnerHTML={{
              __html: t("onboarding#insertEmail_notification")
            }}
          />
          <Button
            onClick={endOnBoarding}
            forward
            dangerouslySetInnerHTML={{
              __html: t("onboarding#insertEmail_button")
            }}
          />
        </Grid>
      </Grid>
    </OnBoardingLayout>
  );
};

export default withRouter(OnBoardingContent);
