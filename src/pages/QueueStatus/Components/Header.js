import React from "react";
import { Typography } from "@material-ui/core";
import Logo from "@src/assets/icons/naFila_logo.svg";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const SHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 0 20px;
  height: ${props => (props.isDesktop ? "15%" : "8%")};
  width: ${props => props.isDesktop && "100%"};
  margin-bottom: ${props => props.isDesktop && "2px"};
`;

export const Header = ({ isDesktop }) => {
  const { t } = useTranslation();

  return (
    <SHeader isDesktop={isDesktop}>
      <img src={Logo} alt="logo" height="100%" />
      <Typography
        variant="h3"
        style={{
          fontSize: isDesktop ? "30px" : "20px",
          marginLeft: "5%"
        }}
      >
        {t("admin#intro_welcome")}
      </Typography>
    </SHeader>
  );
};
