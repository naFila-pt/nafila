import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { ReactComponent as PosterCode } from "../../assets/icons/QR_Code.svg";
import MobileHand from "../../assets/icons/Group_636.svg";
import MobileHandSMS from "../../assets/icons/mobileHandSms.svg";

import { ReactComponent as Person } from "../../assets/icons/pessoa_homepage_desktop.svg";
import { ReactComponent as StoreMobile } from "../../assets/icons/store_mobile.svg";
import { ReactComponent as Store } from "../../assets/images/ilust_loja.svg";
import { StepperContent } from "./";
import { Grid } from "@material-ui/core";
import { OnBoardingLayoutDesktop } from "../../components/OnBoardingLayout";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import * as Routes from "../../constants/RoutesConstants";

const useStyles = makeStyles(theme => ({
  containerDesktop: {
    display: "flex",
    flex: 1,
    height: "100%",
    justifyItems: "center",
    padding: "35px"
  }
}));

const endOnBoarding = () => {
  try {
    localStorage.setItem("skipOnBoarding", true);
  } catch (error) {}
  window.location.href = Routes.ROOT_PATH;
};

const PhoneNumber = () => {
  const [t] = useTranslation();
  return (
    <Grid item style={{ textAlign: "center" }}>
      <Typography
        variant="h3"
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
    </Grid>
  );
};

const getSteppers = () => {
  return (
    <>
      <StepperContent
        titleLabel="onboarding#store_title"
        descriptionLabel="onboarding#store_description"
      >
        <Grid
          item
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Store />
        </Grid>
      </StepperContent>

      <StepperContent
        titleLabel="onboarding#one_sms"
        descriptionLabel="onboarding#register_nafila"
        infoLabel="onboarding#difficulties"
      >
        <Grid
          item
          style={{
            display: "flex",
            maxWidth: "50%",
            position: "absolute",
            bottom: "-50px",
            left: "55%"
          }}
        >
          <PosterCode style={{ width: "280px" }} />
          <img
            src={MobileHand}
            width="320px"
            height="80%"
            alt="mobileHand"
            style={{ marginTop: "150px" }}
          />
        </Grid>
      </StepperContent>

      <StepperContent
        titleLabel="onboarding#prefer_register_site"
        descriptionLabel="onboarding#insertCodeEmail"
        extraContent={<PhoneNumber />}
      >
        <Grid
          item
          style={{
            display: "flex",
            maxWidth: "50%",
            position: "absolute",
            bottom: "-50px",
            left: "55%"
          }}
        >
          <PosterCode style={{ width: "280px" }} />
          <img
            src={MobileHandSMS}
            width="320px"
            height="80%"
            alt="mobileHand"
            style={{ marginTop: "150px" }}
          />
        </Grid>
      </StepperContent>

      <StepperContent
        titleLabel="onboarding#its_done"
        descriptionLabel="onboarding#your_turn_notification"
      >
        <Grid
          item
          style={{
            display: "flex",
            width: "50%",
            position: "absolute",
            bottom: 0,
            left: "50%",
            top: 0
          }}
        >
          <Person
            style={{
              position: "absolute",
              bottom: 0,
              zIndex: 1
            }}
          />
          <StoreMobile
            style={{
              position: "absolute",
              left: "25%",
              transform: "scale(1.8)"
            }}
          />
        </Grid>
      </StepperContent>
    </>
  );
};

const OnBoardingDesktop = () => {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const steppers = getSteppers();

  const handleNext = () => {
    if (activeStep === steppers.props.children.length - 1) {
      endOnBoarding();
    } else {
      setActiveStep(prevState => prevState + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevState => prevState - 1);
  };

  return (
    <OnBoardingLayoutDesktop>
      <Grid
        container
        alignItems="center"
        direction="column"
        style={{ flex: 1 }}
      >
        <Grid
          container
          className={classes.containerDesktop}
          alignItems="center"
          justify="space-between"
        >
          <Grid item style={{ flex: "10%", zIndex: 1 }}>
            <ArrowBack
              fontSize="large"
              style={{
                cursor: "pointer",
                visibility: activeStep === 0 ? "hidden" : "visible"
              }}
              onClick={handleBack}
            />
          </Grid>
          {steppers.props.children[activeStep]}

          <Grid item style={{ flex: "10%", textAlign: "end", zIndex: 1 }}>
            <ArrowForward
              fontSize="large"
              style={{ cursor: "pointer" }}
              onClick={handleNext}
            />
          </Grid>
        </Grid>
        <Grid item style={{ zIndex: 1 }}>
          {React.Children.map(steppers.props.children, (stepper, index) => (
            <FiberManualRecordIcon
              key={index}
              style={{
                fontSize: "16px",
                cursor: "pointer",
                opacity: activeStep === index ? "1" : "0.33"
              }}
            />
          ))}
        </Grid>
      </Grid>
    </OnBoardingLayoutDesktop>
  );
};

export default OnBoardingDesktop;
