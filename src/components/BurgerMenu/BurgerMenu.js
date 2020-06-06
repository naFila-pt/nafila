import React from "react";
import { Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CloseIcon from "@material-ui/icons/Close";
import Tech4Covid from "../../assets/icons/Logo-Tech4COVID19-white.svg";

import ConsumerMenuOptions from "./ConsumerMenuOptions";
import StoreMenuOptions from "./StoreMenuOptions";
import { ADMIN_WELCOME_PATH } from "../../constants/RoutesConstants";

import { useLocation } from "react-router-dom";

const useDrawerStyles = makeStyles({
  paper: {
    padding: "24px",
    width: "225px",
    backgroundColor: "#4C0788",
    "@media (min-width:768px)": {
      width: "20%",
      padding: "30px"
    }
  },
  title: {
    display: "flex",
    justifyContent: "center",
    margin: 0,
    flex: 1,
    fontSize: "32px",
    lineHeight: "30px",
    mixBlendMode: "normal",
    color: "#ffffff"
  },
  closeIcon: { color: "#ffffff", cursor: "pointer" },

  backdrop: {
    backgroundColor: "rgba(0,0,0,0.2)"
  },

  tech4covid: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-start"
  }
});

const BurgerMenu = ({ isOpen, toggleMenu, userInfo }) => {
  const drawerClasses = useDrawerStyles();
  const { pathname } = useLocation();
  const showStoreOptions =
    (userInfo && userInfo.user && userInfo.user.emailVerified) ||
    pathname.startsWith(ADMIN_WELCOME_PATH);

  return (
    <Drawer
      anchor="left"
      classes={{
        paperAnchorLeft: drawerClasses.paper
      }}
      open={isOpen}
      style={{ width: "100%" }}
      ModalProps={{
        BackdropProps: { classes: { root: drawerClasses.backdrop } },
        onBackdropClick: () => toggleMenu()
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <CloseIcon
          classes={{ root: drawerClasses.closeIcon }}
          onClick={() => toggleMenu()}
        />
        <p className={drawerClasses.title}>
          na<b>fila</b>
        </p>
      </div>
      {showStoreOptions ? (
        <StoreMenuOptions
          user={userInfo.user}
          queueId={userInfo.userData?.queues[0]}
          toggleMenu={toggleMenu}
        />
      ) : (
        <ConsumerMenuOptions toggleMenu={toggleMenu} />
      )}
      <div className={drawerClasses.tech4covid}>
        <img src={Tech4Covid} alt="tech4covid" height="30px"></img>
      </div>
    </Drawer>
  );
};

export default BurgerMenu;
