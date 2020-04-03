import React, { useState, useEffect } from "react";
import { Typography, TextField } from "@material-ui/core";
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
  const mappedMessages = {
    "auth/wrong-password": t("admin#login_wrongPassword")
  };

  const handleChange = ({ target: { name, value } }) => {
    setFields({
      ...fields,
      [name]: value
    });
  };

  const checkUserState = () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      setNeedsVerification(true);
      authentication.signOut();
    } else if (auth.currentUser && auth.currentUser.emailVerified) {
      // User has session and access to private routes
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
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = fields;

    authentication
      .signIn(email, password)
      .then(checkUserState)
      .catch(error => {
        setLoading(false);
        openSnackbar(mappedMessages[error.code] || t("admin#login_failed"));
      });
  };

  useEffect(() => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      openSnackbar(t("admin#signup_checkYourEmail"));
      authentication.signOut();
    } else if (auth.currentUser && auth.currentUser.emailVerified) {
      // User has session and access to private routes
      checkUserState();
    }
  }, [t, openSnackbar]);

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
