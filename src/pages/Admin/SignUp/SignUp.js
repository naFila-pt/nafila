import React, { useState, useEffect } from "react";
import { Typography, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import SignUpBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import PasswordInput from "../../../components/PasswordInput";
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR
} from "../../../constants/ColorConstants";
import authentication from "../../../services/authentication";
import { auth } from "../../../firebase";
import { HeadlineContainer, ButtonsContainer } from "../common";

import SuccessfulSignUp from "./SuccessfulSignUp";

import TitleComponent from "../../../components/TitleComponent";
import { ReactComponent as Store } from "@src/assets/images/ilust_loja.svg";
import Footer from "@src/components/Footer";
import { ADMIN_LOGIN_PATH } from "@src/constants/RoutesConstants";

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
    position: initial;
    margin-top: 56px;

    a {
      text-align: center;
    }

    button {
      margin: 0;
    }

    & > div:first-child {
      margin-bottom: 20px !important;
    }
  }

  @media (min-width: 768px) {
    width: 50%;

    form {
      padding: 0;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 30px;

  button {
    margin-top: 2em;
  }

  .MuiTextField-root {
    margin-bottom: 2em;
    border-color: ${PRIMARY_COLOR} !important;

    .MuiFormHelperText-root {
      text-align: right;
    }

    label {
      width: 100%;
      color: ${PRIMARY_COLOR} !important;
    }

    .MuiInputLabel-shrink {
      transform-origin: top center;
    }

    .MuiInput-root {
      &:before {
        border-color: ${SECONDARY_COLOR} !important;
      }

      &:after {
        border-color: ${PRIMARY_COLOR} !important;
      }
    }
  }

  .MuiInput-input {
    text-align: center;
  }

  .MuiAlert-root {
    text-align: left;
  }

  input {
    width: 100%;
  }
`;

const inputProps = {
  fullWidth: true,
  required: true
};

function SignUp({ openSnackbar, isDesktop }) {
  const { t } = useTranslation();
  const [fields, setFields] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
    setLoading(true);

    const { email, password, defaultQueueName } = fields;

    authentication
      .signUpStore(email, password, defaultQueueName)
      .then(() => {
        setSuccess(true);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        openSnackbar(mappedMessages[error.code] || t("admin#signup_failed"));
      });
  };

  useEffect(() => {
    if (auth.currentUser && !auth.currentUser.emailVerified) {
      openSnackbar(t("admin#signup_checkYourEmail"));
    }
  }, [t, openSnackbar]);

  if (loading) return <Loader />;
  if (success) return <SuccessfulSignUp />;

  return (
    <Layout bg={SignUpBg} style={{ justifyContent: "space-between" }}>
      <TitleComponent title="Novo registo" pageId="signup" />

      <MainContainer>
        <FormContainer>
          <HeadlineContainer>
            <Typography variant="h3">{t("admin#signup_title")}</Typography>
          </HeadlineContainer>

          <Form onSubmit={handleSubmit}>
            <TextField
              label={t("admin#signup_nameLabel")}
              name="defaultQueueName"
              onChange={e => handleChange(e)}
              helperText="ex: Farmácia Rita Falcão"
              inputProps={{ maxLength: 30 }}
              {...inputProps}
            />

            <TextField
              label={t("admin#signup_emailLabel")}
              name="email"
              onChange={e => handleChange(e)}
              {...inputProps}
            />

            <PasswordInput
              label={t("admin#signup_passwordLabel")}
              name="password"
              onChange={e => handleChange(e)}
              min="6"
              {...inputProps}
            />

            <ButtonsContainer className="buttons-wrapper">
              <Button
                type="submit"
                forward
                style={{ backgroundColor: "unset" }}
              >
                {t("admin#signup_register")}
              </Button>
              <Button
                variant="secondary"
                forward
                href={ADMIN_LOGIN_PATH}
                style={{ backgroundColor: "unset" }}
              >
                {t("admin#intro_login")}
              </Button>
            </ButtonsContainer>
          </Form>
        </FormContainer>

        {isDesktop && <Store className="store-illustration" />}
      </MainContainer>

      {isDesktop && <Footer />}
    </Layout>
  );
}

export default SignUp;
