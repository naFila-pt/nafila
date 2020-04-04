import React from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import Layout from "../../../components/AdminLayout";
import Button from "../../../components/Button";
import Bg from "../../../assets/bg/store_queue_started.svg";
import {
  ADMIN_QUEUE_MANAGEMENT_PATH,
  ADMIN_END_QUEUE_PATH
} from "../../../constants/RoutesConstants";

import { HeadlineContainer, ButtonsContainer } from "../common";

function PreQueue() {
  const { t } = useTranslation();

  return (
    <Layout bg={Bg}>
      <HeadlineContainer>
        <Typography variant="h3">{t("admin#preQueue_whatToDo")}</Typography>
      </HeadlineContainer>

      <ButtonsContainer>
        <Button variant="secondary" href={ADMIN_QUEUE_MANAGEMENT_PATH} forward>
          {t("admin#preQueue_goToExistingQueue")}
        </Button>

        <Button href={ADMIN_END_QUEUE_PATH}>
          {t("admin#preQueue_endExistingQueue")}
        </Button>
      </ButtonsContainer>
    </Layout>
  );
}

export default PreQueue;
