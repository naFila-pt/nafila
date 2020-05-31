import React from "react";

import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import { ADMIN_LOGIN_PATH } from "../../../constants/RoutesConstants";

import { HeadlineContainer, ButtonsContainer } from "../common";

import TitleComponent from "../../../components/TitleComponent";

function SuccessfulRecoverPassword(props) {
  const { t } = useTranslation();

  return (
    <Layout bg={LoginBg}>
      <TitleComponent
        title="Password recuperada!"
        pageId="password_recovery_success"
      />
      <HeadlineContainer>
        <Typography variant="h3">
          {t("admin#recoverPasswordSuccess_title")}
        </Typography>
      </HeadlineContainer>

      <div
        style={{
          fontSize: "1.25em",
          padding: "0 1em",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          whiteSpace: "pre-wrap"
        }}
      >
        <span>{t("admin#recoverPasswordSuccess_text1")}</span>
        <span style={{ borderBottom: "1px solid #4C0788" }}>
          {props.email}.
        </span>
        <span>{t("admin#recoverPasswordSuccess_text2")}</span>
      </div>

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
