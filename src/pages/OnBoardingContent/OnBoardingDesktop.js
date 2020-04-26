import React, { useState } from "react";
import { ReactComponent as EmailIcon } from "../../assets/icons/icon_email.svg";
import { ReactComponent as PhoneIcon } from "../../assets/icons/icon_tlm.svg";
import { ReactComponent as NameIcon } from "../../assets/icons/icon_nome.svg";
import { ReactComponent as PhoneHand } from "../../assets/icons/Group_636.svg";
import { ReactComponent as PosterCode } from "../../assets/icons/Group_666.svg";
import { ReactComponent as MobileHand } from "../../assets/icons/mobile_hand.svg";
import { ReactComponent as Logista } from "../../assets/icons/Logista.svg";
import { ReactComponent as Person } from "../../assets/icons/pessoa_homepage_desktop.svg";
import { ReactComponent as StoreMobile } from "../../assets/icons/store_mobile.svg";
import { ReactComponent as Store } from "../../assets/images/ilust_loja.svg";
import { StepperContent } from "./";
import { Grid } from "@material-ui/core";
import { OnBoardingLayoutDesktop } from "../../components/OnBoardingLayout";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from "@material-ui/core/styles";

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
  window.location.href = Routes.TICKET_PATH;
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
        titleLabel="onboarding#three_ways"
        descriptionLabel="onboarding#signup_ways"
      >
        <Grid item style={{ width: "50%" }}>
          <Grid container justify="space-evenly">
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <PhoneIcon fontSize="large" />
                <div
                  style={{
                    fontSize: "36px",
                    lineHeight: "43px",
                    fontWeight: "bold"
                  }}
                >
                  SMS
                </div>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" alignItems="center">
                <EmailIcon fontSize="large" />
                <div
                  style={{
                    fontSize: "36px",
                    lineHeight: "43px",
                    fontWeight: "bold"
                  }}
                >
                  Email
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            justify="center"
            direction="column"
            alignItems="center"
          >
            <NameIcon fontSize="large" />
            <div
              style={{
                fontSize: "36px",
                lineHeight: "43px",
                fontWeight: "bold"
              }}
            >
              Nome
            </div>
          </Grid>
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
            bottom: "-100px",
            left: "55%"
          }}
        >
          <PosterCode style={{ width: "280px" }} />
          <PhoneHand style={{ marginTop: "60px", width: "320px" }} />
        </Grid>
      </StepperContent>

      <StepperContent
        titleLabel="onboarding#prefer_email"
        descriptionLabel="onboarding#insertCodeEmail"
      >
        <Grid
          item
          style={{
            display: "flex",
            maxWidth: "50%",
            position: "absolute",
            bottom: "-100px",
            left: "55%"
          }}
        >
          <MobileHand style={{ height: "600px" }} />
        </Grid>
      </StepperContent>

      <StepperContent
        titleLabel="onboarding#prefer_name"
        descriptionLabel="onboarding#ask_colaborator_register"
        infoLabel="onboarding#name_register_extra_info"
      >
        <Grid
          item
          style={{
            display: "flex",
            maxWidth: "50%",
            position: "absolute",
            bottom: "40px",
            left: "55%"
          }}
        >
          <Logista
            style={{
              width: "320px",
              height: "auto",
              transform: "scale(1.3)"
            }}
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
    const nextStep = Math.min(
      activeStep + 1,
      React.Children.count(steppers.props.children) - 1
    );
    if (activeStep === nextStep) {
      endOnBoarding();
    } else {
      setActiveStep(nextStep);
    }
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
              style={{ cursor: "pointer" }}
              onClick={() => setActiveStep(Math.max(activeStep - 1, 1))}
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
