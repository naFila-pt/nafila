import React from "react";

import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../../constants/ColorConstants";
import * as S from "./style";
import { ADMIN_LOGIN_PATH } from "../../../constants/RoutesConstants";

const typographyStyles = {
  TITLE: {
    color: PRIMARY_COLOR,
    fontWeight: 900,
    fontSize: "2rem"
  }
};

const buttonStyles = {
  color: WHITE_COLOR,
  textDecoration: "none",
  background: "none"
};

function RecoverPasswordChangeSuccess(props) {
  const { t } = useTranslation();

  return (
    <Layout bg={LoginBg}>
      <S.Form>
        <Typography variant="h3" style={typographyStyles.TITLE}>
          {t("admin#recoverPasswordChangeSuccess_title")}
        </Typography>

        <p
          style={typographyStyles.SECONDARY}
          dangerouslySetInnerHTML={{
            __html: t("admin#recoverPasswordChangeSuccess_text1")
          }}
        />

        <Button forward style={buttonStyles}>
          <Link to={ADMIN_LOGIN_PATH}>
            {t("admin#recoverPasswordChangeSuccess_button")}
          </Link>
        </Button>
      </S.Form>
    </Layout>
  );
}

export default RecoverPasswordChangeSuccess;
