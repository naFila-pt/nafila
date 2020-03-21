import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import OnBoardingLayout from "../../components/OnBoardingLayout";
import Grid from "@material-ui/core/Grid";

import bg0 from "../../assets/bg/onboarding_0.svg";
import bg1 from "../../assets/bg/onboarding_1.svg";
import bg2 from "../../assets/bg/onboarding_2.svg";
import bg3 from "../../assets/bg/onboarding_3.svg";

import { ReactComponent as Logo } from "../../assets/logo.svg";

const useStyles = makeStyles({
  gridContainer: {
    alignContent: "center"
  },
  gridItem: {
    textAlign: "center",
    marginTop: "-2.5em"
  }
});

const OnBoardingContent = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <OnBoardingLayout bg={[bg0, bg1, bg2, bg3]}>
      <Grid container direction="column" className={classes.gridContainer}>
        <div style={{ textAlign: "center" }}><Logo /></div>
        <Grid item className={classes.gridItem}>
          <h1 style={{ margin: "0.3em 0 0", fontSize: "38px", fontWeight: 900, color: "#4C0788" }}>Bem Vindo!</h1>
          <span style={{ fontSize: "24px", color: "#54008E" }}>nafila. Sem filas.</span>
        </Grid>
      </Grid>
    </OnBoardingLayout>
  );
}

export default withRouter(OnBoardingContent);
