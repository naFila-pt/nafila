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

function AddConsumerPhone({ user, returnFunction, openSnackbar }) {
  const { t } = useTranslation();
  const [phone, setPhone] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticket, setTicket] = useState();

  const handleChange = event => {
    setPhone(event.target.value);
  };

  const generateTicket = e => {
    e.preventDefault();
    setRequesting(true);

    const manuallyAddToQueue = functions.httpsCallable("manuallyAddToQueue");

    manuallyAddToQueue({ queueId: user.queues[0], phone })
      .then(async function({ data: { ticket } }) {
        setTicket(ticket);
        setSuccess(true);
      })
      .catch(error => {
        setRequesting(false);
        openSnackbar(error.message);
      });
  };

  if (success) return <AddConsumerSuccess ticket={ticket} type="phone" />;

  return (
    <Layout bg={LoginBg}>
      <HeadlineContainer>
        <Typography variant="h3">{t("main#addConsumerPhone_title")}</Typography>
      </HeadlineContainer>

      <S.Form onSubmit={generateTicket}>
        <Input
          placeholder={t("main#addConsumerPhone_placeholder")}
          value={phone}
          onChange={handleChange}
          style={{ marginTop: "15vh" }}
          fullWidth
          required
        />

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
      </S.Form>
    </Layout>
  );
}

export default AddConsumerPhone;
