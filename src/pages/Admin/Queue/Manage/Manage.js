import React, { useState, useEffect } from "react";
import { Typography, Modal } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Layout from "../../../../components/AdminLayout";
import Loader from "../../../../components/Loader";
import Button from "../../../../components/Button";
import Bg from "../../../../assets/bg/main.svg";
import Ticket from "../../../../assets/icons/ticket.svg";
import { firestore, functions, analytics, auth } from "../../../../firebase";
import {
  ADMIN_ADD_CUSTOMER_PATH,
  ADMIN_END_QUEUE_PATH
} from "../../../../constants/RoutesConstants";

import { ButtonsContainer } from "../../common";

const pageMinHeight = 550;

const ManageQueueContainer = styled.div`
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
  right: ${window.innerWidth <= 320 ? 4 : 10}px;
  top: 38vh;

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

function Manage({ queueId, openSnackbar }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [requestingNext, setRequestingNext] = useState(false);
  const [queue, setQueue] = useState();
  const [showModal, setShowModal] = useState(false);

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
    <Layout
      style={{ position: "relative", minHeight: pageMinHeight + 56 }}
      bg={Bg}
    >
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
      <ManageQueueContainer>
        <div>{t("admin#queueManagement_queueCode")}</div>
        <Typography variant="h3">
          {queue && queue.name} ({queueId})
        </Typography>

        <TicketContainer>
          <div>
            <Typography variant="h2">
              {queue && String(queue.currentTicketNumber).padStart(3, "0")}
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

        {queue && queue.currentTicketName && (
          <>
            <Typography variant="h4" style={{ fontWeight: 600 }}>
              {queue.currentTicketName}
            </Typography>

            <br />
          </>
        )}

        <ButtonsContainer>
          <div>
            <Button
              onClick={() => callNext()}
              variant={requestingNext ? "inactive" : ""}
              disabled={requestingNext}
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
            <Button variant="secondary" href={ADMIN_ADD_CUSTOMER_PATH} forward>
              {t("admin#queueManagement_createTicket")}
            </Button>
          </div>

          <div>
            <Button variant="gray" href={ADMIN_END_QUEUE_PATH}>
              <div
                dangerouslySetInnerHTML={{
                  __html: t("admin#queueManagement_endQueue")
                }}
              />
            </Button>
          </div>
        </ButtonsContainer>
      </ManageQueueContainer>
    </Layout>
  );
}

export default Manage;
