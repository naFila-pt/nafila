import React, { useState } from "react";

import { Typography, Input } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import { ADMIN_LOGIN_PATH } from "../../../constants/RoutesConstants";
import * as S from "./style";
import SuccessfulRecoverPassword from "./RecoverPasswordSuccessful";
import authentication from "../../../services/authentication";

import { HeadlineContainer, ButtonsContainer } from "../common";

function RecoverPassword() {
  const { t } = useTranslation();
  const [requesting, setRequesting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");

  const sendPasswordRecoveryEmail = event => {
    event.preventDefault();
    setRequesting(true);

    authentication
      .resetPassword(email)
      .then(() => {
        setSuccess(true);
      })
      .catch(error => {
        error && setErrorText(t("admin#recoverPassword_serverFail"));
        setRequesting(false);
      });
  };

  const handleChange = event => {
    setEmail(event.target.value);
    setErrorText("");
  };

  if (success) return <SuccessfulRecoverPassword email={email} />;

  return (
    <Layout bg={LoginBg}>
      <HeadlineContainer>
        <Typography variant="h3">{t("admin#recoverPassword_title")}</Typography>
      </HeadlineContainer>

      <S.Form onSubmit={sendPasswordRecoveryEmail}>
        <p style={{ fontSize: "1.25em" }}>{t("admin#recoverPassword_text1")}</p>

        <Input
          type="email"
          placeholder={t("admin#recoverPassword_email")}
          value={email}
          onChange={handleChange}
          style={{ marginTop: "25px" }}
          fullWidth
          required
        />
        <Typography variant="h5" style={{ color: "red" }}>
          {errorText}
        </Typography>

        <ButtonsContainer>
          <div>
            <Button
              type="submit"
              disabled={requesting}
              variant={requesting ? "inactive" : ""}
            >
              {t("admin#recoverPassword_recover")}
            </Button>
          </div>

          <Link to={ADMIN_LOGIN_PATH}>
            <Button variant={requesting ? "inactiveGray" : "gray"} backward>
              {t("admin#recoverPassword_back")}
            </Button>
          </Link>
        </ButtonsContainer>
      </S.Form>
    </Layout>
  );
}

export default RecoverPassword;
