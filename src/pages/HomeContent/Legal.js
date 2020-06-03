import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Footer from "../../components/Footer";
import Toolbar from "../../components/Toolbar";
import bgMobile from "../../assets/bg/terms_mobile.svg";
import bgDesktop from "../../assets/bg/terms_desktop.svg";

import TitleComponent from "../../components/TitleComponent";

const Container = styled(Box)`
  position: relative;
  height: 100%;
  padding: 0;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 0px;

  & .grid-container {
    flex: 1;
    text-align: center;
    padding: 20px 27px 50px;
    @media (min-width: 768px) {
      padding: 20px 166px 50px;
      text-align: start;
    }
  }

  & .textLabel {
    line-height: 150%;
    white-space: pre-line;
    text-align: justify;
    font-size: 16px;
    color: #484848;
    @media (min-width: 768px) {
      font-size: 22px;
    }
  }
`;

const FooterWrapper = styled.div`
  min-height: 100px;
`;

const Legal = ({
  titleLabel,
  textLabel,
  pageId,
  analyticsTitle,
  isDesktop
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Container
        style={{
          backgroundImage: `url(${isDesktop ? bgDesktop : bgMobile})`,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <TitleComponent title={analyticsTitle} pageId={pageId} />
        <Toolbar />
        <Grid className="grid-container">
          <Grid item>
            <Typography variant="h1">{t(titleLabel)}</Typography>
          </Grid>
          <p
            className="textLabel"
            dangerouslySetInnerHTML={{ __html: t(textLabel) }}
          />
        </Grid>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </Container>
    </>
  );
};

export default withRouter(Legal);
