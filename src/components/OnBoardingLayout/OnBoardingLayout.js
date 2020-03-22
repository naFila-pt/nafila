import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Toolbar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

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
    top: 0,
    color: "#522F88",
    fontSize: "1.5em",
    textAlign: "center"
  },
  menuIcon: {
    fontSize: "1.8em",
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
  const { t } = useTranslation();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <Container maxWidth="lg" className={classes.container} style={{ backgroundImage: `url(${ bg[activeStep] })`}}>
      <Toolbar className={classes.toolbar}>
        <MenuIcon className={classes.menuIcon} />
        <p style={{ flex: "0.9", visibility: activeStep === 0 ? "hidden" : "visible" }} dangerouslySetInnerHTML={{ __html: t('appTitle') }} />
      </Toolbar>
      {children[activeStep]}
      <Grid container style={{ position: 'absolute', bottom: 0 }}>
        <Grid item direction="column" style={{ flex: 1, textAlign: 'right', marginRight: '1em', visibility: activeStep === 3 ? "hidden" : "visible" }}>
          <Button onClick={endOnBoarding}>Saltar</Button>
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
    </Container>
  );
}

export default OnBoardingLayout;