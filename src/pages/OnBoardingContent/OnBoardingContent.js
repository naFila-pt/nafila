import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import OnBoardingLayout from "../../components/OnBoardingLayout";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from "../../components/Button";

import bgIntro from "../../assets/bg/user_intro.svg";
import bgStore from "../../assets/bg/user_store.svg";
import bgMain from "../../assets/bg/user_onboard_main.svg";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as EmailNotification } from "../../assets/icons/onboarding_email_notification.svg";

const useStyles = makeStyles({
  gridContainer: {
    alignContent: "center",
    marginTop: "-1em"
  },
  gridItemIntro: {
    textAlign: "center",
    marginTop: "-2.5em"
  },
  gridItem: {
    textAlign: "center",
    paddingTop: '1.8em'
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
    <OnBoardingLayout bg={[bgIntro, bgStore, bgMain]} endOnBoarding={endOnBoarding}>
      <Grid container direction="column" className={classes.gridContainer}>
        <div style={{ textAlign: "center" }}><Logo /></div>
        <Grid item className={classes.gridItemIntro}>
        <Typography variant="h1" style={{ margin: "0.3em 0 0", fontSize: '2.375em' }}>{t('onboarding#intro_welcome')}</Typography>
          <span style={{ fontSize: "24px" }} dangerouslySetInnerHTML={{ __html: t('onboarding#intro_pitch') }} />
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography variant="h1" style={{ color: '#FFC836', marginBottom: '0.95em' }} gutterBottom>{t('onboarding#store_title')}</Typography>
          <Typography variant="h4" style={{ padding: '0 1em' }} dangerouslySetInnerHTML={{ __html: t('onboarding#store_description') }} />
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography variant="h1" style={{ marginBottom: '0.95em' }} gutterBottom>{t('onboarding#useCode_title')}</Typography>
          <Typography variant="h4" style={{ padding: '0 1.5em'}} dangerouslySetInnerHTML={{ __html: t('onboarding#useCode_description') }} />
          <Input placeholder={t('onboarding#useCode_inputPlaceholder')} style={{ width: '100%', fontSize: '1.625em', margin: '0.9em 0 0.385em', fontWeight: 900, color: '#4C0788' }} disabled />
          <div>{t('onboarding#useCode_instruction')}</div>
          <Button variant="onboarding" forward style={{ marginTop: '2em', color: '#4C0788' }} disabled>{t('onboarding#useCode_button')}</Button>
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography variant="h1" style={{ padding: '0 1em' }}>{t('onboarding#insertEmail_title')}</Typography>
          <Typography variant="h4" gutterBottom style={{ padding: '0 1em'}} dangerouslySetInnerHTML={{ __html: t('onboarding#insertEmail_description') }} />
          <EmailNotification />
          <Typography variant="h4" gutterBottom style={{ marginBottom: '2em' }} dangerouslySetInnerHTML={{ __html: t('onboarding#insertEmail_notification') }} />
          <Button onClick={endOnBoarding} forward dangerouslySetInnerHTML={{ __html: t('onboarding#insertEmail_button') }} />
        </Grid>
      </Grid>
    </OnBoardingLayout>
  );
}

export default withRouter(OnBoardingContent);
