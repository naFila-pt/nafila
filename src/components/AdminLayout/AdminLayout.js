import React from "react";
import { Box } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

import { ReactComponent as LogoMini } from "../../assets/logo-mini.svg";

const useStyles = makeStyles({
  container: {
    position: "relative",
    minWidth: "375px",
    height: "100%",
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

function Layout({ children, bg, hideLogo }) {
  const classes = useStyles();
  const boxProps = {
    width: 1,
    height: 1,
    display: "flex",
    flexDirection: "column",
    style: {
      background: `url(${bg})`,
      backgroundSize: "cover",
      backgroundPosition: "0 100%",
      backgroundRepeat: "no-repeat",
      textAlign: "center"
    }
  };

  return (
    <Box {...boxProps}>
      <Grid container>
        <Grid container direction="column">
          <Toolbar className={classes.toolbar}>
            <MenuIcon className={classes.menuIcon} />
            {!hideLogo && <LogoMini style={{ flex: 0.9 }} />}
          </Toolbar>
        </Grid>
      </Grid>
      {children}
    </Box>
  );
}

export default Layout;
