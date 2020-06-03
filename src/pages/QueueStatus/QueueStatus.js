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
import videoSrc from "../../assets/nafila_onboarding.mp4";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

const Queues = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 55%;
  height: 100%;
  padding: 40px 0;
`;

const Label = styled.p`
  margin: 2px 0;
  line-height: 1.1;
  font-size: 30px;
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

  & .footer-text {
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    left: 20px;

    & .title {
      color: white;
      margin: 0 0 5px 0;
      font-size: 12px;
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;

const Header = styled.div`
  display: flex;
  height: 15%;
  align-items: center;
  padding: 10px 0 0 20px;
`;

const BigCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  border-radius: 100%;
  background-color: #ffc836;
  & p {
    color: white;
    font-size: 60px;
    margin 0;
}
`;

const GridArea = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(2, minmax(100px, 1fr));
  grid-template-rows: repeat(auto-fill, minmax(140px, 1fr));
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
    width: 100px;
    height: 100px;
    background-color: #4c0788;
    & p {
      font-size: 33px;
      font-weight: 900;
      color: white;
      margin: 0;
    }
  }
  & .name {
    display: flex;
    margin-left: -30px;
    padding-left: 45px;
    padding-right: 30px;
    align-items: center;
    line-height: 1.2;
    width: 60%;
    height: 90px;
    background-color: #e8e8e8;
    z-index: -1;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    & p {
      font-size: 3vh;
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
  width: 300px;
  height: 100px;
  background-color: #e4e4e4;
  & p {
      font-size: 50px;
      margin 0;
  }
`;

function QueueStatus() {
  const { t } = useTranslation();
  const [queuesData, setQueuesData] = useState({});
  const [requestQueues, setRequest] = useState(false);

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

  const getChunks = (arr, chunkSize) => {
    var c = [];
    for (var i = 0, len = arr.length; i < len; i += chunkSize)
      c.push(arr.slice(i, i + chunkSize));
    return c;
  };

  useEffect(() => {
    if (!requestQueues) {
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
            const queuesClone = Object.assign({}, queuesData);
            setQueuesData(queuesClone);
            if (i === chunks.length - 1) setRequest(true);
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
        const chunks = getChunks(Object.keys(queuesData), 12);
        console.log(chunks);
        console.log(Object.keys(queuesData));
        return (
          <div class="swiper-container">
            <div class="swiper-wrapper">
              {chunks.map(c => (
                <div class="swiper-slide">
                  <GridArea>
                    {c.map(key => (
                      <QueueWrapper>
                        <div className="circle">
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

  return (
    <Container>
      <div
        style={{
          width: "45%",
          height: "100%",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Header>
          <img src={Logo} alt="logo" height="100%" />
          <Typography
            variant="h3"
            style={{ fontSize: "30px", marginLeft: "5%" }}
          >
            {t("admin#intro_welcome")}
          </Typography>
        </Header>
        <Box width="90%" height="40%" m="10px 0 10px 20px">
          <video width="100%" height="100%" muted autoPlay loop>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
        <Box width="100%" ml="20px">
          <Box mt="20px" mb="20px">
            <Label
              dangerouslySetInnerHTML={{
                __html: t("admin#queueStatus_securityLabel")
              }}
            />
            <Label
              style={{ color: "#3D434D" }}
              dangerouslySetInnerHTML={{
                __html: t("admin#queueStatus_securityText")
              }}
            />
          </Box>
          <Label
            dangerouslySetInnerHTML={{
              __html: t("admin#queueStatus_ticketLabel")
            }}
          />
          <Label
            style={{ color: "#3D434D" }}
            dangerouslySetInnerHTML={{
              __html: t("admin#queueStatus_ticketText")
            }}
          />
          <Label
            style={{ marginTop: "20px", fontSize: "24px" }}
            dangerouslySetInnerHTML={{
              __html: t("admin#queueStatus_naFilaLabel")
            }}
          />
        </Box>
        <CustomizedFooter>
          <Box position="relative" display="flex" alignItems="flex-end">
            <div className="footer-text">
              <Box>
                <p className="title">Projecto no âmbito do</p>
                <img src={Tech4CovidIcon} height="30px" alt="Tech4Covid" />
              </Box>
              <div style={{ marginLeft: "50px" }}>
                <p className="title">Parceiros</p>
                <Box>
                  <img
                    src={googleIcon}
                    style={{ height: "30px" }}
                    alt="google"
                  />
                  <img
                    src={NOSIcon}
                    style={{ height: "30px", marginLeft: "30px" }}
                    alt="nos"
                  />
                </Box>
              </div>
            </div>
            <img src={Footer} alt="footer" width="100%" height="100%" />
          </Box>
        </CustomizedFooter>
      </div>
      <Queues>{renderQueues()}</Queues>
    </Container>
  );
}

export default withRouter(QueueStatus);
