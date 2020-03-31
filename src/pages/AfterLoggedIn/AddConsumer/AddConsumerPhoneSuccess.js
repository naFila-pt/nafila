import React from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../Layout";
import { PRIMARY_COLOR } from "../../../constants/ColorConstants";
import { ADMIN_QUEUE_MANAGEMENT_PATH } from "../../../constants/RoutesConstants";
import * as S from "./style";
import { ReactComponent as Logo } from "../../../assets/logo.svg";

const typographyStyles = {
  TITLE: {
    color: PRIMARY_COLOR,
    fontWeight: 900,
    fontSize: "2rem"
  }
};
const Back = styled.div`
  .logo {
    text-transform: lowercase !important;
  }
`;

function AddConsumerPhoneSuccess() {
  const { t } = useTranslation();

  return (
    <Layout bg={LoginBg}>
      <S.Form>
        <Typography variant="h3" style={typographyStyles.TITLE}>
          {t("main#addConsumerSuccess_title")}
        </Typography>
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <Logo />
        </div>
        <p
          style={typographyStyles.SECONDARY}
          dangerouslySetInnerHTML={{
            __html: t("main#addConsumerPhoneSuccess_text")
          }}
        />

        <Button href={ADMIN_QUEUE_MANAGEMENT_PATH} forward>
          <Back
            dangerouslySetInnerHTML={{
              __html: t("main#addConsumerSuccess_button")
            }}
          />
        </Button>
      </S.Form>
    </Layout>
  );
}

export default AddConsumerPhoneSuccess;
