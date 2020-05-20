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
import emailIcon from "../../../assets/icons/email_notification.svg";
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
    "mail sms1"
    "mailDesc sms1Desc"
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

const EmailIcon = styled.img`
  grid-area: mail;
  justify-self: center;
  height: 60%;
`;

const SmsIcon = styled.img`
  grid-area: sms1;
  justify-self: center;
  height: 90%;
`;

const CallIcon = styled.img`
  grid-area: chamada;
  justify-self: center;
  height: 90%;
`;

const TextDesc = styled.p`
  justify-self: center;
  font-weight: bold;
  font-size: 20px;
`;

const TicketContainer = styled.div`
  width: 60%;
  height: 90%;
  & .code {
    margin: 0 0 5px 0;
  }
  & .store {
    margin: 5px 0 10px 0;
    font-weight: bold;
    font-size: 35px;
  }

  & .ticket {
    display: flex;
    height: 70%;
    & div {
      & .remaining {
        font-size: 20px;
        font-weight: bold;
        margin: 0;
      }

      & .name {
        font-size: 25px;
        font-weight: bold;
        margin: 70% 0 0 0;
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
              <EmailIcon src={emailIcon} alt="iconEmail" />
              <SmsIcon src={smsIcon} alt="smsIcon" />
              <TextDesc style={{ gridArea: "mailDesc" }}>
                {t("admin#onboarding_email")}
              </TextDesc>
              <TextDesc style={{ gridArea: "sms1Desc" }}>
                {t("admin#onboarding_sms")}
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
            <TicketContainer>
              <p className="code">{t("admin#onboarding_code")}</p>
              <p className="store">LojaCartaxo</p>
              <div className="ticket">
                <img src={yellowLogo} alt="asset" height="100%" />
                <div style={{ marginLeft: "30px" }}>
                  <p className="remaining">{t("admin#onboarding_remaining")}</p>
                  <p
                    className="remaining"
                    style={{
                      fontSize: "30px"
                    }}
                  >
                    10
                  </p>
                  <p className="name">Ana Maria</p>
                </div>
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
