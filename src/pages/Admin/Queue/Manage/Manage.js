import React, { useState, useEffect } from "react";
import { Typography, Modal, Grid } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import MaterialButton from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";

import Layout from "../../../../components/AdminLayout";
import Loader from "../../../../components/Loader";
import Button from "../../../../components/Button";
import Footer from "../../../../components/Footer/Footer";
import Bg from "../../../../assets/bg/home_desktop.svg";
import Ticket from "../../../../assets/icons/ticket.svg";
import { firestore, functions, analytics, auth } from "../../../../firebase";
import {
  ADMIN_ADD_CUSTOMER_PATH,
  ADMIN_END_QUEUE_PATH
} from "../../../../constants/RoutesConstants";
import IconGirl from "../../../../assets/icons/rapariga-queue.svg";
import IconGirlTwo from "../../../../assets/icons/rapariga-gravida-queue.svg";

import TitleComponent from "../../../../components/TitleComponent";

import { ButtonsContainer } from "../../common";

const pageMinHeight = 550;

const ManageQueueContainer = styled.div`
  margin-top: 10vh;

  position: relative;

  min-height: ${pageMinHeight}px;

  h3 {
    font-size: 2em;
    font-weight: 900;
  }

  .logo {
    text-transform: lowercase;
  }
`;
const TicketContainer = styled.div`
  width: 9.4em;
  background: url(${Ticket}) no-repeat center / cover;
  color: #fff;
  height: 15.6em;
  margin: 10px auto;
  box-sizing: border-box;
  padding-top: 5em;

  h2 {
    font-size: 3em;
    font-weight: 900;
  }
`;
const TicketsRemaining = styled.div`
  position: absolute;
  left: 5%;
  top: 20%;

  > div {
    font-size: ${window.innerWidth <= 320 ? 18 : 20}px;
  }

  h4 {
    font-weight: 900;
  }

  @media (min-width: 768px) {
    left: 25%;
  }
`;

const Alert = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 25%;
  position: absolute;
  text-align: center;
  left: 50%;
  transform: translate(-50%, 50%);
  min-width: 90%;
  min-height: 150px;
  background-color: #323337;
  color: white;
  border-radius: 8px;
  padding: 0 16px;

  @media (min-width: 768px) {
    min-width: 50%;
  }
`;

const ButtonGroupWrapper = styled.div`
  margin-top: 10vh;

  .MuiButtonWrapper {
    margin-bottom: 20px;
  }
`;

const IconGirlWalking = styled.div`
  align-items: flex-end;
  display: flex;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const IconGirlPregnant = styled.div`
  align-items: flex-start;
  display: flex;
  margin-bottom: 15vh;
  margin-left: 5vh;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
`;

const ButtonCircle = styled(MaterialButton)`
  width: 40px;
  min-width: 40px;
  height: 40px;
  background-color: #ffc836 !important;
  box-shadow: 0px 11px 19px rgba(0, 0, 0, 0.248689);
  border-radius: 50%;
  margin-bottom: 25px;
  margin-top: 25px;
`;

const CounterWrapper = styled.div`
  position: absolute;
  top: 9vh;
  right: 6vh;

  @media (min-width: 768px) {
    top: 6vh;
    right: 30vh;
  }
`;

function Manage({ queueId, openSnackbar }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [requestingNext, setRequestingNext] = useState(false);
  const [queue, setQueue] = useState();
  const [showModal, setShowModal] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const callNext = () => {
    setRequestingNext(true);

    const callNextOnQueue = functions.httpsCallable("callNextOnQueue");

    callNextOnQueue({ queueId })
      .then(function({ data: { queue } }) {
        if (queue.currentTicketName) {
          handleOpenModal();
        }

        analytics.logEvent("ticket_called");
        setQueue(queue);
        setRequestingNext(false);
      })
      .catch(e => {
        setRequestingNext(false);
        openSnackbar(e.message);
      });
  };

  const handleAddCounter = () => {
    //TODO validate max capacity, if it capped, an error message should appear.
    setCounter(prevState => prevState + 1);
  };

  const handleRemoveCounter = () => {
    if (counter > 0) {
      setCounter(prevState => prevState - 1);
    }
  };

  const ImagesWrapper = styled(Grid)`
    display: none;

    @media (min-width: 768px) {
      display: flex;
      align-items: flex-end;
    }
  `;

  const FooterWrapper = styled.div`
    display: none;

    @media (min-width: 768px) {
      display: flex;
    }
  `;

  useEffect(() => {
    //FIXME: this piece of code avoids analyticsServerEvents to be processed over and over
    //on every onSnapshot() callback.
    //Could probably be improved in the future--
    let queuesDocumentSnapshotListener;
    const userDocumentReference = firestore
      .collection("users")
      .doc(auth.currentUser.uid);

    userDocumentReference.get().then(userDoc => {
      let userData = userDoc.data();

      let currentAnalyticsIndex =
        (!!userData.analyticsServerEventsIndexes &&
          userData.analyticsServerEventsIndexes[queueId]) ||
        0;

      queuesDocumentSnapshotListener = firestore
        .collection("queues")
        .doc(queueId)
        .onSnapshot(snapshot => {
          const data = snapshot.data();

          if (
            data &&
            data.analyticsServerEvents &&
            data.analyticsServerEvents.length >= currentAnalyticsIndex
          ) {
            //log server (smsm-routine) events into google analytics
            data.analyticsServerEvents
              .slice(currentAnalyticsIndex)
              .forEach(ev => {
                analytics.logEvent(ev);
              });

            //store analyticsServerEventsIndexes update
            currentAnalyticsIndex = data.analyticsServerEvents.length + 1;
            let key = `analyticsServerEventsIndexes.${queueId}`;
            let updateData = {};
            updateData[key] = currentAnalyticsIndex;
            userDocumentReference.update(updateData);
          }

          setQueue(data);
        });
    });

    return () => {
      queuesDocumentSnapshotListener();
    };
  }, [queueId]);

  useEffect(() => {
    if (queue) setLoading(false);
  }, [queue]);

  if (loading) return <Loader />;

  return (
    <>
      <Layout
        style={{ position: "relative", minHeight: pageMinHeight + 56 }}
        bg={Bg}
      >
        <TitleComponent title="Gerir fila" pageId="manage_queue" />
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          aria-labelledby={t("admin#queueManagement_call")}
          aria-describedby={t("admin#queueManagement_callByName")}
        >
          {
            <Alert>
              <CloseIcon
                style={{
                  position: "absolute",
                  right: "8px",
                  top: "8px",
                  color: "white",
                  cursor: "pointer"
                }}
                onClick={handleCloseModal}
              />
              <Typography variant="h3">
                {t("admin#queueManagement_callByName")}
              </Typography>
            </Alert>
          }
        </Modal>
        <Grid container>
          <Grid item xs={12} sm={5}>
            <ManageQueueContainer>
              <div>{t("admin#queueManagement_queueCode")}</div>
              <Typography variant="h3">
                {queue && queue.name} ({queueId})
              </Typography>

              <TicketContainer>
                <div>
                  <Typography variant="h2">
                    {queue &&
                      String(queue.currentTicketNumber).padStart(3, "0")}
                  </Typography>
                </div>

                <div>
                  <Typography variant="h5">
                    {t("admin#queueManagement_call")}
                  </Typography>
                </div>
              </TicketContainer>

              <TicketsRemaining>
                <div>{t("admin#queueManagement_remaining")}</div>
                <Typography variant="h4">
                  {queue ? queue.remainingTicketsInQueue : 0}
                </Typography>
              </TicketsRemaining>

              <CounterWrapper>
                <ButtonCircle onClick={handleAddCounter}>
                  <AddIcon />
                </ButtonCircle>
                <Typography variant="h4">{counter}</Typography>
                <ButtonCircle onClick={handleRemoveCounter}>
                  <RemoveIcon />
                </ButtonCircle>
              </CounterWrapper>

              {queue && queue.currentTicketName && (
                <>
                  <Typography variant="h4" style={{ fontWeight: 600 }}>
                    {queue.currentTicketName}
                  </Typography>

                  <br />
                </>
              )}

              <ButtonGroupWrapper>
                <div>
                  <Button
                    onClick={() => callNext()}
                    variant={requestingNext ? "inactive" : ""}
                    disabled={requestingNext}
                    mobile
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: t(
                          requestingNext
                            ? "admin#queueManagement_wait"
                            : "admin#queueManagement_nextInQueue"
                        )
                      }}
                    />
                  </Button>
                </div>

                <div>
                  <Button
                    variant="secondary"
                    href={ADMIN_ADD_CUSTOMER_PATH}
                    forward
                    mobile
                  >
                    {t("admin#queueManagement_createTicket")}
                  </Button>
                </div>

                <div>
                  <Button variant="gray" href={ADMIN_END_QUEUE_PATH} mobile>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: t("admin#queueManagement_endQueue")
                      }}
                    />
                  </Button>
                </div>
              </ButtonGroupWrapper>
            </ManageQueueContainer>
          </Grid>
          <ImagesWrapper item sm={7}>
            <div style={{ display: "flex" }}>
              <IconGirlWalking>
                <img src={IconGirl} width="100%" />
              </IconGirlWalking>
              <IconGirlPregnant>
                <img src={IconGirlTwo} width="100%" />
              </IconGirlPregnant>
            </div>
          </ImagesWrapper>
        </Grid>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Layout>
    </>
  );
}

export default Manage;
