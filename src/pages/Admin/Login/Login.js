import React, { useState, useEffect } from "react";
import { Typography, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import authentication from "../../../services/authentication";
import { auth, firestore } from "../../../firebase";
import Loader from "../../../components/Loader";

import { PRIMARY_COLOR } from "../../../constants/ColorConstants";
import {
  ADMIN_RECOVER_PASSWORD_PATH,
  ADMIN_QUEUE_MANAGEMENT_PATH,
  ADMIN_PRE_QUEUE_PATH
} from "../../../constants/RoutesConstants";
import * as S from "./style";
import { HeadlineContainer, ButtonsContainer } from "../common";

const inputProps = {
  fullWidth: true,
  required: true
};

function Login({ openSnackbar }) {
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

  const searchForQueue = () => {
    firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .get()
      .then(response => {
        const user = response.data();

        if (!user.queues || !user.queues[0]) {
          window.location.href = ADMIN_QUEUE_MANAGEMENT_PATH;
        } else {
          window.location.href = ADMIN_PRE_QUEUE_PATH;
        }
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
      .then(() => searchForQueue())
      .catch(error => {
        setLoading(false);
        error && setError(mappedMessages[error.code]);
        openSnackbar("Login falhou");
      });
  };

  useEffect(() => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      setNeedsVerification(true);
    } else if (auth.currentUser && auth.currentUser.emailVerified) {
      // User has session and access to private routes
      searchForQueue();
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <Layout bg={LoginBg}>
      <HeadlineContainer>
        <Typography variant="h3">{t("admin#login_title")}</Typography>
      </HeadlineContainer>

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

        <Link to={ADMIN_RECOVER_PASSWORD_PATH} style={{ color: PRIMARY_COLOR }}>
          {t("admin#login_recover_password")}
        </Link>

        <ButtonsContainer>
          <Button type="submit" forward>
            {t("admin#intro_login")}
          </Button>
        </ButtonsContainer>
      </S.Form>
    </Layout>
  );
}

export default Login;
