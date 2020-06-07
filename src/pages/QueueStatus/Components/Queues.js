import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { firestore } from "../../../firebase";
import Swiper from "swiper";
import "./swiper.css";

const QueuesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => (props.isDesktop ? "50%" : "100%")};
  height: ${props => !props.isDesktop && "100%"};
  margin-top: ${props => !props.isDesktop && "-60px"};
  padding: ${props => props.isDesktop && "40px 0"};
`;

const QueueWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  & .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: ${props => (props.isDesktop ? "100px" : "35px")};
    height: ${props => (props.isDesktop ? "100px" : "35px")};
    background-color: #4c0788;
    }
    & p {
      font-size: ${props => (props.isDesktop ? "33px" : "12px")};
      font-weight: 900;
      color: white;
      margin: 0;
    }
  }
  & .circle-blink {
    @keyframes blink {
      50% {
        background-color: #ffc836;
        & p {
          color: #4c0788;
        }
      }
    }
    @-webkit-keyframes blink {
      50% {
        background-color: #ffc836;
        & p {
          color: #4c0788;
        }
      }
    }
    animation-duration: 600ms;
    animation-name: "blink";
    animation-direction: normal;
    -webkit-animation: blink 600ms;
  }
  & .name {
    display: flex;
    margin-left: -30px;
    padding-left: 45px;
    padding-right: 30px;
    align-items: center;
    line-height: 1.2;
    width: 60%;
    height: ${props => (props.isDesktop ? "90px" : "35px")};
    background-color: #e8e8e8;
    z-index: -1;
    border-radius:${props => !props.isDesktop && "40px"};
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    & p {
      font-size: ${props => (props.isDesktop ? "3vh" : "10px")} ;
      font-weight: 900;
      color: #4c0788;
      margin: 0;
      word-break: break-all;
    }
  }
`;

const GridArea = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  grid-template-rows: ${props =>
    props.isDesktop
      ? "repeat(auto-fill, minmax(140px, 1fr))"
      : "repeat(auto-fill, minmax(70px, 1fr))"};
  column-gap: 10px;
`;

const BigLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  border-radius: 55px;
  max-width: 500px;
  width:  ${props => (props.isDesktop ? "100%" : "90%")};
  height: ${props => (props.isDesktop ? "100px" : "60px")} ;
  padding:1rem;
  margin-bottom: 100px;
  background-color: #e4e4e4;
  & p {
  font-size:${props => (props.isDesktop ? "50px" : "20px")};
      margin 0;
      font-weight: 900;
  }
`;

const BigCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
width: ${props => (props.isDesktop ? "320px" : "100px")};
height: ${props => (props.isDesktop ? "320px" : "100px")};
  border-radius: 100%;
  background-color: #ffc836;
  & p {
    color: white;
  font-size: ${props => (props.isDesktop ? "95px" : "35px")};
    font-weight: 900;
    margin 0;
}
`;

const handleClassUpdate = (queueId, updatedQueue, setUpdatedQueue) => {
  setTimeout(() => {
    setUpdatedQueue("");
  }, 610);
  // eslint-disable-next-line
    return updatedQueue == queueId ? "circle circle-blink" : "circle";
};
const getChunks = (arr, chunkSize) => {
  var c = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize)
    c.push(arr.slice(i, i + chunkSize));
  return c;
};

const renderQueues = (
  isDesktop,
  requestQueues,
  queuesData,
  updatedQueue,
  setUpdatedQueue
) => {
  console.log("setUpdatedQueue", setUpdatedQueue);
  if (requestQueues) {
    if (Object.keys(queuesData).length === 1) {
      const queueKey = Object.keys(queuesData)[0];
      return (
        <>
          <BigCircle>
            <p>{queuesData[queueKey].currentTicketNumber}</p>
          </BigCircle>
          <BigLabel>
            <p>{queuesData[queueKey].name}</p>
          </BigLabel>
        </>
      );
    } else if (Object.keys(queuesData).length) {
      const chuncksSize = isDesktop ? 12 : 8;
      const chunks = getChunks(Object.keys(queuesData), chuncksSize);
      return (
        <div class="swiper-container">
          <div class="swiper-wrapper">
            {chunks.map(c => (
              <div class="swiper-slide">
                <GridArea isDesktop={isDesktop}>
                  {c.map(key => (
                    <QueueWrapper isDesktop={isDesktop}>
                      <div
                        className={handleClassUpdate(
                          queuesData[key].owner_id,
                          updatedQueue,
                          setUpdatedQueue
                        )}
                      >
                        <p>{queuesData[key].currentTicketNumber}</p>
                      </div>
                      <div className="name">
                        <p>{queuesData[key].name}</p>
                      </div>
                    </QueueWrapper>
                  ))}
                </GridArea>
              </div>
            ))}
          </div>
          <div class="swiper-pagination"></div>
        </div>
      );
    }
  }
};

export const Queues = ({ isDesktop }) => {
  const [updatedQueue, setUpdatedQueue] = useState("");
  const [queuesData, setQueuesData] = useState({});
  const [requestQueues, setRequest] = useState(false);

  useEffect(() => {
    if (!requestQueues) {
      setUpdatedQueue("");
      const urlParams = new URLSearchParams(window.location.search);
      const userParams = urlParams.get("users");
      const users = userParams.split(",");
      const chunks = getChunks(users, 10);
      chunks.forEach((c, i) => {
        firestore
          .collection("queues")
          .where("owner_id", "in", c)
          .onSnapshot(snapshot => {
            let queueDocs = snapshot.docs;
            queueDocs.forEach(qd => {
              queuesData[qd.ref.id] = qd.data();
            });
            // const updated
            const queuesClone = Object.assign({}, queuesData);
            setQueuesData(queuesClone);
            if (i === chunks.length - 1) setRequest(true);

            //Check for updates
            snapshot.docChanges().forEach(function (change) {
              if (change.type === "modified") {
                setUpdatedQueue(change.doc.data().owner_id);
              }
            });
          });
      });
    }
  }, [queuesData, requestQueues]);

  new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination"
    },
    autoplay: {
      delay: 7500,
      disableOnInteraction: false
    }
  });

  return (
    <QueuesWrapper isDesktop={isDesktop}>
      {renderQueues(
        isDesktop,
        requestQueues,
        queuesData,
        updatedQueue,
        setUpdatedQueue
      )}
    </QueuesWrapper>
  );
};
