import React, { useState, useEffect } from "react";
import { Typography, Modal, Grid, Snackbar, Box } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import AddIcon from "@material-ui/icons/Add";
import MaterialButton from "@material-ui/core/Button";
import RemoveIcon from "@material-ui/icons/Remove";
import MuiAlert from "@material-ui/lab/Alert";

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

function AlertWrapper(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

  @media (min-width: 768px) {
    margin-top: 4vh;
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
  > div {
    font-size: ${window.innerWidth <= 320 ? 18 : 20}px;
  }

  h4 {
    font-weight: 900;
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

const ButtonCircleUp = styled(MaterialButton)`
  width: 50px;
  min-width: 45px;
  height: 50px;
  background-color: #ffc836 !important;
  box-shadow: 0px 11px 19px rgba(0, 0, 0, 0.248689);
  border-radius: 50%;
  margin-bottom: 25px;
`;

const ButtonCircleDown = styled(MaterialButton)`
  width: 50px;
  min-width: 45px;
  height: 50px;
  background-color: #ffc836 !important;
  box-shadow: 0px 11px 19px rgba(0, 0, 0, 0.248689);
  border-radius: 50%;
  margin-top: 25px;
`;

const CounterWrapper = styled.div`
  @media (min-width: 768px) {
  }
`;

const TicketWrapper = styled(Grid)`
  justify-content: space-around;

  @media (min-width: 768px) {
    margin: 0 auto;
    width: 60%;
  }
`;

function Manage({ queueId, openSnackbar }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [requestingNext, setRequestingNext] = useState(false);
  const [queue, setQueue] = useState();
  const [showModal, setShowModal] = useState(false);
  const [counter, setCounter] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [isSendingCounter, setSendingCounter] = useState(false);

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
      .then(function ({ data: { queue } }) {
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
    if (counter >= maxCapacity) {
      setAlertOpen(true);
    }
    setCounter(prevState => prevState + 1);
  };

  const handleRemoveCounter = () => {
    if (counter <= 0) {
      return;
    }

    setCounter(prevState => prevState - 1);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  const handleSendingCounter = (action, counter) => {
    if (queue) {
      setSendingCounter(true);
      firestore
        .collection("counters")
        .doc(queue.counterId)
        .update({ current: counter })
        .then(() => {
          setSendingCounter(false);
          action === "add" ? handleAddCounter() : handleRemoveCounter();
        })
        //send alert to user when is not being saved in firestore
        .catch(err => {
          setSendingCounter(false);
          console.error(err);
        });
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

  const RemainingTitle = styled.div`
    @media (max-width: 320px) {
      font-size: 16px !important;
      margin-left: 8px;
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

          //get counter
          firestore
            .collection("counters")
            .doc(data.counterId)
            .get()
            .then(response => {
              const counterData = response.data();
              setMaxCapacity(counterData.maxCapacity);
              setCounter(counterData.current);
            });
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
        <TitleComponent
          title={queue ? `Gerir Fila - ${queue.name}` : "Gerir Fila"}
          pageId="manage_queue"
        />
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
        <Box display="flex" flex="1">
          <Grid item xs={12} sm={5}>
            <ManageQueueContainer>
              <div>{t("admin#queueManagement_queueCode")}</div>
              <Typography variant="h3" style={{ marginBottom: "4vh" }}>
                {queue && queue.name} ({queueId})
              </Typography>

              <TicketWrapper container>
                <Grid
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "15%",
                    justifyContent: "center"
                  }}
                >
                  <TicketsRemaining>
                    <RemainingTitle>
                      {t("admin#queueManagement_remaining")}
                    </RemainingTitle>
                    <Typography variant="h4">
                      {queue ? queue.remainingTicketsInQueue : 0}
                    </Typography>
                  </TicketsRemaining>
                </Grid>

                <Grid>
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
                </Grid>
                <Grid>
                  <CounterWrapper>
                    <ButtonCircleUp
                      disabled={counter === 0 || isSendingCounter}
                      onClick={() =>
                        handleSendingCounter("remove", counter - 1)
                      }
                    >
                      <RemoveIcon />
                    </ButtonCircleUp>

                    <Typography style={{ margin: "40px auto" }} variant="h4">
                      {counter}
                    </Typography>

                    <ButtonCircleDown
                      onClick={() => handleSendingCounter("add", counter + 1)}
                      disabled={isSendingCounter}
                    >
                      <AddIcon />
                    </ButtonCircleDown>
                  </CounterWrapper>
                </Grid>
              </TicketWrapper>

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
                <img src={IconGirl} alt={"bgIconGirl"} width="100%" />
              </IconGirlWalking>
              <IconGirlPregnant>
                <img src={IconGirlTwo} alt={"bgIconGirlTwo"} width="100%" />
              </IconGirlPregnant>
            </div>
          </ImagesWrapper>
        </Box>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
        <Snackbar
          open={isAlertOpen}
          autoHideDuration={6000}
          onClose={handleAlertClose}
        >
          <AlertWrapper onClose={handleAlertClose} severity="warning">
            {t("admin#queueManagement_warning_message")}
          </AlertWrapper>
        </Snackbar>
      </Layout>
    </>
  );
}

export default Manage;
