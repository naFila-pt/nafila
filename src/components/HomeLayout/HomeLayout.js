import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Toolbar from '@material-ui/core/Toolbar';
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";

import { ReactComponent as LogoMini } from "../../assets/logo-mini.svg";

const useStyles = makeStyles({
  container: {
    position: "relative",
    minWidth: "375px",
    height: "100vh",
    padding: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "0 100%"
  },
  toolbar: {
    position: "static",
    top: 0
  },
  menuIcon: {
    fontSize: "2.24em",
    color: "rgba(0, 0, 0, .54)"
  }
});

const OnBoardingLayout = ({ children, bg, activeStep }) => {
  const classes = useStyles();
  const bgUrl = bg[activeStep] ? bg[activeStep] : bg[bg.length - 1]

  return (
    <Container maxWidth="lg" className={classes.container} style={{ backgroundImage: `url(${ bgUrl })`}}>
      <Grid container>
        <Grid container direction="column">
          <Toolbar className={classes.toolbar}>
            <MenuIcon className={classes.menuIcon} />
            { activeStep !== 0 && <LogoMini style={{ flex: 0.9 }} />}
          </Toolbar>
        </Grid>
        {children[activeStep]}
      </Grid>
    </Container>
  );
}

export default OnBoardingLayout;