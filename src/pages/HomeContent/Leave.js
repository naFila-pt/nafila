import React from "react";
import { withRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import HomeLayout from "../../components/HomeLayout";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

import bgMain from "../../assets/bg/main.svg";
import { ReactComponent as Logo } from "../../assets/logo.svg";

const useStyles = makeStyles({
  gridContainer: {
    alignContent: "center",
    marginTop: "-1em"
  },
  gridItem: {
    textAlign: "center",
    paddingTop: "1.8em"
  },
  bottomButton: {
    position: "absolute",
    left: 0,
    bottom: "2em",
    width: "100%",
    textAlign: "center"
  }
});

const Leave = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <HomeLayout bg={[bgMain]} forceLogoDisplay>
      <Grid container direction="column" className={classes.gridContainer}>
        <Grid item className={classes.gridItem}>
          <Typography
            variant="h1"
            style={{ padding: "0 2em" }}
            dangerouslySetInnerHTML={{
              __html: t("leave#title")
            }}
          />

          <Logo style={{ margin: "2em auto 0" }} />

          <Typography
            variant="h4"
            dangerouslySetInnerHTML={{ __html: t("leave#description") }}
          />
          <br />
          <Typography variant="h4">{t("leave#bye")}</Typography>

          <div className={classes.bottomButton}>
            <Link to="/">
              <Button backward variant="gray">
                {t("leave#goBack")}
              </Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </HomeLayout>
  );
};

export default withRouter(Leave);
