import React from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import { ADMIN_QUEUE_MANAGEMENT_PATH } from "../../../constants/RoutesConstants";
import Ticket from "../../../assets/icons/ticket.svg";

import { HeadlineContainer, ButtonsContainer } from "../common";

import TitleComponent from "../../../components/TitleComponent";

const TicketContainer = styled.div`
  width: 150px;
  background: url(${Ticket}) no-repeat center;
  color: #fff;
  height: 250px;
  margin: 10px auto;
  box-sizing: box-border;
  padding-top: 100px;

  h2 {
    font-size: 48px;
    font-weight: 900;
  }
`;

function AddConsumerSuccess({ ticket, type }) {
  const { t } = useTranslation();

  return (
    <Layout bg={LoginBg}>
      <TitleComponent title="Senha manual adicionada" />
      <HeadlineContainer>
        <Typography variant="h3">
          {t("main#addConsumerSuccess_title")}
        </Typography>
      </HeadlineContainer>

      <TicketContainer>
        <Typography variant="h2">
          {String(ticket.number).padStart(3, "0")}
        </Typography>
      </TicketContainer>

      <p
        style={{ fontSize: "1.375em", padding: "0 1em" }}
        dangerouslySetInnerHTML={{
          __html:
            type === "name"
              ? t("main#addConsumerNameSuccess_text")
              : t("main#addConsumerPhoneSuccess_text")
        }}
      />

      <ButtonsContainer>
        <Button
          href={ADMIN_QUEUE_MANAGEMENT_PATH}
          dangerouslySetInnerHTML={{
            __html: t("main#addConsumerSuccess_button")
          }}
          backward
        />
      </ButtonsContainer>
    </Layout>
  );
}

export default AddConsumerSuccess;
