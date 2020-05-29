import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { firestore, functions, analytics } from "../../firebase";
import HomeLayout from "../../components/HomeLayout";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import Link from "@material-ui/core/Link";
import Button from "../../components/Button";
import ConsumerTicket from "../../components/ConsumerTicket";

import bgStore from "../../assets/bg/user_store.svg";
import bgMain from "../../assets/bg/main.svg";

import { ReactComponent as TelephoneNotification } from "../../assets/icons/icon_tlm_big.svg";

import { TICKET_STATUS_PATH } from "../../constants/RoutesConstants";

import TitleComponent from "../../components/TitleComponent";

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
  const [userMobilePhone, setUserMobilePhone] = useState("");
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

  const handlePrevButton = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  useEffect(() => {
    if (ticketsStoreInfo.ticketId) {
      window.location.href =
        TICKET_STATUS_PATH +
        `#${queueId}-${ticketsStoreInfo.ownTicketNumber}-${ticketsStoreInfo.ticketId}`;
    }
  }, [ticketsStoreInfo, queueId]);

  const handleStoreCodeChange = event => {
    setQueueId(event.target.value);
  };

  const handleUserMobilePhoneChange = event => {
    setUserMobilePhone(event.target.value);
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

      analytics.setUserProperties({
        shop: queueData.shop,
        retailerGroup: queueData.retailerGroup,
        shoppingCentre: queueData.shoppingCentre
      });

      setTicketsStoreInfo(prevState => {
        return {
          ...prevState,
          name: queueData.name,
          currentTicket: queueData.currentTicketNumber,
          nextTicketNumber: queueData.ticketTopNumber + 1,
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
        phone: userMobilePhone
      });
      const queueData = queueInfo.data;

      //new ticket
      analytics.logEvent("ticket");
      analytics.logEvent("ticket_by_email");

      setTicketsStoreInfo(prevState => {
        return {
          ...prevState,
          ticketId: queueData.ticketId,
          ownTicketNumber: queueData.ticket.number,
          currentTicket: queueData.queue.currentTicketNumber,
          remainingInQueue: queueData.queue.remainingTicketsInQueue - 1 // remove current user
        };
      });
    } catch (e) {
      setLoading(false);
      openSnackbar(e.message || `Error: ${e}`);
    }
  };

  return (
    <HomeLayout bg={[bgStore, bgMain]} activeStep={activeStep}>
      <TitleComponent title="Nova senha" pageId="new_ticket" />
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
          <div style={{ fontSize: "1.25em", paddingBottom: "32px" }}>
            <div>{t("home#queue_store")}</div>
            <Typography variant="h3">{ticketsStoreInfo.name}</Typography>
          </div>
          <ConsumerTicket
            number={ticketsStoreInfo.nextTicketNumber}
            showText={true}
          />
          <div className={classes.bottomButton}>
            <Grid
              container
              justify="space-between"
              style={{ padding: "0 3em 3em" }}
            >
              <Grid item>
                <div style={{ fontSize: "1.25em" }}>
                  {t("home#ticket_currentQueue")}
                </div>
                <div style={{ fontSize: "2.8125em", fontWeight: 900 }}>
                  {loading ? "" : ticketsStoreInfo.currentTicket}
                </div>
              </Grid>
              {!loading && (
                <Grid item>
                  <div style={{ fontSize: "1.25em" }}>
                    {t("home#ticket_length")}
                  </div>
                  <div style={{ fontSize: "2.8125em", fontWeight: 900 }}>
                    {ticketsStoreInfo.remainingInQueue}
                  </div>
                </Grid>
              )}
            </Grid>
            <Button
              forward
              onClick={handleNextButton}
              style={{ paddingBottom: "1.25em" }}
            >
              {t("home#queue_button")}
            </Button>
            <Button variant="gray" backward onClick={handlePrevButton}>
              {t("global#return_button")}
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item className={classes.gridItem} style={{ paddingTop: "1.8em" }}>
          <TelephoneNotification />
          <Typography
            variant="h4"
            style={{ padding: "1em 2em 0" }}
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
            value={userMobilePhone}
            onChange={handleUserMobilePhoneChange}
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
              style={{ paddingBottom: "1.25em" }}
            >
              {t(loading ? "global#wait_please" : "home#notification_button")}
            </Button>
            <Button variant="gray" backward onClick={handlePrevButton}>
              {t("global#return_button")}
            </Button>
          </div>
        </Grid>
      </Grid>
    </HomeLayout>
  );
};

export default withRouter(HomeContent);
