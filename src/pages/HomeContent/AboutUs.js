import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import bgMainMobile from "@src/assets/bg/home_mobile.svg";
import bgMain from "@src/assets/bg/home_desktop.svg";
import logoBannerSrc from "@src/assets/icons/logo_nafila.svg";
import twoPeopleSrc from "@src/assets/icons/two_people.svg";
import senhasPtSrc from "@src/assets/icons/senhas_pt.svg";
import mobiqueueSrc from "@src/assets/icons/mobiqueue.svg";
import tech4CovidSrc from "@src/assets/icons/Logo-Tech4COVID19.svg";

import Grid from "@material-ui/core/Grid";
import GoogleIcon from "@src/components/Icons/google";
import NosIcon from "@src/components/Icons/nos";
import Footer from "@src/components/Footer";
import Button from "@src/components/Button";
import {
  PRIMARY_COLOR,
  BRIGHT_GRAY_COLOR
} from "@src/constants/ColorConstants";

const Header = styled.div`
  background-color: #fff;
  width: "100%";
  align-items: center;
  justify-content: center;
  height: 50px;
  display: none;
  @media (min-width: 768px) {
    display: flex;
  }

  img {
    width: 100px;
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${bgMainMobile});

  h1,
  h3 {
    text-transform: uppercase;
  }

  p {
    color: ${BRIGHT_GRAY_COLOR};
  }
  g a {
    color: ${PRIMARY_COLOR};
  }

  @media (min-width: 768px) {
    background-image: url(${bgMain});
    height: unset;
    padding: 24px 166px;
  }
`;

const LogosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > a:first-child {
    margin-bottom: 40px;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    height: 104px;

    & > a:first-child {
      margin-bottom: initial;
      margin-right: 120px;
    }
  }
`;

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <Grid style={{ display: "flex", flexDirection: "column" }}>
      <Header>
        <img src={logoBannerSrc} alt="logo" />
      </Header>
      <MainContainer>
        <Grid container>
          <Grid item xs={12} lg={7}>
            <h1>{t("about_us#title_about_us")}</h1>
            <h3>{t("about_us#title_what")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("about_us#text_what") }} />

            <h3>{t("about_us#title_why")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("about_us#text_why") }} />

            <h1>{t("about_us#title_team")}</h1>
            <p dangerouslySetInnerHTML={{ __html: t("about_us#text_team") }} />
          </Grid>
          <Grid item xs={0} lg={5}>
            <img src={twoPeopleSrc} alt="Two people" />
          </Grid>

          <Grid item xs={12} lg={6}>
            <h3>{t("about_us#title_collaboration")}</h3>
            <LogosContainer classNames="collaboration">
              <a href="https://www.senhas.pt" target="blank">
                <img src={senhasPtSrc} />
              </a>
              <a href="https://mobiqueueapp.com/" target="blank">
                <img src={mobiqueueSrc} />
              </a>
            </LogosContainer>
          </Grid>

          <Grid item xs={12} lg={6}>
            <h3>{t("about_us#title_partners")}</h3>
            <LogosContainer>
              <a href="https://www.google.pt" target="blank">
                <GoogleIcon color={BRIGHT_GRAY_COLOR} />
              </a>
              <a href="https://www.nos.pt" target="blank">
                <NosIcon color={BRIGHT_GRAY_COLOR} />
              </a>
            </LogosContainer>
          </Grid>

          <Grid item xs={12} lg={6} style={{ marginTop: "44px" }}>
            <h3>{t("about_us#title_contact")}</h3>
            <Button forward={true} style={{ marginTop: "56px" }}>
              {t("about_us#button_label_contact")}
            </Button>
          </Grid>

          <Grid item xs={12} lg={6} style={{ marginTop: "44px" }}>
            <img src={tech4CovidSrc} style={{ marginTop: "28px" }} />
            <p>{t("about_us#text_tech4Covid")}</p>
          </Grid>

          <Grid
            item
            xs={12}
            lg={6}
            style={{ marginTop: "44px", marginLeft: "auto" }}
          >
            <h3>{t("about_us#title_illustrations")}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: t("about_us#text_illustrations")
              }}
            />
          </Grid>

          <Grid item xs={12} lg={7}>
            <h1>{t("about_us#title_support")}</h1>

            <h3>{t("about_us#title_support_instructions")}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: t("about_us#text_support_instructions", {
                  filepath: `${process.env.PUBLIC_URL}/instructions.pdf`
                })
              }}
            />

            <h3>{t("about_us#title_support_implementation_kit")}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: t("about_us#text_support_implementation_kit", {
                  filepath: `${process.env.PUBLIC_URL}/implementation-kit.pdf`
                })
              }}
            />
          </Grid>
        </Grid>
      </MainContainer>
      <Footer />
    </Grid>
  );
};

export default AboutUs;
