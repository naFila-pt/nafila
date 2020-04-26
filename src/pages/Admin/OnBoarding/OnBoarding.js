import React from "react";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "../../../components/Button";

import bgMainMobile from "../../../assets/bg/home_mobile.svg";
import bgMain from "../../../assets/bg/home_desktop.svg";
import logoSrc from "../../../assets/logo.svg";
import storeIcon from "../../../assets/icons/store-icon.svg";
import emailIcon from "../../../assets/icons/email_notification.svg";
import chamadaIcon from "../../../assets/icons/icon_chamada_mobile.svg";
import smsIcon from "../../../assets/icons/icon_sms_mobile.svg";
import howToUseIcon from "../../../assets/icons/ilustração_utilização_mobile.svg";
import yellowLogo from "../../../assets/icons/logo_amarelo_naFila.svg";

import OnBoardingLayout from "../../../components/OnBoardingLayout";

const GridArea = styled(Grid)`
  width: 60%;
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

const MainContent = props => (
  <Grid container style={{ display: "flex", flex: 1 }}>
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
            dangerouslySetInnerHTML={{ __html: props.t("home#intro_welcome") }}
          />
        </Grid>
      </Grid>
      <Grid item style={{ marginLeft: "10px" }}>
        <Typography
          variant="h3"
          style={{ fontSize: "25px", color: "#FFC836", marginBottom: "10px" }}
        >
          {props.t(props.title)}
        </Typography>
        <Typography
          variant="h2"
          style={{ fontSize: "25px" }}
          dangerouslySetInnerHTML={{ __html: props.t(props.text) }}
        />
      </Grid>
      {props.isLastPage && (
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "end"
          }}
        >
          <Button
            forward
            href="https://geralnafilapt.typeform.com/to/VtDUdM"
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

const OnBoarding = props => {
  const { t } = useTranslation();

  const endOnBoarding = () => {
    try {
      localStorage.setItem("skipOnBoarding", true);
    } catch (error) {}
  };

  return (
    <OnBoardingLayout
      bg={[bgMain, bgMain, bgMain, bgMain, bgMain, bgMain]}
      endOnBoarding={endOnBoarding}
      isDesktop={props.isDesktop}
    >
      <MainContent
        t={t}
        title=""
        text="admin#onboarding_firstText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flex: 1,
              alignItems: "end",
              justifyContent: "end",
              marginLeft: "20px"
            }}
          >
            <img src={storeIcon} alt="asset" height="70%" />
          </Grid>
        }
      />
      <MainContent
        t={t}
        title="admin#onboarding_secondTitle"
        text="admin#onboarding_secondText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flex: 1,
              alignItems: "end",
              justifyContent: "end",
              marginLeft: "20px"
            }}
          >
            <img src={storeIcon} alt="asset" height="70%" />
          </Grid>
        }
      />
      <MainContent
        t={t}
        title="admin#onboarding_thirdTitle"
        text="admin#onboarding_thirdText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flex: 1,
              alignItems: "end",
              justifyContent: "end",
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
      <MainContent
        t={t}
        title="admin#onboarding_fourthTitle"
        text="admin#onboarding_fourthText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              alignItems: "end",
              justifyContent: "end",
              marginLeft: "20px"
            }}
          >
            <div style={{ width: "60%", height: "90%" }}>
              <p style={{ margin: "0 0 5px 0" }}>
                {t("admin#onboarding_code")}
              </p>
              <p
                style={{
                  margin: "5px 0 10px 0",
                  fontWeight: "bold",
                  fontSize: "35px"
                }}
              >
                LojaCartaxo
              </p>
              <div style={{ display: "flex", height: "70%" }}>
                <img src={yellowLogo} alt="asset" height="100%" />
                <div style={{ marginLeft: "30px" }}>
                  <p
                    style={{ fontSize: "20px", fontWeight: "bold", margin: 0 }}
                  >
                    {t("admin#onboarding_remaining")}
                  </p>
                  <p
                    style={{ fontSize: "30px", fontWeight: "bold", margin: 0 }}
                  >
                    10
                  </p>
                  <p
                    style={{
                      fontSize: "25px",
                      fontWeight: "bold",
                      margin: "70% 0 0 0"
                    }}
                  >
                    Ana Maria
                  </p>
                </div>
              </div>
            </div>
          </Grid>
        }
      />
      <MainContent
        t={t}
        title="admin#onboarding_fifthTitle"
        text="admin#onboarding_fifthText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flex: 1,
              alignItems: "end",
              justifyContent: "end",
              marginLeft: "20px"
            }}
          >
            <img src={howToUseIcon} alt="asset" height="90%" />
          </Grid>
        }
      />
      <MainContent
        t={t}
        isLastPage
        title="admin#onboarding_sixthTitle"
        text="admin#onboarding_sixthText"
        rightColumn={
          <Grid
            style={{
              display: "flex",
              flex: 1,
              alignItems: "end",
              justifyContent: "end",
              marginLeft: "20px"
            }}
          >
            <img src={storeIcon} alt="asset" height="70%" />
          </Grid>
        }
      />
    </OnBoardingLayout>
  );
};

export default OnBoarding;
