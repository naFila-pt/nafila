import React, { useState } from "react";
import { Typography, Box, Grid } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Button from "../../../components/Button";
import Hd from "../../../assets/bg/home_desktop.svg";
import Mn from "../../../assets/bg/endqueue_mobile_bg.svg";
import Logo from "../../../assets/logo.svg";
import Layout from "../../../components/AdminLayout";
import Footer from "../../../components/Footer";
import { ADMIN_QUEUE_MANAGEMENT_PATH } from "../../../constants/RoutesConstants";
import Girl from "../../../assets/icons/rapariga.svg";
import Store from "../../../assets/images/ilust_loja.svg";

import { HeadlineContainer } from "../common";

import TitleComponent from "../../../components/TitleComponent";

const EndQueueGrid = styled(Grid)`
  display: flex;
  flex-direction: column;
`;

const ButtonGroupWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;

  .MuiButtonWrapper {
    margin-bottom: 20px;
    background: none !important;
  }

  @media (min-width: 768px) {
    justify-content: flex-end;

    .MuiButtonWrapper {
      margin-bottom: 50px;
      background: none !important;
    }
  }
`;

const TextWrapper = styled.div`
  @media (min-width: 768px) {
    text-align: left;
    align-self: center;
  }
`;

const ImagesGrid = styled(Grid)`
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const FooterWrapper = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const LayoutWrapper = styled(Layout)`
  background-image: url(${Hd});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const LogoImg = styled.img`
  @media (min-width: 768px) {
    display: none;
  }
`;

function EndQueueSuccess() {
  const { t } = useTranslation();
  const [background, setBackground] = useState(
    window.innerWidth >= 768 ? Hd : Mn
  );

  window.addEventListener("resize", () => {
    window.innerWidth >= 768 ? setBackground(Hd) : setBackground(Mn);
  });

  return (
    <LayoutWrapper bg={background}>
      <TitleComponent title="Fila encerrada" pageId="close_queue_success" />
      <Box display="flex" flex="1">
        <EndQueueGrid item xs={12} sm={5}>
          <TextWrapper>
            <HeadlineContainer style={{ marginBottom: 0 }}>
              <Typography variant="h3">
                {t("main#endQueueSuccess_title")}
              </Typography>
            </HeadlineContainer>

            <p
              style={{ fontSize: "20px", fontWeight: "bold" }}
              dangerouslySetInnerHTML={{
                __html: t("main#endQueueSuccess_text")
              }}
            />

            <p
              style={{ fontSize: "20px", fontWeight: "bold" }}
              dangerouslySetInnerHTML={{
                __html: t("main#endQueueSuccess_second_text")
              }}
            />

            <LogoImg
              src={Logo}
              className="logo-icon logo-icon-end-queue"
              alt="nafila logo"
            />
          </TextWrapper>
          <ButtonGroupWrapper>
            <Button
              variant="gray"
              href={ADMIN_QUEUE_MANAGEMENT_PATH}
              style={{ marginTop: 30 }}
              backward
            >
              {t("main#endQueueSuccess_back")}
            </Button>
          </ButtonGroupWrapper>
        </EndQueueGrid>
        <ImagesGrid item xs={12} sm={7}>
          <ImagesWrapper>
            <img src={Girl} alt="girl" />
            <img src={Store} alt="store" />
          </ImagesWrapper>
        </ImagesGrid>
      </Box>
      <FooterWrapper>
        <Footer />
      </FooterWrapper>
    </LayoutWrapper>
  );
}

export default EndQueueSuccess;
