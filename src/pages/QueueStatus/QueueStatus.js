import React from "react";
import Box from "@material-ui/core/Box";

import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

import videoSrc from "@src/assets/nafila_onboarding_audiooff.mp4";

import { Header } from "./Components/Header";
import { Queues } from "./Components/Queues";
import { Footer } from "./Components/Footer";
import { Label } from "./Components/Label";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;~
  font-size: ${props => props.isDesktop && "12px"};
  & .left-container {
    height: 100%;
    position: relative;
    overflow: hidden;
    width: ${props => (props.isDesktop ? "50%" : "100%")};
  }
  & .left-content-wrapper {
    position: relative;
    height: 100%;
    padding: ${props => (props.isDesktop ? "1rem 0 0 3rem" : "1rem 0 0 0")};
    display: ${props => !props.isDesktop && "flex"};
    flex-direction: ${props => !props.isDesktop && "column"};
  }
`;

function QueueStatus({ isDesktop }) {
  const { t } = useTranslation();

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
        <div className="left-content-wrapper">
          <Header isDesktop={isDesktop} />
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
          {!isDesktop && <Queues isDesktop={isDesktop} />}
          {isDesktop && renderInstructionsLabels()}
        </div>
        <Footer
          renderInstructionsLabels={renderInstructionsLabels}
          isDesktop={isDesktop}
        />
      </div>
      {isDesktop && <Queues isDesktop={isDesktop} />}
    </Container>
  );
}

export default withRouter(QueueStatus);
