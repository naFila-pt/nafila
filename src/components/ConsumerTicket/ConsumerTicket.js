import React from "react";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";

import { ReactComponent as Ticket } from "../../assets/icons/ticket.svg";

const ConsumerTicket = ({ number }) => {
  const { t } = useTranslation();

  return (
    <Grid item style={{ position: "relative" }}>
      <Ticket className="logo-icon logo-icon-consumer" />
      <div
        style={{
          position: "absolute",
          top: "6em",
          left: 0,
          width: "100%",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: "2.5em", fontWeight: 900 }}>{number}</div>
        <div style={{ fontSize: "1.375em" }}>{t("home#ticket_turn")}</div>
      </div>
    </Grid>
  );
};

export default ConsumerTicket;
