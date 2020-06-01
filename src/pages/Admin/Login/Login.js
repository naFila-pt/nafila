import React, { useState, useEffect } from "react";
import { Typography, TextField, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import authentication from "../../../services/authentication";
import { auth, firestore } from "../../../firebase";
import Loader from "../../../components/Loader";
import Footer from "@src/components/Footer";
import { ReactComponent as Store } from "@src/assets/images/ilust_loja.svg";

import { PRIMARY_COLOR } from "../../../constants/ColorConstants";
import {
  ADMIN_RECOVER_PASSWORD_PATH,
  ADMIN_QUEUE_MANAGEMENT_PATH,
  ADMIN_PRE_QUEUE_PATH,
  ADMIN_SIGNUP_PATH
} from "../../../constants/RoutesConstants";
import * as S from "./style";
import { HeadlineContainer, ButtonsContainer } from "../common";

import TitleComponent from "../../../components/TitleComponent";

const inputProps = {
  fullWidth: true,
  required: true
};

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100%;

  @media (min-width: 768px) {
    padding: 0 15% 0 15%;
    text-align: left;

    .store-illustration {
      margin-top: auto;
    }
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;

  .buttons-wrapper {
    display: inline-block;
    position: initial;
    margin-top: 56px;
  }

  @media (min-width: 768px) {
    width: 50%;

    form {
      padding: 0;
    }
  }
`;

function Login({ openSnackbar, isDesktop }) {
  const { t } = useTranslation();
  const [fields, setFields] = useState();
  const [loading, setLoading] = useState(false);
  const [invalidError, setInvalidError] = useState(false);
  const mappedMessages = {
    "auth/wrong-password": t("admin#login_wrongPassword"),
    "auth/email-not-verified": t("admin#signup_checkYourEmail")
  };

  const handleChange = ({ target: { name, value } }) => {
    setFields({
      ...fields,
      [name]: value
    });
  };

  const validateEmail = email => {
    const validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || !validEmailRegex.test(email)) {
      setInvalidError(true);
    }
  };

  const checkUserState = () => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      authentication.signOut();
      return Promise.reject({ code: "auth/email-not-verified" });
    } else if (auth.currentUser && auth.currentUser.emailVerified) {
      // User has session and access to private routes
      return firestore
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
    return Promise.resolve();
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
        openSnackbar(
          mappedMessages[error.code] || t("admin#login_failed"),
          undefined,
          undefined,
          "warning"
        );
      });
  };

  useEffect(() => {
    checkUserState().catch(error => {
      openSnackbar(
        mappedMessages[error.code] || t("admin#login_failed"),
        undefined,
        undefined,
        "warning"
      );
    });
  }, [t, openSnackbar, mappedMessages]);

  if (loading) return <Loader />;

  return (
    <Layout bg={LoginBg}>
      <TitleComponent title="Login" pageId="login" />

      <MainContainer>
        <FormContainer>
          <HeadlineContainer>
            <Typography variant="h3">{t("admin#login_title")}</Typography>
          </HeadlineContainer>

          <S.Form onSubmit={handleSubmit}>
            <TextField
              label={t("admin#login_email")}
              name="email"
              onChange={e => {
                setInvalidError(false);
                handleChange(e);
              }}
              onBlur={e => validateEmail(e.target.value)}
              error={invalidError}
              helperText={invalidError && t("admin#login_invalidEmail")}
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

            <Link
              to={ADMIN_RECOVER_PASSWORD_PATH}
              style={{ color: PRIMARY_COLOR }}
            >
              {t("admin#login_recover_password")}
            </Link>

            <ButtonsContainer className="buttons-wrapper">
              <Button
                type="submit"
                forward
                style={{ backgroundColor: "unset", marginBottom: 0 }}
              >
                {t("admin#intro_login")}
              </Button>
              <Link to={ADMIN_SIGNUP_PATH}>
                <Button
                  variant="secondary"
                  forward
                  style={{ backgroundColor: "unset" }}
                >
                  {t("admin#intro_signup")}
                </Button>
              </Link>
            </ButtonsContainer>
          </S.Form>
        </FormContainer>

        {isDesktop && <Store className="store-illustration" />}
      </MainContainer>

      {isDesktop && <Footer />}
    </Layout>
  );
}

export default Login;
