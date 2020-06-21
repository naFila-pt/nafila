import React from "react";
import styled from "styled-components";

import Box from "@material-ui/core/Box";
import { Label } from "./Label";

import FooterIcon from "@src/assets/icons/footer.svg";
import googleIcon from "@src/assets/icons/google-icon.svg";
import NOSIcon from "@src/assets/icons/nos-icon.svg";
import Tech4CovidIcon from "@src/assets/icons/Logo-Tech4COVID19-white.svg";

import { useTranslation } from "react-i18next";

const SFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  flex-direction: ${props => (props.isDesktop ? "flex-end" : "row-reverse")};
  & .footer-text {
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    left: 20px;

    & .title {
      color: white;
      margin: ${props => props.isDesktop && "0 0 5px 0"};
      font-size: ${props => (props.isDesktop ? "12px" : "9px")};
      font-weight: ${props => props.isDesktop && "bold"};
      text-transform: uppercase;
      margin: ${props => !props.isDesktop && "3px 0"};
      font-weight: ${props => !props.isDesktop && "lighter"};
    }
  }
`;

export const Footer = ({ isDesktop, renderInstructionsLabels }) => {
  const { t } = useTranslation();

  return (
    <SFooter isDesktop={isDesktop}>
      {!isDesktop && renderInstructionsLabels(isDesktop)}
      <Label
        isDesktop={isDesktop}
        style={{
          marginTop: "50px",
          fontSize: isDesktop ? "24px" : "12px",
          paddingLeft: isDesktop && "3rem",
          margin: isDesktop && "0 0 15px 20px",
          display: !isDesktop && "flex",
          flexDirection: !isDesktop && "column",
          width: !isDesktop && "33%"
        }}
        dangerouslySetInnerHTML={{
          __html: t("admin#queueStatus_naFilaLabel")
        }}
      />
      <Box
        position="relative"
        display="flex"
        alignItems="flex-end"
        width={"100%"}
      >
        <div className="footer-text">
          <Box>
            <p className="title">Projecto no âmbito do</p>
            <img
              src={Tech4CovidIcon}
              height={isDesktop ? "30px" : "15px"}
              alt="Tech4Covid"
            />
          </Box>
          <div style={{ marginLeft: isDesktop ? "50px" : "20px" }}>
            <p className="title">Parceiros</p>
            <Box>
              <img
                src={googleIcon}
                style={{ height: isDesktop ? "30px" : "15px" }}
                alt="google"
              />
              <img
                src={NOSIcon}
                style={{
                  height: isDesktop ? "30px" : "15px",
                  marginLeft: isDesktop ? "30px" : "7.5px"
                }}
                alt="nos"
              />
            </Box>
          </div>
        </div>
        <img src={FooterIcon} alt="footer" width="100%" height="100%" />
      </Box>
    </SFooter>
  );
};
