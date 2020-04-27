import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { ReactComponent as LogoMini } from "../../../assets/logo-mini.svg";

import bgMainMobile from "../../../assets/bg/user_onboard_main.svg";

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

const OnBoardingLayout = ({ children, endOnBoarding }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <Box
      className={`${classes.container} OnboardingWrapper`}
      style={{ backgroundImage: `url(${bgMainMobile})` }}
    >
      <Grid container>
        <Grid container direction="column" style={{ height: "56px" }}>
          <Toolbar className={classes.toolbar}>
            {activeStep !== 0 && <LogoMini style={{ flex: 1 }} />}
          </Toolbar>
        </Grid>
        {children[activeStep]}
        <Grid
          container
          style={{ position: "absolute", bottom: 0, height: "128px" }}
        >
          <Grid
            container
            direction="column"
            alignContent="flex-end"
            alignItems="flex-end"
            style={{
              marginRight: "1.5em",
              marginBottom: ".5em",
              visibility:
                activeStep === children.length - 1 ? "hidden" : "visible"
            }}
          >
            <Button onClick={endOnBoarding}>
              <b>Saltar</b>
            </Button>
          </Grid>
          <Grid item style={{ width: "100%" }}>
            <MobileStepper
              variant="dots"
              steps={children.length}
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
                  style={{
                    visibility:
                      activeStep === children.length - 1 ? "hidden" : "visible"
                  }}
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

export default OnBoardingLayout;
