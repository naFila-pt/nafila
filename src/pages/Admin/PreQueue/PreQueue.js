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

import TitleComponent from "../../../components/TitleComponent";

function PreQueue() {
  const { t } = useTranslation();

  return (
    <Layout bg={Bg}>
      <TitleComponent title="As suas filas" pageId="operator_queues" />
      <HeadlineContainer>
        <Typography variant="h3">{t("admin#preQueue_whatToDo")}</Typography>
      </HeadlineContainer>

      <ButtonsContainer>
        <div>
          <Button
            variant="secondary"
            href={ADMIN_QUEUE_MANAGEMENT_PATH}
            forward
          >
            {t("admin#preQueue_goToExistingQueue")}
          </Button>
        </div>

        <div>
          <Button href={ADMIN_END_QUEUE_PATH}>
            {t("admin#preQueue_endExistingQueue")}
          </Button>
        </div>
      </ButtonsContainer>
    </Layout>
  );
}

export default PreQueue;
