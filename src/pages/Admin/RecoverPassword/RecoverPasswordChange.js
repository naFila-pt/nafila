import React, { useState } from "react";

import { Typography, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../Layout";
import { PRIMARY_COLOR, WHITE_COLOR } from "../../../constants/ColorConstants";
import * as S from "./style";
import RecoverPasswordChangeSuccess from "./RecoverPasswordChangeSuccess";

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

const inputProps = {
  fullWidth: true,
  required: true
};

function getQueryVariable(queryString, variableName) {
  var vars = queryString.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] === variableName) {
      return pair[1];
    }
  }
  return "";
}

function RecoverPasswordChange(props) {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangedState, setPasswordChangedState] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const emailString = getQueryVariable(
    props.location.search.substring(1),
    "email"
  );

  const onChangePasswordText = e => {
    setErrorMessage("");
    setPassword(e.target.value);
  };

  const onChangeConfirmPasswordText = e => {
    setErrorMessage("");
    setConfirmPassword(e.target.value);
  };

  const changePasswordButtonClick = () => {
    if (password === confirmPassword) {
      console.log("INSERT CALL TO CHANGE PASSWORD HERE");
      setPasswordChangedState(true);
    } else {
      setErrorMessage(t("admin#recoverPasswordChange_errorMessage"));
    }
  };

  if (passwordChangedState) return <RecoverPasswordChangeSuccess />;

  return (
    <Layout bg={LoginBg}>
      <S.Form>
        <Typography variant="h3" style={typographyStyles.TITLE}>
          {t("admin#recoverPasswordChange_title")}
        </Typography>
        <p
          style={typographyStyles.SECONDARY}
          dangerouslySetInnerHTML={{
            __html: t("admin#recoverPasswordChange_text1") + emailString
          }}
        />
        <TextField
          label={t("admin#recoverPasswordChange_textbox1")}
          name="password"
          onChange={e => onChangePasswordText(e)}
          style={{ marginTop: "25px" }}
          {...inputProps}
        />{" "}
        <TextField
          label={t("admin#recoverPasswordChange_textbox2")}
          name="confirmPassword"
          onChange={e => onChangeConfirmPasswordText(e)}
          style={{ marginTop: "25px" }}
          {...inputProps}
        />
        <Typography variant="h5" style={{ color: "red" }}>
          {errorMessage}
        </Typography>
        <Button style={buttonStyles} onClick={changePasswordButtonClick}>
          {t("admin#recoverPasswordChange_button")}
        </Button>
      </S.Form>
    </Layout>
  );
}

export default RecoverPasswordChange;