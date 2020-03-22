import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import OnBoardingLayout from "../../components/OnBoardingLayout";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import bgIntro from "../../assets/bg/user_intro.svg";
import bgStore from "../../assets/bg/user_store.svg";
import bgUseCode from "../../assets/bg/user_use_code.svg";
import bgInsertEmail from "../../assets/bg/user_insert_email.svg";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as EmailNotification } from "../../assets/icons/email_notification.svg";

const useStyles = makeStyles({
  gridContainer: {
    alignContent: "center"
  },
  gridItemIntro: {
    textAlign: "center",
    marginTop: "-2.5em"
  },
  gridItem: {
    textAlign: "center"
  }
});

const OnBoardingContent = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const endOnBoarding = () => {
    localStorage.setItem('skipOnBoarding', true);
    window.location.reload()
  }

  return (
    <OnBoardingLayout bg={[bgIntro, bgStore, bgUseCode, bgInsertEmail]} endOnBoarding={endOnBoarding}>
      <Grid container direction="column" className={classes.gridContainer}>
        <div style={{ textAlign: "center" }}><Logo /></div>
        <Grid item className={classes.gridItemIntro}>
          <h1 style={{ margin: "0.3em 0 0", fontSize: "38px", fontWeight: 900, color: "#4C0788" }}>{t('onboarding#intro_welcome')}</h1>
          <span style={{ fontSize: "24px", color: "#54008E" }} dangerouslySetInnerHTML={{ __html: t('onboarding#intro_pitch') }} />
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <h2>{t('onboarding#store_title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('onboarding#store_description') }} />
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <h2>{t('onboarding#useCode_title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('onboarding#useCode_description') }} />
          <h3><b>{t('onboarding#useCode_sampleCode')}</b></h3>
          <hr />
          <div>{t('onboarding#useCode_instruction')}</div>
          <Button>{t('onboarding#useCode_button')} <ArrowForwardIcon /></Button>
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <h2>{t('onboarding#insertEmail_title')}</h2>
          <p dangerouslySetInnerHTML={{ __html: t('onboarding#insertEmail_description') }} />
          <EmailNotification />
          <h4><b>{t('onboarding#insertEmail_done')}</b></h4>
          <p>{t('onboarding#insertEmail_notification')}</p>
          <Button onClick={endOnBoarding}><span dangerouslySetInnerHTML={{ __html: t('onboarding#insertEmail_button') }} /> <ArrowForwardIcon /></Button>
        </Grid>
      </Grid>
    </OnBoardingLayout>
  );
}

export default withRouter(OnBoardingContent);
