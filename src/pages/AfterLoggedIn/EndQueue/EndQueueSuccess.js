import React from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import Button from "../../../components/Button";
import Bg from "../../../assets/bg/store_queue_end.svg";
import Layout from "../Layout";
import { PRIMARY_COLOR } from "../../../constants/ColorConstants";
import { ADMIN_QUEUE_MANAGEMENT_PATH } from "../../../constants/RoutesConstants";
import Logo from "../../../assets/logo.svg";

import * as S from "./style";

const typographyStyles = {
  TITLE: {
    color: PRIMARY_COLOR,
    fontWeight: 900,
    fontSize: "2rem"
  }
};

function EndQueueSuccess() {
  const { t } = useTranslation();

  return (
    <Layout bg={Bg}>
      <Typography variant="h3" style={typographyStyles.TITLE}>
        {t("main#endQueueSuccess_title")}
      </Typography>

      <p
        style={typographyStyles.SECONDARY}
        dangerouslySetInnerHTML={{
          __html: t("main#endQueueSuccess_text")
        }}
      />

      <S.LogoContainer>
        <img src={Logo} alt="nafila logo" />
      </S.LogoContainer>

      <Button
        variant="gray"
        href={ADMIN_QUEUE_MANAGEMENT_PATH}
        style={{ marginTop: 30 }}
        backward
      >
        {t("main#endQueueSuccess_back")}
      </Button>
    </Layout>
  );
}

export default EndQueueSuccess;
