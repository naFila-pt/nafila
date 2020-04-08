import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";

import { ReactComponent as LogoMini } from "../../assets/logo-mini.svg";

const useStyles = makeStyles({
  container: {
    position: "relative",
    minWidth: "375px",
    height: "100%",
    padding: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0px"
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

const OnBoardingLayout = ({
  children,
  bg,
  activeStep = 0,
  forceLogoDisplay
}) => {
  const classes = useStyles();
  const bgUrl = bg[activeStep] ? bg[activeStep] : bg[bg.length - 1];

  return (
    <Box
      className={classes.container}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <Grid container>
        <Grid container direction="column">
          <Toolbar className={classes.toolbar}>
            {(activeStep !== 0 || forceLogoDisplay) && (
              <LogoMini style={{ flex: 0.9 }} />
            )}
          </Toolbar>
        </Grid>
        {children[activeStep] || children}
      </Grid>
    </Box>
  );
};

export default OnBoardingLayout;
