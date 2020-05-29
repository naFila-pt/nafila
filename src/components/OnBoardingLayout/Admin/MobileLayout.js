import React, { useState } from "react";

import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { ReactComponent as LogoMini } from "../../../assets/logo-mini.svg";
import StyledButton from "../../../components/Button";

import bgMainMobile from "../../../assets/bg/user_onboard_main.svg";
import storeIcon from "../../../assets/icons/store-icon.svg";
import siteIcon from "../../../assets/icons/site_icon.svg";
import chamadaIcon from "../../../assets/icons/icon_chamada_mobile.svg";
import smsIcon from "../../../assets/icons/icon_sms_mobile.svg";
import howToUseIcon from "../../../assets/icons/ilustração_utilização_mobile.svg";
import yellowLogo from "../../../assets/icons/logo_amarelo_naFila.svg";
import logoSrc from "../../../assets/logo.svg";
import leftPerson from "../../../assets/icons/human-onboarding-left.svg";
import rightPerson from "../../../assets/icons/human-onboarding-right.svg";

import TitleComponent from "../../TitleComponent";

const useStyles = makeStyles({
  stepper: {
    flexGrow: 1,
    position: "static",
    backgroundColor: "#FFC836",
    height: "100%"
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

const Container = styled(Box)`
  position: relative;
  height: 100vh;
  padding: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0px;
`;

const FirstPage = styled(Grid)`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;

  .logo-label {
    margin: 0;
    font-size: 5vw;
  }

  .body {
    text-align: center;
    margin-top: 20px;
    & h1 {
      margin: 0;
    }
    & p {
      margin: 0;
      font-size: 6vw;
    }
    & div {
      font-size: 6vw;
      padding: 0 35px;
    }
  }
`;

const ToolbarWrapper = styled(Toolbar)`
  position: static;
  top: 0;
`;

const GridArea = styled(Grid)`
  height: 80%;
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  margin-top: 10px;

  & .row {
    display: flex;
    width: 100%;
    margin: 5px 0;
    & .column {
      width: 50%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }
`;

const BigText = styled.p`
  justify-self: center;
  font-weight: bold;
  font-size: 7vw;
  align-self: center;
  margin: 5px 0;
`;

const TextDesc = styled.p`
  justify-self: center;
  font-weight: bold;
  font-size: 20px;
  margin: 5px 0 0 0;
`;

const TicketContainer = styled.div`
  width: 100%;
  height: 100%;
  & .code {
    margin: 0 0 5px 0;
  }
  & .store {
    margin: 5px 0 10px 0;
    font-weight: bold;
    font-size: 35px;
  }

  & .name {
    width: 100%;
    font-size: 6vw;
    font-weight: bold;
    text-align: center;
  }

  & .nextInQueue {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
    font-size: 6vw;
    & span {
      margin-right: 20px;
    }
  }

  & .ticket {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    align-items: center;
    & .remaining-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 25%;
      & .remaining-text {
        font-size: 5vw;
        font-weight: bold;
        margin: 0;
      }
    }
    & .counter {
      display: flex;
      width: 25%;
      height: 80%;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      & p {
        margin: 0;
        font-size: 20px;
        font-weight: bold;
      }
      & .roundButton {
        text-align: center;
        vertical-align: middle;
        background-color: #ffc836;
        color: #4c0788;
        border-radius: 50%;
        width: 60px;
        height: 60px;
        line-height: 1.5;
        font-size: 35px;
        font-weight: bold;
      }
    }
  }
`;

const MainContentMobile = props => (
  <Grid
    style={{
      flex: 1,
      display: "flex",
      flexDirection: "column"
    }}
  >
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%"
      }}
    >
      <Grid item style={{ width: "100%" }}>
        {props.title && (
          <Typography
            variant="h3"
            style={{
              fontSize: "20px",
              marginBottom: "10px",
              textAlign: "center"
            }}
          >
            {props.t(props.title)}
          </Typography>
        )}
        {props.text && (
          <Typography
            variant="h2"
            style={{
              fontSize: "6vw",
              wordWrap: "break-word",
              textAlign: "center"
            }}
            dangerouslySetInnerHTML={{ __html: props.t(props.text) }}
          />
        )}
      </Grid>
    </Grid>
    {props.rightColumn}
  </Grid>
);

const Layout = ({ children, endOnBoarding }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const getBackButton = () => (
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
  );

  const getNextButton = () => (
    <Button
      size="small"
      classes={{ label: classes.stepperArrows }}
      onClick={handleNext}
      style={{
        visibility: activeStep === children.length - 1 ? "hidden" : "visible"
      }}
    >
      <ArrowForwardIcon />
    </Button>
  );

  return (
    <Container
      className={"OnboardingWrapper"}
      style={{ backgroundImage: `url(${bgMainMobile})` }}
    >
      <TitleComponent
        title="Lojista - Como funciona"
        pageId="operator_tutorial"
      />
      <Grid direction="column" style={{ height: "100vh", display: "flex" }}>
        <Grid container direction="column" style={{ height: "56px" }}>
          <ToolbarWrapper>
            <LogoMini style={{ flex: 1 }} />
          </ToolbarWrapper>
        </Grid>
        {children[activeStep]}
        <Grid container style={{ height: "100px" }}>
          <Grid
            container
            direction="column"
            alignContent="flex-end"
            alignItems="flex-end"
            style={{
              height: "30%",
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
          <Grid item style={{ width: "100%", height: "70%" }}>
            <MobileStepper
              variant="dots"
              steps={children.length}
              activeStep={activeStep}
              classes={{
                root: classes.stepper,
                dot: classes.stepperDot,
                dotActive: classes.stepperDotActive
              }}
              backButton={getBackButton()}
              nextButton={getNextButton()}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

const OnBoardingLayout = props => {
  const { t, endOnBoarding } = props;
  return (
    <Layout endOnBoarding={endOnBoarding}>
      <MainContentMobile
        t={t}
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              marginTop: "10px"
            }}
          >
            <FirstPage>
              <div style={{ position: "absolute", left: 0, bottom: 0 }}>
                <img src={leftPerson} alt="person" />
              </div>
              <div style={{ position: "absolute", right: 0, bottom: 0 }}>
                <img src={rightPerson} alt="person" />
              </div>
              <img src={logoSrc} height="50%" alt="naFilaLogo" />
              <div style={{ width: "100%", textAlign: "center" }}>
                <p
                  className="logo-label"
                  dangerouslySetInnerHTML={{
                    __html: t("onboarding#intro_pitch")
                  }}
                />
              </div>
              <div
                className="body"
                dangerouslySetInnerHTML={{
                  __html: t("admin#onboarding_firstText_mobile")
                }}
              />
            </FirstPage>
          </Grid>
        }
      />
      <MainContentMobile
        t={t}
        title="admin#onboarding_secondTitle"
        text="admin#onboarding_secondText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              width: "100%",
              height: "60%",
              marginTop: "10px"
            }}
          >
            <img src={storeIcon} alt="asset" width="100%" height="100%" />
          </Grid>
        }
      />
      <MainContentMobile
        t={t}
        title="admin#onboarding_thirdTitle"
        text="admin#onboarding_thirdText"
        rightColumn={
          <GridArea>
            <BigText>{t("admin#onboarding_autonomous")}</BigText>
            <div className="row">
              <div className="column">
                <img src={smsIcon} alt="smsIcon" height="70%" />
                <TextDesc>{t("admin#onboarding_sms")}</TextDesc>
              </div>
              <div className="column">
                <img src={siteIcon} alt="siteIcon" height="70%" />
                <TextDesc>{t("admin#onboarding_site")}</TextDesc>
              </div>
            </div>
            <BigText>{t("admin#onboarding_shopkeeper")}</BigText>
            <div className="row">
              <div className="column">
                <img src={chamadaIcon} alt="chamada" height="70%" />
                <TextDesc>{t("admin#onboarding_call")}</TextDesc>
              </div>
              <div className="column">
                <img src={smsIcon} alt="smsIcon" height="70%" />
                <TextDesc>{t("admin#onboarding_phone")}</TextDesc>
              </div>
            </div>
          </GridArea>
        }
      />
      <MainContentMobile
        t={t}
        title="admin#onboarding_fourthTitle"
        text="admin#onboarding_fourthText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              width: "100%",
              height: "60%",
              marginTop: "10px"
            }}
          >
            <TicketContainer style={{ width: "100%", height: "100%" }}>
              <div className="ticket" style={{ height: "100%" }}>
                <div className="remaining-container">
                  <p className="remaining-text">
                    {t("admin#onboarding_remaining")}
                  </p>
                  <p
                    className="remaining-text"
                    style={{
                      fontSize: "30px"
                    }}
                  >
                    10
                  </p>
                </div>
                <img src={yellowLogo} alt="asset" height="80%" />
                <div className="counter">
                  <div class="roundButton">{"-"}</div>
                  <p>10</p>
                  <div class="roundButton">{"+"}</div>
                </div>
              </div>
              <div className="name">{"Ana Maria"}</div>
              <div className="nextInQueue">
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("admin#queueManagement_nextInQueue")
                  }}
                />
                <ArrowForwardIcon fontSize="small" />
              </div>
            </TicketContainer>
          </Grid>
        }
      />
      <MainContentMobile
        t={t}
        title="admin#onboarding_fifthTitle"
        text="admin#onboarding_fifthText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              width: "100%",
              height: "80%",
              marginTop: "10px"
            }}
          >
            <img src={howToUseIcon} alt="asset" width="100%" height="100%" />
          </Grid>
        }
      />
      <MainContentMobile
        t={t}
        title="admin#onboarding_sixthTitle"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              width: "100%",
              height: "100%"
            }}
          >
            <img src={storeIcon} alt="asset" width="100%" height="60%" />
            <Typography
              variant="h2"
              style={{
                fontSize: "6vw",
                wordWrap: "break-word",
                textAlign: "center",
                margin: "10px"
              }}
              dangerouslySetInnerHTML={{
                __html: t("admin#onboarding_sixthText")
              }}
            />
            <div style={{ width: "100%", textAlign: "center" }}>
              <StyledButton
                forward
                onClick={endOnBoarding}
                dangerouslySetInnerHTML={{
                  __html: t("admin#register")
                }}
                style={{ textAlign: "center" }}
              />
            </div>
          </Grid>
        }
      />
    </Layout>
  );
};

export default OnBoardingLayout;
