import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import Tech4CovidIcon from "@src/assets/icons/Logo-Tech4COVID19-white.svg";
import naFilaIcon from "@src/assets/icons/nafila-text.svg";
import GoogleIcon from "@src/components/Icons/google";
import NosIcon from "@src/components/Icons/nos";

import {
  ABOUT_US_PATH,
  TCS_PATH,
  PRIVACY_PATH
} from "@src/constants/RoutesConstants";

const FooterWrapper = styled(Grid)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #8464ac;
  z-index: 1;

  & .logos {
    width: 100%;
    & a {
      color: white;
      font-size: 13px;
    }
    @media (min-width: 768px) {
      width: 77%;
      & a {
        color: white;
        font-size: 16px;
      }
    }
  }

  & .partners {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    @media (min-width: 768px) {
      margin: 0;
    }

    p {
      color: white;
      font-size: 16px;
      text-transform: uppercase;
      margin: 0 30px 0 0;
    }

    svg {
      width: auto;
      height: 20px;

      @media (min-width: 768px) {
        height: 100%;
      }
    }
  }
  .logo {
    display: flex;
    padding-top: 5px;
  }

  @media (min-width: 768px) {
    height: 125px;
    align-items: center;
    flex-direction: row;

    padding: 10px 15% 10px 15%;
  }
`;

const Logo = styled.img`
  height: 20px;
  @media (min-width: 768px) {
    height: 100%;
  }
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <div className="logos">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Logo src={naFilaIcon} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link target="_blank" rel="noopener" href="https://tech4covid19.org">
            <div style={{ display: "flex", marginTop: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap"
                }}
              >
                Um projecto no âmbito do &nbsp;
                <span className="logo">
                  <img src={Tech4CovidIcon} height="30px" alt="Tech4Covid" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <div className="partners">
          <p>Parceiros</p>
          <div
            style={{ display: "flex", marginTop: "10px", alignItems: "center" }}
          >
            <Link
              style={{ color: "white" }}
              target="_blank"
              rel="noopener"
              href="https://google.pt"
            >
              <GoogleIcon />
            </Link>
            <Link
              style={{ color: "white", marginLeft: "28px" }}
              target="_blank"
              rel="noopener"
              href="https://nos.pt"
            >
              <NosIcon />
            </Link>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "30%"
          }}
        >
          <p style={{ margin: 0, color: "white", fontSize: "13px" }}>
            <Link
              style={{ color: "white" }}
              href={ABOUT_US_PATH}
              rel="noopener"
            >
              {t("about_us#title_about_us")}
            </Link>
            {" | "}
            <Link
              style={{ color: "white" }}
              href={TCS_PATH}
              target="_blank"
              rel="noopener"
            >
              {t("terms#title")}
            </Link>
            {" | "}
            <Link
              style={{ color: "white" }}
              target="_blank"
              href={PRIVACY_PATH}
              rel="noopener"
            >
              {t("terms#privacy")}
            </Link>
            {/* {" | "}
            <Link style={{ color: "white" }} target="_blank" rel="noopener">
              {t("terms#contact")}
            </Link> */}
            {" | "}
            <Link
              style={{ color: "white" }}
              href="https://facebook.com/nafila.pt"
              target="_blank"
              rel="noopener"
            >
              Facebook
            </Link>
          </p>
        </div>
      </div>
    </FooterWrapper>
  );
};
export default Footer;
