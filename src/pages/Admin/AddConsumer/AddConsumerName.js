import React, { useState } from "react";
import { Typography, Input } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import * as S from "./style";
import AddConsumerSuccess from "./AddConsumerSuccess";
import { functions } from "../../../firebase";

import { HeadlineContainer, ButtonsContainer } from "../common";

function AddConsumerName({ user, returnFunction }) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticket, setTicket] = useState();

  const handleChange = event => {
    setName(event.target.value);
  };

  const generateTicket = e => {
    e.preventDefault();
    setRequesting(true);

    const manuallyAddToQueue = functions.httpsCallable("manuallyAddToQueue");

    manuallyAddToQueue({ queueId: user.queues[0], name })
      .then(async function({ data: { ticket } }) {
        setTicket(ticket);
        setSuccess(true);
      })
      .catch(error => {
        setRequesting(false);
      });
  };

  if (success) return <AddConsumerSuccess ticket={ticket} type="name" />;

  return (
    <Layout bg={LoginBg}>
      <HeadlineContainer>
        <Typography variant="h3">{t("main#addConsumerName_title")}</Typography>
      </HeadlineContainer>

      <S.Form onSubmit={generateTicket}>
        <Input
          placeholder={t("main#addConsumerName_placeholder")}
          value={name}
          onChange={handleChange}
          style={{ marginTop: "15vh" }}
          fullWidth
          required
        />

        <ButtonsContainer>
          <ButtonsContainer>
            <Button
              type="submit"
              disabled={requesting}
              variant={requesting ? "inactive" : ""}
            >
              {t("main#addConsumer_generateTicket")}
            </Button>

            <Button
              variant={requesting ? "inactive" : "gray"}
              onClick={returnFunction}
              backward
            >
              {t("main#addConsumer_back")}
            </Button>
          </ButtonsContainer>
        </ButtonsContainer>
      </S.Form>
    </Layout>
  );
}

export default AddConsumerName;
