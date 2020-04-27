import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import bgMain from "../../../assets/bg/home_desktop.svg";

import Footer from "../../../components/Footer";

import { ReactComponent as LogoMini } from "../../../assets/logo-mini.svg";

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
    backgroundColor: "#00000000",
    height: "60px"
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
  },
  arrowContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "7%"
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
      style={{ backgroundImage: `url(${bgMain})`, height: "100vh" }}
    >
      <Grid container direction="column" style={{ height: "100%" }}>
        <Grid container direction="column" style={{ height: "70px" }}>
          <Toolbar className={classes.toolbar}>
            <LogoMini
              style={{ flex: 1, opacity: `${activeStep !== 0 ? "1" : "0"}` }}
            />
          </Toolbar>
        </Grid>
        <Grid container direction="column" style={{ flex: 1 }}>
          <Grid container style={{ height: "100%" }}>
            <Grid className={classes.arrowContainer}>
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
            </Grid>
            {children[activeStep]}
            <Grid className={classes.arrowContainer}>
              <Button
                size="small"
                classes={{ label: classes.stepperArrows }}
                onClick={handleNext}
                disabled={activeStep === children.length - 1}
                style={{
                  visibility:
                    activeStep === children.length - 1 ? "hidden" : "visible"
                }}
              >
                <ArrowForwardIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
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
          ></Grid>
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
              backButton={<div />}
              nextButton={
                <div>
                  <Button
                    onClick={endOnBoarding}
                    style={{
                      visibility:
                        activeStep === children.length - 1
                          ? "hidden"
                          : "visible"
                    }}
                  >
                    <b>Saltar</b>
                  </Button>
                </div>
              }
            />
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    </Box>
  );
};

export default OnBoardingLayout;
