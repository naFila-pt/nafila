import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Swiper from "swiper";

import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { firestore } from "../../firebase";
import styled from "styled-components";

import Logo from "../../assets/icons/naFila_logo.svg";
import Footer from "../../assets/icons/footer.svg";
import googleIcon from "../../assets/icons/google-icon.svg";
import NOSIcon from "../../assets/icons/nos-icon.svg";
import Tech4CovidIcon from "../../assets/icons/Logo-Tech4COVID19-white.svg";

import "./swiper.css";
import videoSrc from "../../assets/nafila_onboarding_audiooff.mp4";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;~
  font-size: ${props => props.isDesktop && "12px"};
  & .left-container {
  width: ${props => (props.isDesktop ? "50%" : "100%")};
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  & .left-content-wrapper {
    padding: ${props => (props.isDesktop ? "1rem 0 0 3rem" : "1rem 0 0 0")};
    position: relative;
    height: 100%;
    display: ${props => !props.isDesktop && "flex"};
    flex-direction: ${props => !props.isDesktop && "column"};
  }
`;

const Queues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => (props.isDesktop ? "50%" : "100%")};
  height: ${props => !props.isDesktop && "100%"};
  margin-top: ${props => !props.isDesktop && "-60px"};
  padding: ${props => props.isDesktop && "40px 0"};
`;

const Label = styled.p`
  margin: 2px 0;
  line-height: 1.1;
  font-size: ${props => (props.isDesktop ? "30px" : "12px")};
  & span {
    margin-right: 4px;
  }
`;

const CustomizedFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-content: flex-end;
  flex-direction: ${props => !props.isDesktop && "row-reverse"};
  flex-direction: ${props => props.isDesktop && "flex-end"};
  & .footer-text {
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    left: 20px;

    & .title {
      color: white;
      margin: ${props => props.isDesktop && "0 0 5px 0"};
      font-size: ${props => (props.isDesktop ? "12px" : "9px")};
      font-weight: ${props => props.isDesktop && "bold"};
      text-transform: uppercase;
      margin: ${props => !props.isDesktop && "3px 0"};
      font-weight: ${props => !props.isDesktop && "lighter"};
    }
  }
`;

const Header = styled.div`
  display: flex;
  height: ${props => (props.isDesktop ? "15%" : "8%")};
  align-items: center;
  padding: 10px 0 0 20px;
  width: ${props => props.isDesktop && "100%"};
  margin-bottom: ${props => props.isDesktop && "2px"};
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

function QueueStatus({ isDesktop }) {
  const { t } = useTranslation();
  const [queuesData, setQueuesData] = useState({});
  const [requestQueues, setRequest] = useState(false);
  const [updatedQueue, setUpdatedQueue] = useState("");

  new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination"
    },
    autoplay: {
      delay: 12500,
      disableOnInteraction: false
    }
  });
  const handleClassUpdate = queueId => {
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

  const renderQueues = () => {
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
        const chuncksSize = isDesktop ? 12 : 10;
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
                            queuesData[key].owner_id
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

  const renderInstructionsLabels = () => {
    return (
      <Box
        width="100%"
        ml="20px"
        position={!isDesktop && "absolute"}
        bottom={!isDesktop && "0"}
        mb={!isDesktop && "50px"}
      >
        <Box m={isDesktop && "20px 0"} display={!isDesktop && "flex"}>
          <Label
            isDesktop={isDesktop}
            dangerouslySetInnerHTML={{
              __html: t("admin#queueStatus_securityLabel")
            }}
          />
          <Label
            isDesktop={isDesktop}
            style={{ color: "#3D434D" }}
            dangerouslySetInnerHTML={{
              __html: t("admin#queueStatus_securityText")
            }}
          />
        </Box>
        <Box display={!isDesktop && "flex"}>
          <Label
            isDesktop={isDesktop}
            dangerouslySetInnerHTML={{
              __html: t("admin#queueStatus_ticketLabel")
            }}
          />
          <Label
            isDesktop={isDesktop}
            style={{ color: "#3D434D" }}
            dangerouslySetInnerHTML={{
              __html: t("admin#queueStatus_ticketText")
            }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Container isDesktop={isDesktop}>
      <div className="left-container">
        <div className="left-content-wrapper" style={{}}>
          <Header isDesktop={isDesktop}>
            <img src={Logo} alt="logo" height="100%" />
            <Typography
              variant="h3"
              style={{
                fontSize: isDesktop ? "30px" : "20px",
                marginLeft: "5%"
              }}
            >
              {t("admin#intro_welcome")}
            </Typography>
          </Header>
          <Box
            width="auto"
            height="40%"
            m={isDesktop ? "10px 0 10px 20px" : "0"}
          >
            <video
              width="auto"
              height={isDesktop ? "100%" : "70%"}
              muted
              autoPlay
              loop
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
          {!isDesktop && <Queues>{renderQueues()}</Queues>}
          {isDesktop && renderInstructionsLabels()}
        </div>
        <CustomizedFooter isDesktop={isDesktop}>
          {!isDesktop && renderInstructionsLabels()}
          <Label
            isDesktop={isDesktop}
            style={{
              marginTop: "50px",
              fontSize: isDesktop ? "24px" : "12px",
              paddingLeft: isDesktop && "3rem",
              margin: isDesktop && "0 0 15px 20px",
              display: !isDesktop && "flex",
              flexDirection: !isDesktop && "column",
              width: !isDesktop && "33%"
            }}
            dangerouslySetInnerHTML={{
              __html: t("admin#queueStatus_naFilaLabel")
            }}
          />
          <Box
            position="relative"
            display="flex"
            alignItems="flex-end"
            width={"100%"}
          >
            <div className="footer-text">
              <Box>
                <p className="title">Projecto no âmbito do</p>
                <img
                  src={Tech4CovidIcon}
                  height={isDesktop ? "30px" : "15px"}
                  alt="Tech4Covid"
                />
              </Box>
              <div style={{ marginLeft: isDesktop ? "50px" : "20px" }}>
                <p className="title">Parceiros</p>
                <Box>
                  <img
                    src={googleIcon}
                    style={{ height: isDesktop ? "30px" : "15px" }}
                    alt="google"
                  />
                  <img
                    src={NOSIcon}
                    style={{
                      height: isDesktop ? "30px" : "15px",
                      marginLeft: isDesktop ? "30px" : "7.5px"
                    }}
                    alt="nos"
                  />
                </Box>
              </div>
            </div>
            <img src={Footer} alt="footer" width="100%" height="100%" />
          </Box>
        </CustomizedFooter>
      </div>
      {isDesktop && <Queues isDesktop={isDesktop}>{renderQueues()}</Queues>}
    </Container>
  );
}

export default withRouter(QueueStatus);
