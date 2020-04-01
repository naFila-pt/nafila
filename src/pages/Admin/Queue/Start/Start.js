import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Layout from "../../Layout";
import Button from "../../../../components/Button";
import Bg from "../../../../assets/bg/store_queue_start.svg";
import { SECONDARY_COLOR } from "../../../../constants/ColorConstants";
import { functions } from "../../../../firebase";

const StoreName = styled.div`
  margin: 30% 10% 0;

  h4 {
    font-weight: 700;
    padding: 10px 0;
  }

  .queue-label {
    border-top: 1px ${SECONDARY_COLOR} solid;
    padding: 10px 0;
  }
`;
const EmailWithCode = styled.p`
  margin-top: 40px;
  font-size: 20px;
  padding: 0 20%;
`;
const buttonStyle = {
  position: "absolute",
  bottom: 30,
  width: "100%"
};

function Start({ user, setQueue }) {
  const [requesting, setRequesting] = useState(false);
  const { t } = useTranslation();
  const startQueue = () => {
    setRequesting(true);
    const createQueue = functions.httpsCallable("createQueue");

    createQueue({ name: user.defaultQueueName }).then(async function({
      data: { queueId }
    }) {
      setQueue(queueId);
    });
  };

  return (
    <Layout bg={Bg}>
      <Typography variant="h3">
        {t("admin#queueManagement_letsStart")}
      </Typography>

      <StoreName>
        <Typography variant="h4">{user.defaultQueueName}</Typography>
        <div className="queue-label">
          {t("admin#queueManagement_queueName")}
        </div>
      </StoreName>

      <EmailWithCode
        dangerouslySetInnerHTML={{
          __html: t("admin#queueManagement_emailWithCode")
        }}
      />

      <Button
        style={buttonStyle}
        onClick={() => startQueue()}
        disabled={requesting}
        variant={requesting ? "inactive" : ""}
      >
        {requesting
          ? t("admin#queueManagement_creatingQueue")
          : t("admin#queueManagement_startQueue")}
      </Button>
    </Layout>
  );
}

export default Start;
