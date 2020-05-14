import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { firestore } from "../../firebase";
import HomeLayout from "../../components/HomeLayout";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "../../components/Button";
import ConsumerTicket from "../../components/ConsumerTicket";
import bgMain from "../../assets/bg/main.svg";

const useStyles = makeStyles({
  gridContainer: {
    alignContent: "center",
    marginTop: "-1em"
  },
  gridItemIntro: {
    textAlign: "center",
    marginTop: "-2.5em"
  },
  gridItem: {
    textAlign: "center",
    paddingTop: "1.8em"
  },
  bottomButton: {
    position: "absolute",
    left: 0,
    bottom: "14vh",
    width: "100%",
    textAlign: "center"
  },
  inputRoot: {
    width: "calc(100% - 4em)",
    textAlign: "center",
    fontWeight: 900,
    margin: "0 2em"
  },
  inputElement: {
    textAlign: "center"
  },
  inputUnderline: {
    "&:after": {
      borderBottomColor: "#4C0788"
    }
  }
});

const TicketStatus = ({ openSnackbar }) => {
  const [queue, setQueue] = useState();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const urlParam = window.location.hash.substr(1);

  let [queueId, ticketNumber, ticketId] = urlParam.split("-");
  ticketNumber = parseInt(ticketNumber);
  const classes = useStyles();
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
        setQueue(snapshot.data());
      });

    return () => {
      queuesDocumentSnapshotListener();
    };
  }, [queueId]);

  useEffect(() => {
    if (queue) setLoading(false);
  }, [queue]);

  return (
    <HomeLayout bg={[bgMain]} forceLogoDisplay>
      <Grid container direction="column">
        <Grid item className={classes.gridItem} style={{ paddingTop: ".8em" }}>
          <div style={{ fontSize: "1.25em" }}>
            <div>{t("home#ticket_store")}</div>
            <Typography variant="h3">{loading ? "" : queue.name}</Typography>
          </div>
          <Grid
            container
            style={{ justifyContent: "center", marginTop: "1.25em" }}
          >
            <ConsumerTicket number={ticketNumber} />
          </Grid>
          <Grid container justify="space-between" style={{ padding: "0 3em" }}>
            <Grid item>
              <div style={{ fontSize: "1.25em" }}>
                {t("home#ticket_currentQueue")}
              </div>
              <div style={{ fontSize: "2.8125em", fontWeight: 900 }}>
                {loading ? "" : queue.currentTicketNumber}
              </div>
            </Grid>
            {!loading && ticketNumber > queue.currentTicketNumber ? (
              <Grid item>
                <div style={{ fontSize: "1.25em" }}>
                  {t("home#ticket_length")}
                </div>
                <div style={{ fontSize: "2.8125em", fontWeight: 900 }}>
                  {ticketNumber - queue.currentTicketNumber}
                </div>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
          <p
            style={{ fontSize: "1.375em", padding: "0 2em", marginTop: ".5em" }}
          >
            {t("home#ticket_notification")}
          </p>
        </Grid>
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={fakeUpdate}
            disabled={loading}
            variant={loading || updating ? "inactive" : ""}
          >
            {t(loading ? "global#wait_please" : "home#atualizar")}
          </Button>
        </div>
        <div
          style={{ textAlign: "center", marginTop: "1em", marginBottom: "2em" }}
        >
          <Button
            onClick={leaveQueue}
            disabled={loading}
            variant={"gray"}
            style
          >
            {t(loading ? "global#wait_please" : "home#sair_da_fila")}
          </Button>
        </div>
      </Grid>
    </HomeLayout>
  );
};

export default withRouter(TicketStatus);
