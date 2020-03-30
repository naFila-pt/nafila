import React from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Button from "../../../components/Button";
import Background from "../../../assets/bg/user_intro.svg";
import Logo from "../../../assets/logo.svg";
import Layout from "../Layout";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../../constants/ColorConstants";
import {
  ADMIN_LOGIN_PATH,
  ADMIN_SIGNUP_PATH
} from "../../../constants/RoutesConstants";

import * as S from "./style";

const typographyStyles = {
  MAIN: {
    color: PRIMARY_COLOR,
    fontWeight: 600
  },
  SECONDARY: {
    color: PRIMARY_COLOR
  }
};

function WelcomePanel() {
  const { t } = useTranslation();

  return (
    <Layout bg={Background} hideToolbar>
      <S.LogoContainer>
        <img src={Logo} alt="nafila logo" />
      </S.LogoContainer>

      <Typography variant="h3" style={typographyStyles.MAIN}>
        {t("admin#intro_welcome")}
      </Typography>

      <Typography
        variant="h5"
        style={typographyStyles.SECONDARY}
        dangerouslySetInnerHTML={{ __html: t("admin#intro_pitch") }}
      />

      <S.ButtonsContainer>
        <Link
          to={ADMIN_LOGIN_PATH}
          style={{ color: WHITE_COLOR, textDecoration: "none" }}
        >
          <Button forward>
            {t("admin#intro_login")}
          </Button>
        </Link>

        <br />

        
        <Link
          to={ADMIN_SIGNUP_PATH}
          style={{ color: PRIMARY_COLOR, textDecoration: "none" }}
        >
          <Button variant="secondary" forward>
            {t("admin#intro_signup")}
          </Button>
        </Link>
        
      </S.ButtonsContainer>
    </Layout>
  );
}

export default WelcomePanel;
