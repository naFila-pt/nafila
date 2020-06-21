import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import bgMainMobile from "@src/assets/bg/terms_mobile.svg";
import bgMain from "@src/assets/bg/terms_desktop.svg";
import firstPerson from "@src/assets/icons/pessoa_homepage_desktop.svg";
import secondPerson from "@src/assets/icons/person_man.svg";
import github_logo from "@src/assets/icons/github_logo.svg";
import mobiqueueSrc from "@src/assets/icons/mobiqueue.svg";
import tech4CovidSrc from "@src/assets/icons/Logo-Tech4COVID19.svg";

import Grid from "@material-ui/core/Grid";
import GoogleIcon from "@src/components/Icons/google";
import NosIcon from "@src/components/Icons/nos";
import { ReactComponent as FJCIcon } from "@src/assets/icons/logo_FJC.svg";
import { ReactComponent as SenhasPTIcon } from "@src/assets/icons/senhas_pt.svg";
import Header from "@src/components/Header";
import Footer from "@src/components/Footer";
import {
  PRIMARY_COLOR,
  BRIGHT_GRAY_COLOR
} from "@src/constants/ColorConstants";
import TEAM_MEMBERS from "./TeamMembers.json";

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

  h1 {
    font-size: 40px;
  }

  h3 {
    font-size: 22px;
  }

  p {
    color: ${BRIGHT_GRAY_COLOR};
    line-height: 1.8;
  }

  a {
    color: ${PRIMARY_COLOR};
  }

  .person-images {
    display: flex;
    justify-content: center;
    & img {
      height: 250px;
    }
    & :first-child {
      align-self: end;
    }
  }

  .tech4CovidLogo {
    display: flex;
    justify-content: center;
    align-items: center;
    & img {
      width: 60%;
    }
  }

  .team-wrapper {
    & .title {
      font-weight: bold;
      font-size: 18px;
      margin: 10px 0;
      padding: 0 10px;
      color: #4c0788;
    }
    & .line {
      width: 100%;
      height: 15px;
      background-color: #4c078880;
    }
    & .first-column {
      width: 50%;
      @media (min-width: 768px) {
        width: 100%;
      }
    }
    & .column {
      width: 100%;
    }
  }

  .contact {
    button {
      margin-top: 36px;
    }
    & .support_mail {
      margin: 36px 0;
    }
  }

  .partners {
    margin: 0;
    @media (min-width: 768px) {
      margin-left: 40px;
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
    margin: 26px 0;
  }

  .github {
    display: flex;
    & img {
      margin: 22px 0 22px 5px;
      height: 25px;
    }
  }

  @media (min-width: 768px) {
    background-image: url(${bgMain});
    height: unset;

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
  }

  @media (min-width: 1200px) {
    padding: 24px 166px;
  }
`;

const LogosContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: start;

  & > a {
    display: flex;
    width: 25%;
    height: 108px;

    svg {
      height: auto;
    }
  }

  & > .partner_logo {
    width: 20%;
    height: 108px;

    svg {
      width: 100%;
      height: auto;
    }
  }

  @media (min-width: 768px) {
    align-items: center;
    flex-direction: row;

    & > a:not(:first-child) {
      margin-top: initial;
      margin-left: 48px;
    }

    & > .partner_logo {
      width: 30%;
    }
  }

  @media (min-width: 1200px) {
    flex-direction: row;

    & > a:not(:first-child) {
      margin-top: initial;
      margin-left: 48px;
    }
  }
`;

const Member = styled.div`
  text-align: start;
  padding: 0 10px;
  & a {
    text-decoration: none;
    color: black;
    font-weight: ${props => (props.mainMember ? "bold" : "normal")};
    font-size: ${props =>
      props.mainMember ? (props.big ? "22px" : "18px") : "14px"};
  }
`;

const AboutUs = ({ isDesktop }) => {
  const { t } = useTranslation();

  return (
    <Grid style={{ display: "flex", flexDirection: "column" }}>
      <Header />
      <MainContainer>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={12}>
            <Grid container>
              <Grid item xs={12} md={9}>
                <h1>{t("about_us#title_about_us")}</h1>
                <h3>{t("about_us#title_what")}</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: t("about_us#text_what") }}
                />
              </Grid>
              {isDesktop && (
                <Grid item md={3} className="person-images">
                  <img src={firstPerson} alt="People" />
                  <img src={secondPerson} alt="People" />
                </Grid>
              )}
            </Grid>
            <Grid container>
              <Grid item xs={12} md={9}>
                <h3>{t("about_us#title_why")}</h3>
                <p
                  dangerouslySetInnerHTML={{ __html: t("about_us#text_why") }}
                />
              </Grid>
              <Grid item xs={12} md={3} className="tech4CovidLogo">
                <img src={tech4CovidSrc} alt="tech4Covid logo" />
              </Grid>
            </Grid>

            <h1>{t("about_us#title_team")}</h1>
            <p dangerouslySetInnerHTML={{ __html: t("about_us#text_team") }} />
            <Grid container spacing={2} className="team-wrapper">
              {Object.keys(TEAM_MEMBERS).map((key, index) => (
                <Grid item xs={index === 0 ? 12 : 6} md={2}>
                  <div className={index === 0 ? "first-column" : "column"}>
                    <div className="line" />
                    <p className="title">{t(`about_us#column_title_${key}`)}</p>
                    {TEAM_MEMBERS[key].map((m, i) => (
                      <Member mainMember={m.main} big={key === "coordination"}>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={m.link !== "" ? m.link : null}
                        >
                          {m.name}
                        </a>
                      </Member>
                    ))}
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={7}>
            <h3>{t("about_us#title_collaboration")}</h3>
            <LogosContainer classNames="collaboration">
              <a
                href="https://www.fjc.pt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FJCIcon style={{ width: "100%", height: "auto" }} />
              </a>
              <a
                href="https://www.senhas.pt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SenhasPTIcon style={{ width: "100%", height: "auto" }} />
              </a>
              <a
                href="https://mobiqueueapp.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={mobiqueueSrc}
                  alt="mobiqueue logo"
                  width="50%"
                  height="auto"
                />
              </a>
            </LogosContainer>
          </Grid>

          <Grid className="partners" item xs={12} md={4}>
            <h3>{t("about_us#title_partners")}</h3>
            <LogosContainer>
              <a
                href="https://www.google.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="partner_logo"
              >
                <GoogleIcon
                  color={BRIGHT_GRAY_COLOR}
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
              <a
                href="https://www.nos.pt"
                target="_blank"
                rel="noopener noreferrer"
                className="partner_logo"
              >
                <NosIcon
                  color={BRIGHT_GRAY_COLOR}
                  style={{ width: "100%", height: "auto" }}
                />
              </a>
            </LogosContainer>
          </Grid>

          <Grid item xs={12} lg={12}>
            <Grid item xs={12} sm={9} md={12}>
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
                    filepath: `${process.env.PUBLIC_URL}/naFila_Guia_Implementacao.pdf`
                  })
                }}
              />
            </Grid>

            <Grid
              container
              spacing={4}
              style={{ marginTop: "50px", marginBottom: "50px" }}
            >
              <Grid item xs={12} md={6}>
                <h3>{t("about_us#title_illustrations")}</h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: t("about_us#text_illustrations")
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <div className="github">
                  <h3>{t("about_us#title_github")}</h3>
                  <img src={github_logo} alt="github" />
                </div>
                <p
                  style={{ margin: 0 }}
                  dangerouslySetInnerHTML={{
                    __html: t("about_us#text_github")
                  }}
                />
              </Grid>
            </Grid>

            <Grid className="contact" item xs={12} sm={6}>
              <h1>{t("about_us#title_contact")}</h1>
              <p className="about_us_text">{t("about_us#text_support")}</p>
              <a
                className="support_mail"
                href="mailto:suporte.nafila@gmail.com"
              >
                suporte.nafila@gmail.com
              </a>
            </Grid>
          </Grid>
        </Grid>
      </MainContainer>
      <Footer />
    </Grid>
  );
};

export default AboutUs;
