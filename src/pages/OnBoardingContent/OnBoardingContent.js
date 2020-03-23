import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import OnBoardingLayout from "../../components/OnBoardingLayout";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Button from "../../components/Button";

import bgIntro from "../../assets/bg/user_intro.svg";
import bgStore from "../../assets/bg/user_store.svg";
import bgUseCode from "../../assets/bg/user_use_code.svg";
import bgInsertEmail from "../../assets/bg/user_insert_email.svg";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as EmailNotification } from "../../assets/icons/email_notification.svg";

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
    <OnBoardingLayout bg={[bgIntro, bgStore, bgUseCode, bgInsertEmail]} endOnBoarding={endOnBoarding}>
      <Grid container direction="column" className={classes.gridContainer}>
        <div style={{ textAlign: "center" }}><Logo /></div>
        <Grid item className={classes.gridItemIntro}>
        <Typography variant="h1" style={{ margin: "0.3em 0 0", fontSize: '2.25em' }}>{t('onboarding#intro_welcome')}</Typography>
          <span style={{ fontSize: "24px" }} dangerouslySetInnerHTML={{ __html: t('onboarding#intro_pitch') }} />
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography variant="h1" gutterBottom>{t('onboarding#store_title')}</Typography>
          <Typography variant="h4" style={{ padding: '0 1em' }} dangerouslySetInnerHTML={{ __html: t('onboarding#store_description') }} />
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography variant="h1" gutterBottom>{t('onboarding#useCode_title')}</Typography>
          <Typography variant="h4" gutterBottom style={{ padding: '0 1.8em'}} dangerouslySetInnerHTML={{ __html: t('onboarding#useCode_description') }} />
          <Typography variant="h3" style={{ margin: '2.6em 0 1em'}}>{t('onboarding#useCode_sampleCode')}</Typography>
          <hr style={{ maxWidth: '80%', border: '1px solid rgba(69, 21, 131, 0.9)', opacity: '0.65' }} />
          <div>{t('onboarding#useCode_instruction')}</div>
          <Button variant="inactive" forward style={{ marginTop: '2em' }}>{t('onboarding#useCode_button')}</Button>
        </Grid>
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography variant="h1" gutterBottom>{t('onboarding#insertEmail_title')}</Typography>
          <Typography variant="h4" gutterBottom style={{ padding: '0 1.8em'}} dangerouslySetInnerHTML={{ __html: t('onboarding#insertEmail_description') }} />
          <EmailNotification style={{ marginTop: '1.5em' }} />
          <Typography variant="h4" gutterBottom style={{ marginBottom: '3em' }} dangerouslySetInnerHTML={{ __html: t('onboarding#insertEmail_notification') }} />
          <Button onClick={endOnBoarding} forward dangerouslySetInnerHTML={{ __html: t('onboarding#insertEmail_button') }} />
        </Grid>
      </Grid>
    </OnBoardingLayout>
  );
}

export default withRouter(OnBoardingContent);
