import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import bgMainMobile from "@src/assets/bg/terms_mobile.svg";
import bgMain from "@src/assets/bg/terms_desktop.svg";
import twoPeopleSrc from "@src/assets/icons/two_people.svg";
import senhasPtSrc from "@src/assets/icons/senhas_pt.svg";
import mobiqueueSrc from "@src/assets/icons/mobiqueue.svg";
import tech4CovidSrc from "@src/assets/icons/Logo-Tech4COVID19.svg";

import Grid from "@material-ui/core/Grid";
import GoogleIcon from "@src/components/Icons/google";
import NosIcon from "@src/components/Icons/nos";
import Toolbar from "@src/components/Toolbar";
import Footer from "@src/components/Footer";
import Button from "@src/components/Button";
import {
  PRIMARY_COLOR,
  BRIGHT_GRAY_COLOR
} from "@src/constants/ColorConstants";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(${bgMainMobile});
  padding: 28px;

  h1,
  h3 {
    text-transform: uppercase;
    font-weight: 900;
  }

  h3 {
    font-size: 22px;
  }

  p {
    color: ${BRIGHT_GRAY_COLOR};
  }

  a {
    color: ${PRIMARY_COLOR};
  }

  .contact {
    button {
      margin-top: 36px;
    }
  }

  .partners {
    a:nth-child(2) {
      svg {
        width: 100px;
        height: 100%;
      }
    }
  }

  .tech4Covid {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 56px;

    & > img {
      width: 60%;
    }
  }

  .about_us_text {
    margin-bottom: 0;
  }

  @media (min-width: 768px) {
    background-image: url(${bgMain});
    height: unset;
    padding: 24px 166px;

    .contact,
    .tech4Covid {
      margin-top: 36px;
    }

    .contact {
      button {
        margin-top: 56px;
      }
    }

    .tech4Covid {
      align-items: start;

      & > img {
        width: auto;
        margin-top: 28px;
      }
    }

    .illustrations {
      margin-left: auto;
    }
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
      margin-right: 70px;
    }
  }
`;

const AboutUs = ({ isDesktop }) => {
  const { t } = useTranslation();

  return (
    <Grid style={{ display: "flex", flexDirection: "column" }}>
      <Toolbar />
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

          {isDesktop && (
            <Grid item lg={5}>
              <img src={twoPeopleSrc} alt="Two people" />
            </Grid>
          )}

          <Grid item xs={12} lg={6}>
            <h3>{t("about_us#title_collaboration")}</h3>
            <LogosContainer classNames="collaboration">
              <a
                href="https://www.senhas.pt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={senhasPtSrc} alt="Senhas.pt logo" height="50px" />
              </a>
              <a
                href="https://mobiqueueapp.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={mobiqueueSrc} alt="mobiqueue logo" height="70px" />
              </a>
            </LogosContainer>
          </Grid>

          <Grid className="partners" item xs={12} lg={6}>
            <h3>{t("about_us#title_partners")}</h3>
            <LogosContainer>
              <a
                href="https://www.google.pt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GoogleIcon color={BRIGHT_GRAY_COLOR} />
              </a>
              <a
                href="https://www.nos.pt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <NosIcon color={BRIGHT_GRAY_COLOR} />
              </a>
            </LogosContainer>
          </Grid>

          <Grid className="contact" item xs={12} lg={6}>
            <h3>{t("about_us#title_contact")}</h3>
            <a href="mailto:suporte.nafila@gmail.com">
              <Button forward={true}>
                {t("about_us#button_label_contact")}
              </Button>
            </a>
          </Grid>

          <Grid className="tech4Covid" item xs={12} lg={6}>
            <img src={tech4CovidSrc} alt="tech4Covid logo" />
            <p className="about_us_text">{t("about_us#text_tech4Covid")}</p>
          </Grid>

          <Grid className="illustrations" item xs={12} lg={6}>
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
                  filepathColorful: `${process.env.PUBLIC_URL}/naFila_Cartaz_Instrucoes_SMS_COR.pdf`,
                  filepathBlackWhite: `${process.env.PUBLIC_URL}/naFila_Cartaz_Instrucoes_SMS_PB.pdf`
                })
              }}
            />

            <h3>{t("about_us#title_support_implementation_kit")}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: t("about_us#text_support_implementation_kit", {
                  filepath: `${process.env.PUBLIC_URL}/naFila_Kit_Implementacao.pdf`
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
