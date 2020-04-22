import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { firestore, functions } from "../../firebase";
import HomeLayout from "../../components/HomeLayout";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Link from "@material-ui/core/Link";
import Button from "../../components/Button";
import ConsumerTicket from "../../components/ConsumerTicket";

//import bgIntro from "../../assets/bg/user_intro.svg";
import bgStore from "../../assets/bg/user_store.svg";
import bgMain from "../../assets/bg/main.svg";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as EmailNotification } from "../../assets/icons/email_notification.svg";

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

const HomeContent = ({ openSnackbar }) => {
  const urlParam = window.location.search.substr(1);
  const initialActiveStep = urlParam === "skipIntro" ? 1 : 0;
  const classes = useStyles();
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const [queueId, setQueueId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [ticketsStoreInfo, setTicketsStoreInfo] = useState({
    name: null,
    currentTicket: null,
    remainingInQueue: null,
    ownTicketNumber: null
  });

  const handleNextButton = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleStoreCodeChange = event => {
    setQueueId(event.target.value);
  };

  const handleUserEmailChange = event => {
    setUserEmail(event.target.value);
  };

  const handleTermsOnClick = e => {
    e.preventDefault();
    window.open("/termos-condicoes", "_blank");
  };

  const handleGetStoreInfo = async () => {
    if (!queueId) {
      openSnackbar(`Por favor insira o código da fila`);
      return;
    }

    try {
      const queue = await firestore
        .collection("queues")
        .doc(queueId.toUpperCase())
        .get();

      if (!queue.exists) {
        openSnackbar(
          `Não foi encontrada nenhuma fila com o código "${queueId}"`
        );
        return;
      }

      const queueData = queue.data();

      setTicketsStoreInfo(prevState => {
        return {
          ...prevState,
          name: queueData.name,
          remainingInQueue: queueData.remainingTicketsInQueue
        };
      });

      handleNextButton();
    } catch (e) {
      openSnackbar(e.message || `Error: ${e}`);
    }
  };

  const handleAddToQueue = async () => {
    setLoading(true);

    try {
      const addMeToQueue = functions.httpsCallable("addMeToQueue");

      const queueInfo = await addMeToQueue({
        queueId: queueId.toUpperCase(),
        email: userEmail
      });
      const queueData = queueInfo.data;

      setTicketsStoreInfo(prevState => {
        return {
          ...prevState,
          ownTicketNumber: queueData.ticket.number,
          currentTicket: queueData.queue.currentTicketNumber,
          remainingInQueue: queueData.queue.remainingTicketsInQueue - 1 // remove current user
        };
      });

      handleNextButton();
    } catch (e) {
      setLoading(false);
      openSnackbar(e.message || `Error: ${e}`);
    }
  };

  return (
    <HomeLayout bg={[bgStore, bgMain]} activeStep={activeStep}>
      {/* <Grid container direction="column" className={classes.gridContainer}>
        <div style={{ textAlign: "center" }}>
          <Logo className="logo-icon" />
        </div>
        <Grid item className={classes.gridItemIntro}>
          <Typography
            variant="h1"
            style={{ margin: "0.3em 0 0", fontSize: "2.375em" }}
          >
            {t("home#intro_welcome")}
          </Typography>
          <span
            style={{ fontSize: "24px" }}
            dangerouslySetInnerHTML={{ __html: t("home#intro_pitch") }}
          />
        </Grid>
        <div className={classes.bottomButton}>
          <Button
            forward
            onClick={handleNextButton}
            dangerouslySetInnerHTML={{ __html: t("home#intro_button") }}
          />
        </div>
      </Grid> */}
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography
            variant="h1"
            style={{ marginBottom: "2em", padding: "0 2em" }}
          >
            {t("home#insertCode_title")}
          </Typography>
          <Input
            placeholder={t("home#insertCode_inputPlaceholder")}
            classes={{
              root: classes.inputRoot,
              input: classes.inputElement,
              underline: classes.inputUnderline
            }}
            value={queueId}
            onChange={handleStoreCodeChange}
          />
          <div className={classes.bottomButton}>
            <Button
              forward
              onClick={handleGetStoreInfo}
              dangerouslySetInnerHTML={{ __html: t("home#insertCode_button") }}
            />
          </div>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item className={classes.gridItem}>
          <Logo className="logo-icon logo-icon-queue" />
          <div style={{ fontSize: "1.25em" }}>
            <div>{t("home#queue_store")}</div>
            <Typography variant="h3">{ticketsStoreInfo.name}</Typography>
          </div>
          <div className={classes.bottomButton}>
            <Grid
              container
              style={{
                marginBottom: "2.2em",
                padding: "0 3em",
                justifyContent: "center"
              }}
            >
              <Grid item>
                <div style={{ fontSize: "2em", lineHeight: "1em" }}>
                  {t("home#queue_length")}
                </div>
                <div
                  style={{
                    color: "#401D7F",
                    fontSize: "2.5em",
                    lineHeight: "1em",
                    fontWeight: 900
                  }}
                >
                  {ticketsStoreInfo.remainingInQueue} {t("home#queue_people")}
                </div>
              </Grid>
            </Grid>
            <Button forward onClick={handleNextButton}>
              {t("home#queue_button")}
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item className={classes.gridItem} style={{ paddingTop: ".8em" }}>
          <EmailNotification className="email-icon email-icon-notification" />
          <Typography
            variant="h4"
            style={{ padding: "0 2em" }}
            dangerouslySetInnerHTML={{
              __html: t("home#notification_description")
            }}
          />
          <Input
            placeholder={t("home#notification_inputPlaceholder")}
            classes={{ root: classes.inputRoot, input: classes.inputElement }}
            style={{
              marginTop: "2.5em"
            }}
            value={userEmail}
            onChange={handleUserEmailChange}
          />
          <div className={classes.bottomButton}>
            <div style={{ marginBottom: "1.75em", padding: "0 2em" }}>
              <span
                dangerouslySetInnerHTML={{
                  __html: t("home#notification_terms")
                }}
              />
              {` `}
              <Link
                style={{ color: "#4C0788", textDecoration: "underline" }}
                onClick={handleTermsOnClick}
              >
                {t("home#notification_termsLink")}
              </Link>
            </div>
            <Button
              onClick={handleAddToQueue}
              disabled={loading}
              variant={loading ? "inactive" : ""}
              forward
            >
              {t(loading ? "global#wait_please" : "home#notification_button")}
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item className={classes.gridItem} style={{ paddingTop: ".8em" }}>
          <div style={{ fontSize: "1.25em" }}>
            <div>{t("home#ticket_store")}</div>
            <Typography variant="h3">{ticketsStoreInfo.name}</Typography>
          </div>
          <Grid
            container
            style={{ justifyContent: "center", marginTop: "1.25em" }}
          >
            <ConsumerTicket number={ticketsStoreInfo.ownTicketNumber} />
          </Grid>
          <Grid container justify="space-between" style={{ padding: "0 3em" }}>
            <Grid item>
              <div style={{ fontSize: "1.25em" }}>
                {t("home#ticket_currentQueue")}
              </div>
              <div style={{ fontSize: "2.8125em", fontWeight: 900 }}>
                {ticketsStoreInfo.currentTicket}
              </div>
            </Grid>
            <Grid item>
              <div style={{ fontSize: "1.25em" }}>
                {t("home#ticket_length")}
              </div>
              <div style={{ fontSize: "2.8125em", fontWeight: 900 }}>
                {ticketsStoreInfo.remainingInQueue}
              </div>
            </Grid>
          </Grid>
          <p
            style={{ fontSize: "1.375em", padding: "0 2em", marginTop: ".5em" }}
          >
            {t("home#ticket_notification")}
          </p>
        </Grid>
      </Grid>
    </HomeLayout>
  );
};

export default withRouter(HomeContent);
