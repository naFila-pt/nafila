import React, { useState } from "react";
import { Typography, TextField } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../Layout";
import { PRIMARY_COLOR } from "../../../constants/ColorConstants";
import * as S from "./style";
import AddConsumerSuccess from "./AddConsumerSuccess";
import { functions } from "../../../firebase";

const typographyStyles = {
  TITLE: {
    color: PRIMARY_COLOR,
    fontWeight: 900,
    fontSize: "2rem"
  }
};

const inputProps = {
  fullWidth: true,
  required: true
};
const ButtonsContainer = styled.div`
  position: absolute;
  bottom: 30px;
  width: 100%;
  left: 0;

  .MuiButtonBase-root {
    margin-bottom: 20px;
  }
`;

function AddConsumerName({ user, returnFunction }) {
  const { t } = useTranslation();
  const [name, setName] = useState();
  const [requesting, setRequesting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticket, setTicket] = useState();

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
      <S.Form onSubmit={generateTicket}>
        <Typography variant="h3" style={typographyStyles.TITLE}>
          {t("main#addConsumerName_title")}
        </Typography>

        <TextField
          label={t("main#addConsumerName_placeholder")}
          name="name"
          onChange={e => setName(e.target.value)}
          style={{ marginTop: "15vh" }}
          {...inputProps}
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

export default AddConsumerName;
