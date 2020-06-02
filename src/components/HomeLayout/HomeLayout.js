import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

import { ReactComponent as LogoMini } from "../../assets/logo-mini.svg";

const useStyles = makeStyles({
  container: {
    height: "100%",
    position: "relative",
    minWidth: "320px",
    padding: 0,
    backgroundRepeat: "no-repeat",
    backgroundPosition: props => props.bgPosition || "center",
    backgroundSize: "cover"
  },
  toolbar: {
    position: "static",
    top: 0
  },
  menuIcon: {
    fontSize: "2.24em",
    color: "rgba(0, 0, 0, .54)",
    display: "none" //temporarily disabled
  }
});

const HomeLayout = props => {
  const { children, bg, activeStep = 1, forceLogoDisplay } = props;
  const classes = useStyles(props);
  const bgUrl = bg[activeStep] ? bg[activeStep] : bg[bg.length - 1];
  return (
    <Grid
      container
      alignContent="center"
      alignItems="center"
      className={`${classes.container} HomeLayout`}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <Grid container style={{ height: "100%" }}>
        <Grid container direction="column">
          <Toolbar className={classes.toolbar}>
            {(activeStep !== 1 || forceLogoDisplay) && (
              <LogoMini style={{ flex: 1 }} />
            )}
          </Toolbar>
        </Grid>
        {children[activeStep] || children}
      </Grid>
    </Grid>
  );
};

export default HomeLayout;
