import React from "react";
import { Typography, Box } from "@material-ui/core";
import { useTranslation } from "react-i18next";
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

function Layout({ children, bg, hideLogo, style }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const boxProps = {
    width: 1,
    height: 1,
    display: "flex",
    flexDirection: "column",
    style: {
      ...style,
      background: `url(${bg}) no-repeat scroll 0px center / cover`,
      textAlign: "center"
    }
  };

  let logout = () => {
    auth.signOut().then(() => {
      window.location.href = "/admin";
    });
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
            style={
              auth.currentUser && auth.currentUser.emailVerified
                ? { justifyContent: "space-between" }
                : {}
            }
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
            {auth.currentUser && auth.currentUser.emailVerified && (
              <div onClick={logout}>
                <Typography variant="button">
                  {t("admin#signout_button")}
                </Typography>
              </div>
            )}
          </Toolbar>
        </Grid>
      </Grid>
      {children}
    </Box>
  );
}

export default Layout;
