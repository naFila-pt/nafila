import React from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Layout from "../../../components/AdminLayout";
import Button from "../../../components/Button";
import SignUpBg from "../../../assets/bg/main.svg";
import { ADMIN_LOGIN_PATH } from "../../../constants/RoutesConstants";

import { ButtonsContainer } from "../common";

import TitleComponent from "../../../components/TitleComponent";

const Container = styled.div`
  padding: 20vh 20px 0;
`;

const typographyStyles = {
  MAIN: {
    fontSize: "1.8em",
    fontWeight: 900
  },
  SECONDARY: {
    fontSize: "1.3em"
  }
};

function SuccessfulSignUp() {
  const { t } = useTranslation();

  return (
    <Layout bg={SignUpBg}>
      <TitleComponent title="Registado!" />
      <Container>
        <Typography style={typographyStyles.MAIN}>
          {t("admin#signup_successTitle")}
        </Typography>

        <p
          style={typographyStyles.SECONDARY}
          dangerouslySetInnerHTML={{
            __html: t("admin#signup_successHeroText")
          }}
        />

        <ButtonsContainer>
          <Button href={ADMIN_LOGIN_PATH} variant="secondary" backward>
            {t("global#return_button")}
          </Button>
        </ButtonsContainer>
      </Container>
    </Layout>
  );
}

export default SuccessfulSignUp;
