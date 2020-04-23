import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import { ReactComponent as NaFilaIcon } from "../../assets/icons/nafila-text.svg";
import { ReactComponent as Tech4CovidIcon } from "../../assets/icons/tech4covid.svg";
import { ReactComponent as GoogleIcon } from "../../assets/icons/google-icon.svg";
import { ReactComponent as NOSIcon } from "../../assets/icons/nos-icon.svg";

const FooterWrapper = styled(Grid)`
  width: 100%;
  height: 30%;
  display: grid;
  padding: 10px 15% 10px 15%;
  background-color: #8464ac;
  grid-template-columns: repeat(auto-fit, minmax(19em, 1fr));
  grid-row-gap: 20px;
  & .column {
    width: 70%;
  }
  @media (min-width: 768px) {
    height: 150px;
  }
`;

const Footer = () => {
  const { t } = useTranslation();

  return (
    <FooterWrapper>
      <div className="column">
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
            <div style={{ display: "flex" }}>
              <p>Um projecto no âmbito do</p>
              <Tech4CovidIcon />
              <p>#tech4COVID19</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="column">
        <div style={{ display: "flex", alignItems: "center", height: "30%" }}>
          <p style={{ margin: 0, color: "white", fontSize: "20px" }}>
            Parceiros
          </p>
        </div>
        <div
          style={{
            display: "flex",
            height: "30%",
            justifyContent: "space-between",
            alignItems: "center"
          }}
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
            style={{ color: "white" }}
            target="_blank"
            rel="noopener"
            href="https://nos.pt"
          >
            <NOSIcon />
          </Link>
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
