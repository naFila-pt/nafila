import React from "react";

import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "../../../components/Button";

import logoSrc from "../../../assets/logo.svg";
import storeIcon from "../../../assets/icons/store-icon.svg";
import emailIcon from "../../../assets/icons/email_notification.svg";
import chamadaIcon from "../../../assets/icons/icon_chamada_mobile.svg";
import smsIcon from "../../../assets/icons/icon_sms_mobile.svg";
import howToUseIcon from "../../../assets/icons/ilustração_utilização_mobile.svg";
import yellowLogo from "../../../assets/icons/logo_amarelo_naFila.svg";

import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

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

  @media (min-width: 768px) {
    width: 70%;
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

const MainContentMobile = props => (
  <Grid
    style={{
      height: "calc(100vh - 184px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "10px"
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
    window.open("https://geralnafilapt.typeform.com/to/VtDUdM", "_blank");
  };

  if (props.isDesktop) {
    return (
      <DesktopLayout endOnBoarding={endOnBoarding}>
        <MainContentDesktop
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
        <MainContentDesktop
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
        <MainContentDesktop
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
                alignItems: "end",
                justifyContent: "end",
                marginLeft: "20px"
              }}
            >
              <TicketContainer>
                <p className="code">{t("admin#onboarding_code")}</p>
                <p className="store">LojaCartaxo</p>
                <div className="ticket">
                  <img src={yellowLogo} alt="asset" height="100%" />
                  <div style={{ marginLeft: "30px" }}>
                    <p className="remaining">
                      {t("admin#onboarding_remaining")}
                    </p>
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
                alignItems: "end",
                justifyContent: "end",
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
                alignItems: "end",
                justifyContent: "end",
                marginLeft: "20px"
              }}
            >
              <img src={storeIcon} alt="asset" height="70%" />
            </Grid>
          }
        />
      </DesktopLayout>
    );
  }
  return (
    <MobileLayout endOnBoarding={endOnBoarding}>
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
            <Button
              forward
              href="https://geralnafilapt.typeform.com/to/VtDUdM"
              dangerouslySetInnerHTML={{
                __html: t("admin#register")
              }}
              style={{ textAlign: "center" }}
            />
          </Grid>
        }
      />
    </MobileLayout>
  );
};

export default OnBoarding;
