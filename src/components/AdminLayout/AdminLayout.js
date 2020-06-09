import React from "react";
import { Box } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

import { ReactComponent as LogoMini } from "../../assets/logo-mini.svg";
import { auth } from "../../firebase";

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
    color: "rgba(0, 0, 0, .54)",
    display: "none" //temporarily disabled
  }
});

function Layout({ children, bg, hideLogo, style, textAlign }) {
  const classes = useStyles();
  const boxProps = {
    width: 1,
    height: 1,
    display: "flex",
    flexDirection: "column",
    style: {
      ...style,
      background: `url(${bg}) no-repeat scroll 0px center / cover`,
      textAlign: textAlign
    }
  };

  const handleLogoOnClick = e => {
    window.location.href = "/";
  };

  return (
    <Box className="AdminLayout" {...boxProps}>
      <Grid container>
        <Grid container direction="column">
          <Toolbar
            className={classes.toolbar}
            style={{ justifyContent: "center" }}
          >
            <MenuIcon className={classes.menuIcon} />
            {!hideLogo && (
              <LogoMini
                style={
                  auth.currentUser && auth.currentUser.emailVerified
                    ? { flex: 0.4 }
                    : { flex: 1 }
                }
                onClick={handleLogoOnClick}
              />
            )}
          </Toolbar>
        </Grid>
      </Grid>
      {children}
    </Box>
  );
}
Layout.defaultProps = {
  textAlign: "center"
};

export default Layout;
