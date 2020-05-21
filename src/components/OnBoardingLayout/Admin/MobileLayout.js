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
import emailIcon from "../../../assets/icons/email_notification.svg";
import chamadaIcon from "../../../assets/icons/icon_chamada_mobile.svg";
import smsIcon from "../../../assets/icons/icon_sms_mobile.svg";
import howToUseIcon from "../../../assets/icons/ilustração_utilização_mobile.svg";
import yellowLogo from "../../../assets/icons/logo_amarelo_naFila.svg";

import TitleComponent from "../../TitleComponent";

const useStyles = makeStyles({
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
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
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

  & .ticket {
    display: flex;
    height: 100%;
    justify-content: center;
    & div {
      display: flex;
      flex-direction: column;
      margin-left: 30px;
      justify-content: center;
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

const MainContentMobile = props => (
  <Grid
    style={{
      height: "calc(100vh - 184px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "10px",
      marginTop: "10px"
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
        <Typography
          variant="h3"
          style={{
            fontSize: "25px",
            color: "#FFC836",
            marginBottom: "10px",
            textAlign: "center"
          }}
        >
          {props.t(props.title)}
        </Typography>
        <Typography
          variant="h2"
          style={{
            fontSize: "25px",
            wordWrap: "break-word",
            textAlign: "center"
          }}
          dangerouslySetInnerHTML={{ __html: props.t(props.text) }}
        />
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
      <TitleComponent title="Lojista - Como funciona" />
      <Grid container>
        <Grid container direction="column" style={{ height: "56px" }}>
          <ToolbarWrapper>
            <LogoMini style={{ flex: 1 }} />
          </ToolbarWrapper>
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
        text="admin#onboarding_firstText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
              padding: "20px",
              width: "100%"
            }}
          >
            <img src={storeIcon} alt="asset" width="100%" />
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
              alignItems: "end",
              justifyContent: "center",
              width: "100%",
              padding: "20px"
            }}
          >
            <img src={storeIcon} alt="asset" width="100%" />
          </Grid>
        }
      />
      <MainContentMobile
        t={t}
        title="admin#onboarding_thirdTitle"
        text="admin#onboarding_thirdText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
              width: "center"
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
      <MainContentMobile
        t={t}
        title="admin#onboarding_fourthTitle"
        text="admin#onboarding_fourthText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "center",
              width: "center",
              padding: "20px"
            }}
          >
            <TicketContainer style={{ width: "100%", height: "100%" }}>
              <div className="ticket" style={{ height: "100%" }}>
                <img src={yellowLogo} alt="asset" height="100%" />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "30px",
                    justifyContent: "center"
                  }}
                >
                  <p className="remaining">{t("admin#onboarding_remaining")}</p>
                  <p
                    className="remaining"
                    style={{
                      fontSize: "30px"
                    }}
                  >
                    10
                  </p>
                </div>
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
              alignItems: "end",
              justifyContent: "center",
              width: "100%",
              padding: "20px"
            }}
          >
            <img src={howToUseIcon} alt="asset" width="100%" />
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
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <img
              src={storeIcon}
              alt="asset"
              width="100%"
              style={{ margin: "5px" }}
            />
            <Typography
              variant="h2"
              style={{
                fontSize: "25px",
                wordWrap: "break-word",
                textAlign: "center",
                margin: "10px"
              }}
              dangerouslySetInnerHTML={{
                __html: t("admin#onboarding_sixthText")
              }}
            />
            <StyledButton
              onClick={endOnBoarding}
              dangerouslySetInnerHTML={{
                __html: t("admin#register")
              }}
              style={{ textAlign: "center" }}
            />
          </Grid>
        }
      />
    </Layout>
  );
};

export default OnBoardingLayout;
