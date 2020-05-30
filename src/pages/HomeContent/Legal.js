import React from "react";
import styled from "styled-components";
import Box from "@material-ui/core/Box";

import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Footer from "../../components/Footer";

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
`;

const useStyles = makeStyles(theme => ({
  gridContainer: {
    flex: 1,
    alignContent: "center",
    padding: "20px 32px 50px",
    [theme.breakpoints.up("md")]: {
      padding: "20px 166px 50px"
    }
  },
  footer: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%"
  }
}));

const Legal = ({
  titleLabel,
  textLabel,
  pageId,
  analyticsTitle,
  isDesktop
}) => {
  const classes = useStyles();
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
        <Grid container direction="column" className={classes.gridContainer}>
          <Grid item>
            <Typography variant="h1">{t(titleLabel)}</Typography>
          </Grid>

          <div>
            <pre
              style={{
                lineHeight: "150%",
                whiteSpace: "pre-line",
                textAlign: "justify",
                color: "#484848"
              }}
              dangerouslySetInnerHTML={{ __html: t(textLabel) }}
            />
          </div>
        </Grid>
        <Footer />
      </Container>
    </>
  );
};

export default withRouter(Legal);
