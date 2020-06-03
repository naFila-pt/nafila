import React from "react";
import { useTranslation } from "react-i18next";
import Grid from "@material-ui/core/Grid";

import Ticket from "../../assets/icons/ticket.svg";

const ConsumerTicket = ({ number, showText = true }) => {
  const { t } = useTranslation();

  return (
    <Grid item style={{ position: "relative", width: "151px" }}>
      <img src={Ticket} alt="ticket" width="100%" />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate3d(-50%,-50%,0)",
          color: "#fff",
          textAlign: "center",
          width: "100%"
        }}
      >
        <div style={{ fontSize: "2.5em", fontWeight: 900 }}>{number}</div>
        {showText && (
          <div style={{ fontSize: "1.375em" }}>{t("home#ticket_turn")}</div>
        )}
      </div>
    </Grid>
  );
};

export default ConsumerTicket;
