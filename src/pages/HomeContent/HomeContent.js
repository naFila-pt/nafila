import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { firestore, functions } from "../../firebase";
import HomeLayout from "../../components/HomeLayout";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Button from "../../components/Button";

import bgIntro from "../../assets/bg/user_intro.svg";
import bgStore from "../../assets/bg/user_store.svg";
import bgMain from "../../assets/bg/main.svg";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Ticket } from "../../assets/icons/ticket.svg";
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
  }
});

const HomeContent = () => {
  const urlParam = window.location.search.substr(1);
  const initialActiveStep = urlParam === "skipIntro" ? 1 : 0;
  const classes = useStyles();
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState(initialActiveStep);
  const [storeCodeInput, setStoreCodeInput] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const ticketsStoreInfo = Object.seal({
    name: null,
    currentTicket: null,
    remainingInQueue: null,
    ownTicketNumber: null
  });

  const handleNextButton = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleStoreCodeChange = event => {
    setStoreCodeInput(event.target.value);
  };

  const handleUserEmailChange = event => {
    setUserEmail(event.target.value);
  };

  const handleTermsOnClick = e => {
    e.preventDefault();
    window.open("/termos-condicoes", "_blank");
  };

  const handleGetStoreInfo = () => {
    try {
      const queue = firestore
        .collection("queues")
        .doc(storeCodeInput)
        .get()
        .data();

      ticketsStoreInfo.name = queue.name;
      ticketsStoreInfo.currentTicket = 0;
      ticketsStoreInfo.remainingInQueue = queue.remainingTicketsInQueue;

      handleNextButton();
    } catch (e) {
      alert(`Error: ${e}`);
    }
  };

  const handleAddToQueue = async () => {
    try {
      const addMeToQueue = functions.httpsCallable("addMeToQueue");

      const queueInfo = await addMeToQueue({
        queueId: storeCodeInput,
        email: userEmail
      });

      ticketsStoreInfo.remainingInQueue = queueInfo.remainingTicketsInQueue;
      ticketsStoreInfo.ownTicketNumber = queueInfo.ticketNumber;

      handleNextButton();
    } catch (e) {
      alert(`Error: ${e}`);
    }
  };

  return (
    <HomeLayout bg={[bgIntro, bgStore, bgMain]} activeStep={activeStep}>
      <Grid container direction="column" className={classes.gridContainer}>
        <div style={{ textAlign: "center" }}>
          <Logo />
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
      </Grid>
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
            style={{ width: "100%", textAlign: "center", fontWeight: 900 }}
            value={storeCodeInput}
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
          <Logo />
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
          <EmailNotification />
          <Typography
            variant="h4"
            style={{ padding: "0 2em" }}
            dangerouslySetInnerHTML={{
              __html: t("home#notification_description")
            }}
          />
          <Input
            placeholder={t("home#notification_inputPlaceholder")}
            style={{
              width: "100%",
              textAlign: "center",
              fontWeight: 900,
              marginTop: "2.5em"
            }}
            value={userEmail}
            onChange={handleUserEmailChange}
          />
          <div className={classes.bottomButton}>
            <a href="#!" onClick={handleTermsOnClick}>
              <div
                style={{ marginBottom: "1.75em", padding: "0 2em" }}
                dangerouslySetInnerHTML={{
                  __html: t("home#notification_terms")
                }}
              />
            </a>
            <Button forward onClick={handleAddToQueue}>
              {t("home#notification_button")}
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
            <Grid item style={{ position: "relative" }}>
              <Ticket />
              <div
                style={{
                  position: "absolute",
                  top: "6em",
                  left: 0,
                  width: "100%",
                  color: "#fff"
                }}
              >
                <div style={{ fontSize: "2.5em", fontWeight: 900 }}>026</div>
                <div style={{ fontSize: "1.375em" }}>
                  {t("home#ticket_turn")}
                </div>
              </div>
            </Grid>
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
