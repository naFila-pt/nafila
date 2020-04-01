import React, { useState, useEffect } from "react";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import Layout from "../../Layout";
import Loader from "../../../../components/Loader";
import Button from "../../../../components/Button";
import Bg from "../../../../assets/bg/main.svg";
import Ticket from "../../../../assets/icons/ticket.svg";
import { firestore, functions } from "../../../../firebase";
import {
  ADMIN_ADD_CUSTOMER_PATH,
  ADMIN_END_QUEUE_PATH
} from "../../../../constants/RoutesConstants";

const ManageQueueContainer = styled.div`
  h3 {
    font-weight: 900;
  }

  .button-container {
    margin-bottom: 20px;
  }

  .logo {
    text-transform: lowercase;
  }
`;
const TicketContainer = styled.div`
  width: 150px;
  background: url(${Ticket}) no-repeat center;
  color: #fff;
  height: 250px;
  margin: 50px auto;
  box-sizing: box-border;
  padding-top: 80px;

  h2 {
    font-size: 48px;
    font-weight: 900;
  }
`;
const TicketsRemaining = styled.div`
  position: absolute;
  right: 20px;
  top: 38vh;

  > div {
    font-size: 14px;
  }

  h4 {
    font-weight: 900;
  }
`;

function Manage({ queueId }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [requestingNext, setRequestingNext] = useState(false);
  const [queue, setQueue] = useState();
  const callNext = () => {
    setRequestingNext(true);
    const callNextOnQueue = functions.httpsCallable("callNextOnQueue");

    callNextOnQueue({ queueId })
      .then(function({ data: { queue, ticket } }) {
        setQueue(queue);
        setRequestingNext(false);
      })
      .catch(e => {
        setRequestingNext(false);
      });
  };

  useEffect(() => {
    firestore
      .collection("queues")
      .doc(queueId)
      .get()
      .then(response => {
        const queue = response.data();

        setQueue(queue);
        setLoading(false);
      });
  }, [queueId]);

  if (loading) return <Loader />;

  return (
    <Layout bg={Bg}>
      <ManageQueueContainer>
        <div>{t("admin#queueManagement_queueCode")}</div>
        <Typography variant="h3">{queueId}</Typography>

        <TicketContainer>
          <div>
            <Typography variant="h2">
              {String(queue?.currentTicketNumber).padStart(3, "0")}
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
          <Typography variant="h4">{queue.remainingTicketsInQueue}</Typography>
        </TicketsRemaining>

        {queue.currentTicketName && queue.currentTicketName.name && (
          <>
            <Typography variant="h4" style={{ fontWeight: 600 }}>
              {queue.currentTicketName}
            </Typography>

            <br />
          </>
        )}

        <div className="button-container">
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

        <div className="button-container">
          <Button variant="secondary" href={ADMIN_ADD_CUSTOMER_PATH} forward>
            {t("admin#queueManagement_createTicket")}
          </Button>
        </div>

        <div className="button-container">
          <Button variant="gray" href={ADMIN_END_QUEUE_PATH}>
            <div
              dangerouslySetInnerHTML={{
                __html: t("admin#queueManagement_endQueue")
              }}
            />
          </Button>
        </div>
      </ManageQueueContainer>
    </Layout>
  );
}

export default Manage;
