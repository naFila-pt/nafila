import React, { useState } from "react";

import styled from "styled-components";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import bgMain from "../../../assets/bg/home_desktop.svg";

import Footer from "../../../components/Footer";
import StyledButton from "../../../components/Button";
import logoSrc from "../../../assets/logo.svg";
import storeIcon from "../../../assets/icons/store-icon.svg";
import siteIcon from "../../../assets/icons/site_icon.svg";
import chamadaIcon from "../../../assets/icons/icon_chamada_mobile.svg";
import smsIcon from "../../../assets/icons/icon_sms_mobile.svg";
import howToUseIcon from "../../../assets/icons/ilustração_utilização_mobile.svg";
import yellowLogo from "../../../assets/icons/logo_amarelo_naFila.svg";

import { ReactComponent as LogoMini } from "../../../assets/logo-mini.svg";

const useStyles = makeStyles({
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

const Container = styled(Box)`
  position: relative;
  height: 100%;
  padding: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0px;
`;

const ToolbarWrapper = styled(Toolbar)`
  position: static;
  top: 0;
`;

const GridArea = styled(Grid)`
  height: 90%;
  width: 70%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 15% 25% 5% 15% 25% 5%;
  grid-row-gap: 5px;
  grid-template-areas:
    "text1 text1"
    "sms1 mail"
    "sms1Desc mailDesc"
    "text2 text2"
    "chamada sms2"
    "chamadaDesc sms2Desc";
  & img {
    align-self: center;
  }
  & p {
    margin: 0;
  }
`;

const BigText = styled.p`
  justify-self: center;
  font-weight: bold;
  font-size: 30px;
  align-self: center;
`;

const SiteIcon = styled.img`
  grid-area: mail;
  justify-self: center;
`;

const SmsIcon = styled.img`
  grid-area: sms1;
  justify-self: center;
`;

const CallIcon = styled.img`
  grid-area: chamada;
  justify-self: center;
`;

const TextDesc = styled.p`
  justify-self: center;
  font-weight: bold;
  font-size: 20px;
`;

const TicketContainer = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }

  & .nextInQueue {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 10px;
    font-size: 20px;
    & span {
      margin-right: 20px;
    }
  }

  & .ticket {
    display: flex;
    width: 100%;
    height: 80%;
    justify-content: center;
    align-items: center;
    & .remaining-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 25%;
      & .remaining-text {
        font-size: 20px;
        font-weight: bold;
        margin: 0;
      }
    }
    & .counter {
      display: flex;
      width: 25%;
      height: 70%;
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

const MainContentDesktop = props => (
  <Grid
    container
    style={{
      display: "flex",
      flex: 1
    }}
  >
    <Grid
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
        marginRight: "20px"
      }}
    >
      <Grid item style={{ display: "flex", alignItems: "center" }}>
        <img src={logoSrc} alt="log" width="120" height="160" />
        <Grid style={{ marginBottom: "1em" }}>
          <Typography
            variant="h1"
            style={{ fontWeight: "normal" }}
            dangerouslySetInnerHTML={{
              __html: props.t("onboarding#intro_pitch")
            }}
          ></Typography>
          <span
            style={{ fontSize: "24px", fontWeight: "bold" }}
            dangerouslySetInnerHTML={{
              __html: props.t("home#intro_welcome")
            }}
          />
        </Grid>
      </Grid>
      <Grid item style={{ width: "100%" }}>
        <Typography
          variant="h3"
          style={{ fontSize: "25px", color: "#FFC836", marginBottom: "10px" }}
        >
          {props.t(props.title)}
        </Typography>
        <Typography
          variant="h2"
          style={{ fontSize: "25px", wordWrap: "break-word" }}
          dangerouslySetInnerHTML={{ __html: props.t(props.text) }}
        />
      </Grid>
      {props.isLastPage && (
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "flex-end"
          }}
        >
          <StyledButton
            forward
            href="https://geralnafilapt.typeform.com/to/VtDUdM"
            target="_blank"
            dangerouslySetInnerHTML={{
              __html: props.t("admin#register")
            }}
            style={{ textAlign: "center" }}
          />
        </div>
      )}
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

  const getNextButton = () => (
    <div>
      <Button
        onClick={endOnBoarding}
        style={{
          visibility: activeStep === children.length - 1 ? "hidden" : "visible"
        }}
      >
        <b>Saltar</b>
      </Button>
    </div>
  );

  return (
    <Container
      className={"OnboardingWrapper"}
      style={{ backgroundImage: `url(${bgMain})`, height: "100vh" }}
    >
      <Grid container direction="column" style={{ height: "100%" }}>
        <Grid container direction="column" style={{ height: "70px" }}>
          <ToolbarWrapper>
            <LogoMini style={{ flex: 1 }} />
          </ToolbarWrapper>
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
              nextButton={getNextButton()}
            />
          </Grid>
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
};

const OnBoardingLayout = props => {
  const { t, endOnBoarding } = props;
  return (
    <Layout endOnBoarding={endOnBoarding}>
      <MainContentDesktop
        t={t}
        title=""
        text="admin#onboarding_firstText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginLeft: "20px"
            }}
          >
            <img src={storeIcon} alt="asset" height="70%" />
          </Grid>
        }
      />
      <MainContentDesktop
        t={t}
        title="admin#onboarding_secondTitle"
        text="admin#onboarding_secondText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginLeft: "20px"
            }}
          >
            <img src={storeIcon} alt="asset" height="70%" />
          </Grid>
        }
      />
      <MainContentDesktop
        t={t}
        title="admin#onboarding_thirdTitle"
        text="admin#onboarding_thirdText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginLeft: "20px"
            }}
          >
            <GridArea>
              <BigText style={{ gridArea: "text1" }}>
                {t("admin#onboarding_autonomous")}
              </BigText>
              <SmsIcon src={smsIcon} alt="smsIcon" />
              <SiteIcon src={siteIcon} alt="iconEmail" />
              <TextDesc style={{ gridArea: "sms1Desc" }}>
                {t("admin#onboarding_sms")}
              </TextDesc>
              <TextDesc style={{ gridArea: "mailDesc" }}>
                {t("admin#onboarding_site")}
              </TextDesc>
              <BigText style={{ gridArea: "text2" }}>
                {t("admin#onboarding_shopkeeper")}
              </BigText>
              <CallIcon src={chamadaIcon} alt="chamada" />
              <SmsIcon
                src={smsIcon}
                alt="smsIcon"
                style={{ gridArea: "sms2" }}
              />
              <TextDesc style={{ gridArea: "chamadaDesc" }}>
                {t("admin#onboarding_call")}
              </TextDesc>
              <TextDesc style={{ gridArea: "sms2Desc" }}>
                {t("admin#onboarding_phone")}
              </TextDesc>
            </GridArea>
          </Grid>
        }
      />
      <MainContentDesktop
        t={t}
        title="admin#onboarding_fourthTitle"
        text="admin#onboarding_fourthText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginLeft: "20px"
            }}
          >
            <TicketContainer style={{ width: "70%", height: "90%" }}>
              <p className="code">{t("admin#onboarding_code")}</p>
              <p className="store">LojaCartaxo</p>
              <div className="ticket">
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
                <img src={yellowLogo} alt="asset" height="70%" />
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
      <MainContentDesktop
        t={t}
        title="admin#onboarding_fifthTitle"
        text="admin#onboarding_fifthText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginLeft: "20px"
            }}
          >
            <img src={howToUseIcon} alt="asset" height="90%" />
          </Grid>
        }
      />
      <MainContentDesktop
        t={t}
        isLastPage
        title="admin#onboarding_sixthTitle"
        text="admin#onboarding_sixthText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginLeft: "20px"
            }}
          >
            <img src={storeIcon} alt="asset" height="70%" />
          </Grid>
        }
      />
    </Layout>
  );
};

export default OnBoardingLayout;
