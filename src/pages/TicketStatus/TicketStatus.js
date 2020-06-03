import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { firestore } from "../../firebase";
import HomeLayout from "../../components/HomeLayout";
import Grid from "@material-ui/core/Grid";
import Button from "../../components/Button";
import ConsumerTicket from "../../components/ConsumerTicket";
import bgMain from "../../assets/bg/main.svg";

import TitleComponent from "../../components/TitleComponent";

import { analytics } from "../../firebase";

const TicketStatus = ({ openSnackbar }) => {
  const [queue, setQueue] = useState();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [ticketPassed, setTicketPassed] = useState(true);

  const urlParam = window.location.hash.substr(1);

  let [queueId, ticketNumber, ticketId] = urlParam.split("-");

  queueId = (queueId || "").toUpperCase();

  ticketNumber = parseInt(ticketNumber);

  const { t } = useTranslation();

  const leaveQueue = e => {
    e.preventDefault();
    window.location.href = `/sair/${queueId}/${ticketId}`;
  };
  const fakeUpdate = e => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
    }, 1000);
  };

  useEffect(() => {
    //FIXME: this piece of code avoids analyticsServerEvents to be processed over and over
    //on every onSnapshot() callback.
    //Could probably be improved in the future--
    let queuesDocumentSnapshotListener = firestore
      .collection("queues")
      .doc(queueId)
      .onSnapshot(snapshot => {
        let queueData = snapshot.data();
        analytics.setUserProperties({
          shop: queueData.owner_id,
          retailerGroup: queueData.retailerGroup,
          shoppingCentre: queueData.shoppingCentre
        });
        setQueue(queueData);
      });

    return () => {
      queuesDocumentSnapshotListener();
    };
  }, [queueId]);

  useEffect(() => {
    if (queue) {
      setLoading(false);
      setTicketPassed(ticketNumber <= queue.currentTicketNumber);
    }
  }, [queue, ticketNumber]);

  return (
    <HomeLayout bg={[bgMain]} forceLogoDisplay>
      <TitleComponent title="Estado de senha" pageId="ticket_status" />
      <Grid
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        justify="space-evenly"
        style={{ minHeight: "90%" }}
      >
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "20px",
              lineHeight: "24px",
              fontWeight: "500",
              margin: 0,
              letterSpacing: "0.15px"
            }}
          >
            {t("home#ticket_store")}
          </p>
          <p
            style={{
              margin: "10px 0",
              fontSize: "32px",
              lineHeight: "38px",
              fontWeight: "900"
            }}
          >
            {loading ? "" : queue.name}
          </p>
        </div>
        <ConsumerTicket number={ticketNumber} showText />
        <Grid container justify="center" style={{ textAlign: "center" }}>
          <Grid container direction="column" xs="6">
            <div
              style={{
                fontSize: "20px",
                lineHeight: "24px",
                letterSpacing: "0.15px"
              }}
            >
              {t("home#ticket_currentQueue")}
            </div>
            <div
              style={{
                fontSize: "45px",
                lineHeight: "54px",
                letterSpacing: "0.15px",
                fontWeight: "900"
              }}
            >
              {loading ? "" : queue.currentTicketNumber}
            </div>
          </Grid>
          <Grid container direction="column" xs="6">
            <div
              style={{
                fontSize: "20px",
                lineHeight: "24px",
                letterSpacing: "0.15px",
                fontWeight: "500"
              }}
            >
              {t("home#ticket_length")}
            </div>

            {!loading && !ticketPassed ? (
              <div
                style={{
                  fontSize: "45px",
                  lineHeight: "54px",
                  letterSpacing: "0.15px",
                  fontWeight: "900"
                }}
              >
                {ticketNumber - queue.currentTicketNumber}
              </div>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
        <p
          style={{
            fontSize: "20px",
            padding: "0 2em",
            textAlign: "center",
            margin: 0
          }}
        >
          {t("home#ticket_notification")}
        </p>
        <Grid container direction="column" style={{ textAlign: "center" }}>
          <Button
            onClick={fakeUpdate}
            disabled={loading}
            variant={loading || updating ? "inactive" : ""}
            refresh
            style={{ padding: "1.25em 0" }}
          >
            {t(loading ? "global#wait_please" : "home#atualizar")}
          </Button>
          {!ticketPassed && (
            <Button
              onClick={leaveQueue}
              disabled={loading || ticketPassed}
              variant={"gray"}
              forward
            >
              {t(loading ? "global#wait_please" : "home#sair_da_fila")}
            </Button>
          )}
        </Grid>
      </Grid>
    </HomeLayout>
  );
};

export default withRouter(TicketStatus);
