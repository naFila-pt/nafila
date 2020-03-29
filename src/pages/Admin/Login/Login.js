import React, { useState, useEffect } from "react";
import { Typography, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../Layout";
import authentication from "../../../services/authentication";
import { auth } from "../../../firebase";
import Loader from "../../../components/Loader";

import { PRIMARY_COLOR } from "../../../constants/ColorConstants";
import {
  ADMIN_RECOVERPASSWORD_PATH,
  ADMIN_START_QUEUE_PATH
} from "../../../constants/RoutesConstants";
import * as S from "./style";

const typographyStyles = {
  TITLE: {
    color: PRIMARY_COLOR,
    fontWeight: 900,
    fontSize: "2rem"
  }
};

const inputProps = {
  fullWidth: true,
  required: true
};

function Login() {
  const { t } = useTranslation();
  const [fields, setFields] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [needsVerification, setNeedsVerification] = useState(false);
  const mappedMessages = {
    "auth/weak-password": t("admin#signup_weakPassword"),
    "auth/email-already-in-use": t("admin#signup_emailInUse"),
    "auth/invalid-email": t("admin#signup_invalidEmail"),
    "auth/operation-not-allowed": t("admin#signup_operationNotAllowed")
  };

  const handleChange = ({ target: { name, value } }) => {
    setFields({
      ...fields,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError();
    setLoading(true);
    setNeedsVerification(false);

    const { email, password } = fields;

    authentication
      .signIn(email, password)
      .then(res => {
        return (window.location.href = ADMIN_START_QUEUE_PATH);
      })
      .catch(error => {
        setLoading(false);
        error && setError(mappedMessages[error.code]);
      });
  };

  useEffect(() => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      setNeedsVerification(true);
    } else if (auth.currentUser && auth.currentUser.emailVerified) {
      // User has session and access to private routes
      window.location.href = ADMIN_START_QUEUE_PATH;
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <Layout bg={LoginBg}>
      <Typography variant="h3" style={typographyStyles.TITLE}>
        {t("admin#login_title")}
      </Typography>

      <S.Form onSubmit={handleSubmit}>
        <TextField
          label={t("admin#login_email")}
          name="email"
          onChange={e => handleChange(e)}
          {...inputProps}
        />

        <TextField
          label={t("admin#login_password")}
          type="password"
          name="password"
          onChange={e => handleChange(e)}
          min="6"
          {...inputProps}
        />

        {error && <Alert severity="error">{error}</Alert>}

        {needsVerification && (
          <Alert severity="info">{t("admin#signup_checkYourEmail")}</Alert>
        )}

        <Link to={ADMIN_RECOVERPASSWORD_PATH} style={{ color: PRIMARY_COLOR }}>
          {t("admin#login_recover_password")}
        </Link>

        <Button type="submit" forward>
          {t("admin#intro_login")}
        </Button>
      </S.Form>
    </Layout>
  );
}

export default Login;
