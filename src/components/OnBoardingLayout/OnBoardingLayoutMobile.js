import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { ReactComponent as LogoMini } from "../../assets/logo-mini.svg";

import TitleComponent from "../TitleComponent";

const useStyles = makeStyles({
  container: {
    position: "relative",
    minWidth: "375px",
    height: "100%",
    padding: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0px"
  },
  toolbar: {
    position: "static",
    top: 0
  },
  menuIcon: {
    fontSize: "2.24em",
    color: "rgba(0, 0, 0, .54)"
  },
  stepper: {
    flexGrow: 1,
    position: "static",
    backgroundColor: "#FFC836",
    height: "80px"
  },
  stepperDot: {
    backgroundColor: "#4C0788",
    opacity: "0.33"
  },
  stepperDotActive: {
    opacity: "1"
  },
  stepperArrows: {
    color: "#4C0788"
  }
});

const OnBoardingLayoutMobile = ({ children, bg, endOnBoarding }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const bgUrl = bg[activeStep] ? bg[activeStep] : bg[bg.length - 1];
  const skipTestColor = ["#4C0788", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#A0A0A0"];

  const handleNext = () => {
    if (activeStep !== children.length - 1) {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
      return;
    }
    endOnBoarding();
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleLogoOnClick = e => {
    window.location.href = "/";
  };

  return (
    <Box
      className={`${classes.container} OnboardingWrapper`}
      style={{ backgroundImage: `url(${bgUrl})`, overflowX: "hidden" }}
    >
      <TitleComponent title="Como funciona" pageId="tutorial" />
      <Grid container>
        <Grid container direction="column">
          <Toolbar className={classes.toolbar}>
            {activeStep !== 0 && (
              <LogoMini style={{ flex: 1 }} onClick={handleLogoOnClick} />
            )}
          </Toolbar>
        </Grid>
        {children[activeStep]}
        <Grid container style={{ position: "absolute", bottom: 0 }}>
          <Grid
            container
            direction="column"
            alignContent="flex-end"
            alignItems="flex-end"
            style={{
              marginRight: "1.5em",
              marginBottom: ".5em"
            }}
          >
            <Button
              onClick={endOnBoarding}
              style={{ color: skipTestColor[activeStep] }}
            >
              <b>Saltar</b>
            </Button>
          </Grid>
          <Grid item style={{ width: "100%" }}>
            <MobileStepper
              variant="dots"
              steps={5}
              activeStep={activeStep}
              classes={{
                root: classes.stepper,
                dot: classes.stepperDot,
                dotActive: classes.stepperDotActive
              }}
              backButton={
                <Button
                  size="small"
                  classes={{ label: classes.stepperArrows }}
                  onClick={handleBack}
                  disabled={activeStep === 0}
                  style={{
                    visibility: activeStep === 0 ? "hidden" : "visible"
                  }}
                >
                  <ArrowBackIcon />
                </Button>
              }
              nextButton={
                <Button
                  size="small"
                  classes={{ label: classes.stepperArrows }}
                  onClick={handleNext}
                >
                  <ArrowForwardIcon />
                </Button>
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OnBoardingLayoutMobile;
