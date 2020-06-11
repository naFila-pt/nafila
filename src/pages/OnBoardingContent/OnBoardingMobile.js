import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useTranslation } from "react-i18next";
import { OnBoardingLayoutMobile } from "../../components/OnBoardingLayout";

import { makeStyles } from "@material-ui/core/styles";

import bgIntro from "../../assets/bg/user_intro.svg";
import bgStore from "../../assets/bg/user_store.svg";
import bgMain from "../../assets/bg/user_onboard_main.svg";

import { ReactComponent as Logo } from "../../assets/logo.svg";

import MobileHand from "../../assets/icons/Group_636.svg";
import MobileHandSms from "../../assets/icons/mobileHandSms.svg";
import StoreCodeInfo from "../../assets/icons/QR_Code.svg";
import StoreMobile from "../../assets/icons/store_mobile.svg";
import Person from "../../assets/icons/pessoa_homepage_desktop.svg";

import * as Routes from "../../constants/RoutesConstants";

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
    paddingTop: "1.8em",
    paddingLeft: "1.5em",
    paddingRight: "1.5em"
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
  bannerContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    paddingTop: "30px",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  bannerIcon: {
    width: "100px",
    height: "33px",
    marginTop: "20px"
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
    display: "block",
    "@media (min-width:768px)": {
      display: "none"
    }
  },
  desktopLogo: {
    display: "none",
    "@media (min-width:768px)": {
      display: "block"
    }
  },
  footer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(19em, 1fr))",
    width: "100%",
    minHeight: "10vh",
    backgroundColor: "#8464AC",
    padding: "10px 15% 10px 15%"
  },
  handContainer: {
    display: "flex",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "40%",
    "@media (min-width:374px)": {
      height: "50%"
    }
  },
  storeImg: {
    width: "50%",
    height: "60%"
  },
  mobileHand: {
    width: "50%",
    height: "70%",
    marginTop: "10%",
    "@media (min-width:374px)": {
      height: "80%"
    }
  },
  store: {
    width: "100%",
    position: "absolute",
    bottom: "200px",
    left: "50px"
  },
  person: {
    position: "absolute",
    bottom: "80px",
    left: 0,
    height: "235px"
  }
}));

const endOnBoarding = () => {
  try {
    localStorage.setItem("skipOnBoarding", true);
  } catch (error) {}
  window.location.href = Routes.TICKET_PATH;
};

const OnboardingMobile = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <OnBoardingLayoutMobile
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
            style={{ color: "#FFC836", padding: "0 1em" }}
          >
            {t("onboarding#justOneSMS")}
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            style={{ padding: "0 1em", marginTop: "30px" }}
            dangerouslySetInnerHTML={{
              __html: t("onboarding#register_nafila")
            }}
          />
          <Typography
            variant="body2"
            gutterBottom
            style={{ marginTop: "1em", marginBottom: "1em" }}
            dangerouslySetInnerHTML={{
              __html: t("onboarding#difficulties")
            }}
          />
          <div className={classes.handContainer}>
            <img
              src={StoreCodeInfo}
              alt="store code"
              className={classes.storeImg}
            />
            <img
              src={MobileHand}
              alt="mobile hand"
              className={classes.mobileHand}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography
            variant="h1"
            style={{ color: "#FFC836", padding: "0 0.5em" }}
          >
            {t("onboarding#register_site_title")}
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            style={{ padding: "0 0.5em", marginTop: "30px" }}
            dangerouslySetInnerHTML={{
              __html: t("onboarding#register_site_description")
            }}
          />
          <Typography
            variant="body2"
            gutterBottom
            style={{ marginTop: "1em" }}
            dangerouslySetInnerHTML={{
              __html: t("onboarding#phone_number")
            }}
          />
          <div
            style={{
              border: "1px solid rgba(132, 100, 172, 0.9)",
              opacity: "0.65",
              mixBlendMode: "normal"
            }}
          ></div>
          <div className={classes.handContainer}>
            <img
              src={StoreCodeInfo}
              alt="store code"
              className={classes.storeImg}
            />
            <img
              src={MobileHandSms}
              alt="mobile hand"
              className={classes.mobileHand}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography
            variant="h1"
            style={{ color: "#FFC836", padding: "0 0.5em" }}
          >
            {t("onboarding#its_done")}
          </Typography>
          <Typography
            variant="h4"
            gutterBottom
            style={{ padding: "0 0.5em", marginTop: "30px" }}
            dangerouslySetInnerHTML={{
              __html: t("onboarding#your_turn_notification")
            }}
          />

          <div className={classes.store}>
            <img
              src={StoreMobile}
              alt="mobile hand sms"
              width="100%"
              height="100%"
            />
          </div>
          <div className={classes.person}>
            <img
              src={Person}
              alt="mobile hand sms"
              width="100%"
              height="100%"
            />
          </div>
        </Grid>
      </Grid>
    </OnBoardingLayoutMobile>
  );
};

export default OnboardingMobile;
