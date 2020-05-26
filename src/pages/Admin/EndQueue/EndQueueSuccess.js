import React from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import Button from "../../../components/Button";
import Bg from "../../../assets/bg/store_queue_end.svg";
import Layout from "../../../components/AdminLayout";
import { ADMIN_QUEUE_MANAGEMENT_PATH } from "../../../constants/RoutesConstants";
import Logo from "../../../assets/logo.svg";

import { HeadlineContainer, ButtonsContainer } from "../common";

import TitleComponent from "../../../components/TitleComponent";

function EndQueueSuccess() {
  const { t } = useTranslation();

  return (
    <Layout bg={Bg}>
      <TitleComponent title="Fila encerrada" pageId="close_queue_success" />
      <HeadlineContainer style={{ marginBottom: 0 }}>
        <Typography variant="h3">{t("main#endQueueSuccess_title")}</Typography>
      </HeadlineContainer>

      <p
        style={{ fontSize: "20px" }}
        dangerouslySetInnerHTML={{
          __html: t("main#endQueueSuccess_text")
        }}
      />

      <img src={Logo} alt="nafila logo" />

      <ButtonsContainer>
        <Button
          variant="gray"
          href={ADMIN_QUEUE_MANAGEMENT_PATH}
          style={{ marginTop: 30 }}
          backward
        >
          {t("main#endQueueSuccess_back")}
        </Button>
      </ButtonsContainer>
    </Layout>
  );
}

export default EndQueueSuccess;
