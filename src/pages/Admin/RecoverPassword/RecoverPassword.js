import React, { useState } from "react";

import { Typography, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import {
  PRIMARY_COLOR,
  WHITE_COLOR,
  BACK_BUTTON_BG_COLOR,
  BACK_BUTTON_TEXT_COLOR
} from "../../../constants/ColorConstants";
import { ADMIN_LOGIN_PATH } from "../../../constants/RoutesConstants";
import * as S from "./style";
import SuccessfulRecoverPassword from "./SuccessfulRecoverPassword";
import validator from "email-validator";
import authentication from "../../../services/authentication";
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
const backButtonStyles = {
  color: BACK_BUTTON_TEXT_COLOR,
  textDecoration: "none",
  background: BACK_BUTTON_BG_COLOR
};

const inputProps = {
  fullWidth: true,
  required: true
};

function RecoverPassword() {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");

  const sendPasswordRecoveryEmail = () => {
    if (validator.validate(email)) {
      authentication
        .resetPassword(email)
        .then(() => {
          setSuccess(true);
        })
        .catch(error => {
          error && setErrorText(t("admin#recoverPassword_serverFail"));
        });
    } else {
      setErrorText(t("admin#recoverPassword_wrongEmail"));
    }
  };

  const changeEmailText = v => {
    setEmail(v);
    setErrorText("");
  };

  if (success) return <SuccessfulRecoverPassword email={email} />;

  return (
    <Layout bg={LoginBg}>
      <S.Form>
        <Typography variant="h3" style={typographyStyles.TITLE}>
          {t("admin#recoverPassword_title")}
        </Typography>

        <TextField
          label={t("admin#recoverPassword_email")}
          name="email"
          onChange={e => changeEmailText(e.target.value)}
          style={{ marginTop: "25px" }}
          {...inputProps}
        />
        <Typography variant="h5" style={{ color: "red" }}>
          {errorText}
        </Typography>

        <Button style={buttonStyles} onClick={sendPasswordRecoveryEmail}>
          {t("admin#recoverPassword_recover")}
        </Button>

        <Button backward style={backButtonStyles}>
          <Link
            to={ADMIN_LOGIN_PATH}
            style={{
              color: BACK_BUTTON_TEXT_COLOR,
              textDecoration: "none",
              background: BACK_BUTTON_BG_COLOR
            }}
          >
            {t("admin#recoverPassword_back")}
          </Link>
        </Button>
      </S.Form>
    </Layout>
  );
}

export default RecoverPassword;
