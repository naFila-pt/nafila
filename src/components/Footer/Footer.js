import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import { ReactComponent as NaFilaIcon } from "../../assets/icons/nafila-text.svg";
import { ReactComponent as Tech4CovidIcon } from "../../assets/icons/Logo-Tech4COVID19.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/google-icon.svg";
import { ReactComponent as NOSIcon } from "../../assets/icons/nos-icon.svg";

const FooterWrapper = styled(Grid)`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  background-color: #8464ac;
  z-index: 1;

  & .partners {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      margin-top: 0px;
    }
  }
  .logo path {
    fill: white;
  }
  .logo {
    display: flex;
  }

  @media (min-width: 768px) {
    height: 125px;
    align-items: center;
    flex-direction: row;

    padding: 10px 15% 10px 15%;
  }
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <div style={{ width: "77%" }}>
        <div style={{ display: "flex", alignItems: "center", height: "50%" }}>
          <NaFilaIcon />
        </div>
        <div style={{ display: "flex", alignItems: "center", height: "50%" }}>
          <Link
            style={{ color: "white" }}
            target="_blank"
            rel="noopener"
            href="https://tech4covid19.org"
          >
            <div style={{ display: "flex", marginTop: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "nowrap"
                }}
              >
                Um projecto no âmbito do &nbsp;
                <span className="logo">
                  <Tech4CovidIcon height="30px" width="150px" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <div className="partners">
          <div
            style={{
              color: "white",
              fontSize: "16px",
              lineHeight: "19px",
              textTransform: "uppercase",
              marginRight: "28px"
            }}
          >
            Parceiros
          </div>
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
              <NOSIcon />
            </Link>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", height: "30%" }}>
          <p style={{ margin: 0, color: "white", fontSize: "13px" }}>
            <Link
              style={{ color: "white" }}
              href="/termos-condicoes"
              target="_blank"
              rel="noopener"
            >
              {t("terms#title")}
            </Link>
            {" | "}
            <Link style={{ color: "white" }} target="_blank" rel="noopener">
              {t("terms#privacy")}
            </Link>
            {" | "}
            <Link style={{ color: "white" }} target="_blank" rel="noopener">
              {t("terms#contact")}
            </Link>
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
