import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Layout from "../../../../components/AdminLayout";
import Button from "../../../../components/Button";
import Bg from "../../../../assets/bg/store_queue_start.svg";
import { functions } from "../../../../firebase";

import { HeadlineContainer, ButtonsContainer } from "../../common";

const StoreName = styled.div`
  margin: 30% 10% 0;

  h4 {
    font-weight: 700;
    padding: 10px 0;
  }

  .MuiInput-root {
    width: 100%;
  }

  .MuiInput-input {
    text-align: center;
  }

  .queue-label {
    padding: 10px 0;
  }
`;
const EmailWithCode = styled.p`
  margin-top: 30px;
  font-size: 20px;
  padding: 0 20%;
`;

function Start({ user, setQueue }) {
  const [requesting, setRequesting] = useState(false);
  const [defaultQueueName, setDefaultQueueName] = useState(
    user.defaultQueueName
  );
  const { t } = useTranslation();

  const handleChange = event => {
    setDefaultQueueName(event.target.value);
  };

  const startQueue = () => {
    setRequesting(true);
    const createQueue = functions.httpsCallable("createQueue");

    createQueue({ name: defaultQueueName }).then(async function({
      data: { queueId }
    }) {
      setQueue(queueId);
    });
  };

  return (
    <Layout bg={Bg}>
      <HeadlineContainer>
        <Typography variant="h3">
          {t("admin#queueManagement_letsStart")}
        </Typography>
      </HeadlineContainer>

      <StoreName>
        <Input value={defaultQueueName} onChange={handleChange} />
        <div className="queue-label">
          {t("admin#queueManagement_queueName")}
        </div>
      </StoreName>

      <EmailWithCode
        dangerouslySetInnerHTML={{
          __html: t("admin#queueManagement_emailWithCode")
        }}
      />

      <ButtonsContainer>
        <Button
          onClick={() => startQueue()}
          disabled={requesting}
          variant={requesting ? "inactive" : ""}
        >
          {requesting
            ? t("admin#queueManagement_creatingQueue")
            : t("admin#queueManagement_startQueue")}
        </Button>
      </ButtonsContainer>
    </Layout>
  );
}

export default Start;
