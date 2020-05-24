import React, { useState } from "react";
import { Typography, Input } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import * as S from "./style";
import AddConsumerSuccess from "./AddConsumerSuccess";
import { functions, analytics } from "../../../firebase";

import { HeadlineContainer, ButtonsContainer } from "../common";

function AddConsumerName({ user, returnFunction, openSnackbar }) {
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
      .then(async function ({ data: { ticket } }) {
        analytics.logEvent("ticket");
        analytics.logEvent("ticket_manual");
        analytics.logEvent("ticket_by_name");
        setTicket(ticket);
        setSuccess(true);
      })
      .catch(error => {
        setRequesting(false);
        openSnackbar(error.message);
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
          inputProps={{ maxLength: 20 }}
          fullWidth
          required
        />

        <ButtonsContainer>
          <div>
            <Button
              type="submit"
              disabled={requesting}
              variant={requesting ? "inactive" : ""}
            >
              {t("main#addConsumer_generateTicket")}
            </Button>
          </div>

          <div>
            <Button
              variant={requesting ? "inactiveGray" : "gray"}
              onClick={returnFunction}
              backward
            >
              {t("main#addConsumer_back")}
            </Button>
          </div>
        </ButtonsContainer>
      </S.Form>
    </Layout>
  );
}

export default AddConsumerName;
