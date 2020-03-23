import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Toolbar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { ReactComponent as LogoMini } from "../../assets/logo-mini.svg";

const useStyles = makeStyles({
  container: {
    position: "relative",
    minWidth: "375px",
    height: "100vh",
    padding: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 100%"
  },
  toolbar: {
    position: "static",
    top: 0
  },
  menuIcon: {
    fontSize: "2.24em",
    color: "rgba(0, 0, 0, .54)"
  },
  gridContainer: {
    alignContent: "center"
  },
  gridItem: {
    textAlign: "center",
    marginTop: "-2.5em"
  },
  stepper: {
    flexGrow: 1,
    position: "static",
    backgroundColor: "#8464AC",
    height: "80px"
  },
  stepperDot: {
    backgroundColor: "#fff",
    opacity: "0.33"
  },
  stepperDotActive: {
    opacity: "1"
  },
  stepperArrows: {
    color: "#fff"
  },
});

const OnBoardingLayout = ({ children, bg, endOnBoarding }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <Container maxWidth="lg" className={classes.container} style={{ backgroundImage: `url(${ bg[activeStep] })`}}>
      <Grid container>
        <Grid container direction="column">
          <Toolbar className={classes.toolbar}>
            <MenuIcon className={classes.menuIcon} />
            { activeStep !== 0 && <LogoMini style={{ flex: 0.9 }} />}
          </Toolbar>
        </Grid>
        {children[activeStep]}
        <Grid container style={{ position: 'absolute', bottom: 0 }}>
          <Grid container direction="column" alignContent="flex-end" style={{ marginRight: '1.5em', marginBottom: '.5em', visibility: activeStep === 3 ? "hidden" : "visible" }}>
            <Button onClick={endOnBoarding} style={{ color: '#A0A0A0' }}><b>Saltar</b></Button>
          </Grid>
          <Grid item style={{ width: "100%" }}>
            <MobileStepper
              variant="dots"
              steps={4}
              activeStep={activeStep}
              classes={{ root: classes.stepper, dot: classes.stepperDot, dotActive: classes.stepperDotActive }}
              backButton={
                <Button size="small" classes={{ label: classes.stepperArrows }} onClick={handleBack} disabled={activeStep === 0} style={{ visibility: activeStep === 0 ? "hidden" : "visible" }}>
                  <ArrowBackIcon />
                </Button>
              }
              nextButton={
                <Button size="small" classes={{ label: classes.stepperArrows }} onClick={handleNext} disabled={activeStep === 5} style={{ visibility: activeStep === 3 ? "hidden" : "visible" }}>
                  <ArrowForwardIcon />
                </Button>
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OnBoardingLayout;