import React, { useState, useEffect } from "react";
import { Typography, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import SignUpBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import {
  PRIMARY_COLOR,
  SECONDARY_COLOR
} from "../../../constants/ColorConstants";
import authentication from "../../../services/authentication";
import { auth } from "../../../firebase";
import { HeadlineContainer, ButtonsContainer } from "../common";

import SuccessfulSignUp from "./SuccessfulSignUp";

const Form = styled.form`
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

function SignUp({ openSnackbar }) {
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
    <Layout bg={SignUpBg}>
      <HeadlineContainer>
        <Typography variant="h3">{t("admin#signup_title")}</Typography>
      </HeadlineContainer>

      <Form onSubmit={handleSubmit}>
        <TextField
          label={t("admin#signup_nameLabel")}
          name="defaultQueueName"
          onChange={e => handleChange(e)}
          helperText="ex: PDoceCartaxo"
          inputProps={{ maxLength: 20 }}
          {...inputProps}
        />

        <TextField
          label={t("admin#signup_emailLabel")}
          name="email"
          onChange={e => handleChange(e)}
          {...inputProps}
        />

        <TextField
          label={t("admin#signup_passwordLabel")}
          type="password"
          name="password"
          onChange={e => handleChange(e)}
          min="6"
          {...inputProps}
        />

        <ButtonsContainer>
          <Button type="submit" forward>
            {t("admin#signup_register")}
          </Button>
        </ButtonsContainer>
      </Form>
    </Layout>
  );
}

export default SignUp;
