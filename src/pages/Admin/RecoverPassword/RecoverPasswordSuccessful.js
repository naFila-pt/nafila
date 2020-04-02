import React from "react";

import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import { ADMIN_LOGIN_PATH } from "../../../constants/RoutesConstants";

import { HeadlineContainer, ButtonsContainer } from "../common";

function SuccessfulRecoverPassword(props) {
  const { t } = useTranslation();

  return (
    <Layout bg={LoginBg}>
      <HeadlineContainer>
        <Typography variant="h3">
          {t("admin#recoverPasswordSuccess_title")}
        </Typography>
      </HeadlineContainer>

      <p style={{ fontSize: "1.25em", padding: "0 1em" }}>
        {t("admin#recoverPasswordSuccess_text1") +
          props.email +
          t("admin#recoverPasswordSuccess_text2")}
      </p>

      <ButtonsContainer>
        <Link to={ADMIN_LOGIN_PATH}>
          <Button variant="gray" backward>
            {t("admin#recoverPasswordSuccess_return")}
          </Button>
        </Link>
      </ButtonsContainer>
    </Layout>
  );
}

export default SuccessfulRecoverPassword;
