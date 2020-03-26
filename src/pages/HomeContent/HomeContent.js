import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import HomeLayout from '../../components/HomeLayout';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from "../../components/Button";

import bgStore from "../../assets/bg/user_store.svg";
import bgMain from "../../assets/bg/main.svg";

import { ReactComponent as Logo } from "../../assets/logo.svg";
import { ReactComponent as Ticket } from "../../assets/icons/ticket.svg";
import { ReactComponent as EmailNotification } from "../../assets/icons/email_notification.svg";

const useStyles = makeStyles({
  gridContainer: {
    alignContent: "center",
    marginTop: "-1em"
  },
  gridItem: {
    textAlign: "center",
    paddingTop: '1.8em'
  }
});

const HomeContent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  const { t } = useTranslation();

  const handleNextButton = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  return (
    <HomeLayout bg={[bgStore, bgMain]} activeStep={activeStep}>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography variant="h1">{t('home#insertCode_title')}</Typography>
          <Input placeholder={t('home#insertCode_inputPlaceholder')} style={{ width: '100%' }} />
          <Button forward onClick={handleNextButton} dangerouslySetInnerHTML={{ __html: t('home#insertCode_button') }} />
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item className={classes.gridItem}>
          <div>{t('home#ticket_store')}</div>
          <Ticket />
          <Grid container>
            <Grid item>
              <div>{t('home#ticket_current')}</div>
              <div>037</div>
            </Grid>
            <Grid item>
              <div dangerouslySetInnerHTML={{ __html: t('home#ticket_queue') }} />
              <div>7</div>
            </Grid>
          </Grid>
          <Button forward onClick={handleNextButton}>{t('home#ticket_button')}</Button>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item className={classes.gridItem}>
          <EmailNotification />
          <Typography variant="h4" dangerouslySetInnerHTML={{ __html: t('home#notification_description') }} />
          <Input placeholder={t('home#notification_inputPlaceholder')} style={{ width: '100%' }} />
          <Typography variant="h5" dangerouslySetInnerHTML={{ __html: t('home#notification_terms') }} />
          <Button forward onClick={handleNextButton}>{t('home#notification_button')}</Button>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item className={classes.gridItem}>
          <Logo />
          <Typography variant="h1">{t('home#end_title')}</Typography>
          <Typography variant="h4" dangerouslySetInnerHTML={{ __html: t('home#end_description') }} />
          <Typography variant="h3" dangerouslySetInnerHTML={{ __html: t('home#end_staysafe') }} />
          <Typography variant="h4" dangerouslySetInnerHTML={{ __html: t('home#end_closeWindow') }} />
        </Grid>
      </Grid>
    </HomeLayout>
  );
}

export default withRouter(HomeContent);
