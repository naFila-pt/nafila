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

const titleStyle = {
  fontWeight: 900,
  marginTop: "10vh"
};
const buttonsContainerStyle = {
  marginTop: "55vh"
};
const buttonStyle = {
  marginTop: 20
};

function PreQueue() {
  const { t } = useTranslation();

  return (
    <Layout bg={Bg}>
      <Typography variant="h3" style={titleStyle}>
        {t("admin#preQueue_whatToDo")}
      </Typography>

      <div style={buttonsContainerStyle}>
        <Button
          variant="secondary"
          href={ADMIN_QUEUE_MANAGEMENT_PATH}
          style={buttonStyle}
          forward
        >
          {t("admin#preQueue_goToExistingQueue")}
        </Button>

        <Button href={ADMIN_END_QUEUE_PATH} style={buttonStyle}>
          {t("admin#preQueue_endExistingQueue")}
        </Button>
      </div>
    </Layout>
  );
}

export default PreQueue;
