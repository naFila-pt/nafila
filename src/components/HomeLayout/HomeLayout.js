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
  }
});

const HomeLayout = props => {
  const { children, bg, activeStep = 1, forceLogoDisplay } = props;
  const classes = useStyles(props);

  const bgUrl = bg[activeStep] ? bg[activeStep] : bg[bg.length - 1];

  const handleLogoOnClick = e => {
    window.location.href = "/";
  };

  return (
    <>
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
                <LogoMini style={{ flex: 1 }} onClick={handleLogoOnClick} />
              )}
            </Toolbar>
          </Grid>
          {children[activeStep] || children}
        </Grid>
      </Grid>
    </>
  );
};

export default HomeLayout;
