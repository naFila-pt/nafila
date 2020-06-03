import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { firestore, functions, analytics } from "../../firebase";
import HomeLayout from "../../components/HomeLayout";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import Link from "@material-ui/core/Link";
import Button from "../../components/Button";
import ConsumerTicket from "../../components/ConsumerTicket";

import bgStore from "../../assets/bg/user_store.svg";
import bgMain from "../../assets/bg/main.svg";

import TelephoneNotification from "../../assets/icons/icon_tlm_big.svg";
import StoreIlust from "../../assets/images/ilustracao.svg";

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
    textAlign: "center",
    fontSize: "16px"
  },
  inputUnderline: {
    "&:after": {
      borderBottomColor: "#4C0788"
    }
  }
});

const HomeContent = ({ openSnackbar }) => {
  const urlParam = window.location.search.substr(1);
  const initialActiveStep = urlParam === "skipIntro" ? 2 : 1; // 1 because title component should be ignored in homelayout.
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
        shop: queueData.owner_id,
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
    <HomeLayout
      forceLogoDisplay
      bg={[bgStore, bgMain, bgMain, bgMain]}
      activeStep={activeStep}
    >
      <TitleComponent title="Nova senha" pageId="new_ticket" />
      <Grid
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        justify="space-evenly"
        style={{ minHeight: "90%" }}
      >
        <p
          style={{
            fontWeight: "800",
            fontSize: "32px",
            lineHeight: "38px",
            textAlign: "center",
            padding: "0 20px"
          }}
        >
          {t("home#insertCode_title")}
        </p>
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
        <div style={{ width: "238px", marginTop: "10px" }}>
          <img src={StoreIlust} width="100%" alt="store ilustration"></img>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Button
            forward
            onClick={handleGetStoreInfo}
            dangerouslySetInnerHTML={{ __html: t("home#insertCode_button") }}
          />
        </div>
      </Grid>
      <Grid
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        justify="space-evenly"
        style={{ height: "90%" }}
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
            {t("home#queue_store")}
          </p>
          <p
            style={{
              margin: "10px 0",
              fontSize: "32px",
              lineHeight: "38px",
              fontWeight: "900"
            }}
          >
            {ticketsStoreInfo.name}
          </p>
        </div>
        <ConsumerTicket number={ticketsStoreInfo.nextTicketNumber} showText />
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
              {loading ? "" : ticketsStoreInfo.currentTicket}
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
            <div
              style={{
                fontSize: "45px",
                lineHeight: "54px",
                letterSpacing: "0.15px",
                fontWeight: "900"
              }}
            >
              {ticketsStoreInfo.remainingInQueue}
            </div>
          </Grid>
        </Grid>
        <Grid container direction="column" style={{ textAlign: "center" }}>
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
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        justify="space-evenly"
        style={{ height: "90%" }}
      >
        <div style={{ width: "125px" }}>
          <img src={TelephoneNotification} alt="telephone" width="100%" />
        </div>
        <p
          style={{
            fontSize: "22px",
            lineHeight: "26px",
            textAlign: "center",
            margin: 0,
            padding: "0 2em"
          }}
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
        <div
          style={{ marginTop: "1.75em", textAlign: "center", padding: "0 2em" }}
        >
          <span
            dangerouslySetInnerHTML={{
              __html: t("home#notification_terms")
            }}
          />
          <Link
            style={{ color: "#4C0788", textDecoration: "underline" }}
            onClick={handleTermsOnClick}
          >
            {t("home#notification_termsLink")}
          </Link>
        </div>
        <Grid container direction="column" style={{ textAlign: "center" }}>
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
        </Grid>
      </Grid>
    </HomeLayout>
  );
};

export default withRouter(HomeContent);
