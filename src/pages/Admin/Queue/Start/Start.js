import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Layout from "../../../../components/AdminLayout";
import Button from "../../../../components/Button";
import Bg from "../../../../assets/bg/store_queue_start.svg";
import { auth, functions, analytics } from "../../../../firebase";

import { HeadlineContainer, ButtonsContainer } from "../../common";

import TitleComponent from "../../../../components/TitleComponent";

const StoreName = styled.div`
  margin: 4em 10% 0;

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
  font-size: 1.25em;
  padding: 0 20%;
`;

function Start({ user, setQueue, openSnackbar }) {
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

    createQueue({ name: defaultQueueName, email: auth.currentUser.email })
      .then(({ data: { queueId } }) => {
        analytics.logEvent("queue");
        setQueue(queueId);
      })
      .catch(e => {
        setRequesting(false);
        openSnackbar(e.message);
      });
  };

  return (
    <Layout bg={Bg}>
      <TitleComponent title="Iniciar fila" />
      <HeadlineContainer>
        <Typography variant="h3">
          {t("admin#queueManagement_letsStart")}
        </Typography>
      </HeadlineContainer>

      <StoreName className="start-queue-store">
        <Input
          value={defaultQueueName}
          onChange={handleChange}
          inputProps={{ maxLength: 20 }}
        />
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
