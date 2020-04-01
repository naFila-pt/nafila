import React from "react";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Button from "../../../components/Button";
import LoginBg from "../../../assets/bg/main.svg";
import Layout from "../../../components/AdminLayout";
import { PRIMARY_COLOR } from "../../../constants/ColorConstants";
import { ADMIN_QUEUE_MANAGEMENT_PATH } from "../../../constants/RoutesConstants";
import * as S from "./style";
import Ticket from "../../../assets/icons/ticket.svg";

const typographyStyles = {
  TITLE: {
    color: PRIMARY_COLOR,
    fontWeight: 900,
    fontSize: "2rem"
  }
};
const Back = styled.div`
  .logo {
    text-transform: lowercase !important;
  }
`;
const TicketContainer = styled.div`
  width: 150px;
  background: url(${Ticket}) no-repeat center;
  color: #fff;
  height: 250px;
  margin: 50px auto;
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
      <S.Form>
        <Typography variant="h3" style={typographyStyles.TITLE}>
          {t("main#addConsumerSuccess_title")}
        </Typography>

        <TicketContainer>
          <Typography variant="h2">
            {String(ticket.number).padStart(3, "0")}
          </Typography>
        </TicketContainer>

        <p
          style={typographyStyles.SECONDARY}
          dangerouslySetInnerHTML={{
            __html:
              type === "name"
                ? t("main#addConsumerNameSuccess_text")
                : t("main#addConsumerPhoneSuccess_text")
          }}
        />

        <Button href={ADMIN_QUEUE_MANAGEMENT_PATH} forward>
          <Back
            dangerouslySetInnerHTML={{
              __html: t("main#addConsumerSuccess_button")
            }}
          />
        </Button>
      </S.Form>
    </Layout>
  );
}

export default AddConsumerSuccess;
