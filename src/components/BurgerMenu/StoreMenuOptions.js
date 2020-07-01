import React from "react";
import { List, ListItemText, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../../firebase";
import {
  ADMIN_QUEUE_MANAGEMENT_PATH,
  QUEUE_POSTER_PATH,
  ADMIN_END_QUEUE_PATH,
  ADMIN_HOME_ONBOARDING_PATH,
  ABOUT_US_PATH,
  ADMIN_LOGIN_PATH,
  ADMIN_HOME_PATH,
  CREATE_QUEUE
} from "../../constants/RoutesConstants";
import { useLocation, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles({
  list: { paddingTop: "30px" },

  listItem: {
    fontSize: "24px",
    lineHeight: "30px",
    color: "#ffffff"
  },
  listItemActive: {
    fontSize: "24px",
    lineHeight: "30px",
    color: "#ffffff",
    fontWeight: 900
  },
  divider: {
    borderBottom: "2px solid white"
  }
});
const StoreMenuOptions = ({ toggleMenu, queueId, user }) => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const [t] = useTranslation();

  const queuePosterUrl = `${QUEUE_POSTER_PATH.replace(":queueId", queueId)}`;

  const handleOptionClick = link => {
    history.push(link);
    toggleMenu();
  };

  const logout = async () => {
    toggleMenu();
    await auth.signOut();
    history.push(ADMIN_HOME_PATH);
  };
  return (
    <List
      component="nav"
      aria-label="store poster queue"
      classes={{ root: classes.list }}
    >
      <ListItem
        divider={!user}
        classes={{ divider: classes.divider }}
        disableGutters
        button
        onClick={() => handleOptionClick(ADMIN_QUEUE_MANAGEMENT_PATH)}
      >
        <ListItemText
          classes={{
            primary:
              pathname === ADMIN_QUEUE_MANAGEMENT_PATH
                ? classes.listItemActive
                : classes.listItem
          }}
          primary={t("burger#your_store")}
        />
      </ListItem>
      <ListItem
        disableGutters
        button
        onClick={() => handleOptionClick(CREATE_QUEUE)}
      >
        <ListItemText
          classes={{
            primary:
              pathname === CREATE_QUEUE
                ? classes.listItemActive
                : classes.listItem
          }}
          primary={t("burger#criar-status")}
        />
      </ListItem>
      {queueId != null && (
        <>
          <ListItem
            disableGutters
            button
            onClick={() => window.open(queuePosterUrl, "_blank")}
          >
            <ListItemText
              classes={{
                primary:
                  pathname === queuePosterUrl
                    ? classes.listItemActive
                    : classes.listItem
              }}
              primary={t("burger#poster")}
            />
          </ListItem>

          <ListItem
            disableGutters
            button
            onClick={() => handleOptionClick(ADMIN_END_QUEUE_PATH)}
            divider
            classes={{ divider: classes.divider }}
          >
            <ListItemText
              classes={{
                primary:
                  pathname === ADMIN_END_QUEUE_PATH
                    ? classes.listItemActive
                    : classes.listItem
              }}
              primary={t("burger#end_queue")}
            />
          </ListItem>
        </>
      )}
      <ListItem
        disableGutters
        button
        onClick={user ? logout : () => handleOptionClick(ADMIN_LOGIN_PATH)}
        divider
        classes={{ divider: classes.divider }}
      >
        <ListItemText
          classes={{ primary: classes.listItem }}
          primary={user ? t("burger#logout") : t("burger#login")}
        />
      </ListItem>
      <ListItem
        disableGutters
        button
        onClick={() => handleOptionClick(ADMIN_HOME_ONBOARDING_PATH)}
      >
        <ListItemText
          classes={{
            primary:
              pathname === ADMIN_HOME_ONBOARDING_PATH
                ? classes.listItemActive
                : classes.listItem
          }}
          primary={t("burger#how_it_works")}
        />
      </ListItem>
      <ListItem
        disableGutters
        button
        onClick={() => handleOptionClick(ABOUT_US_PATH)}
      >
        <ListItemText
          classes={{
            primary:
              pathname === ABOUT_US_PATH
                ? classes.listItemActive
                : classes.listItem
          }}
          primary={t("burger#about_us")}
        />
      </ListItem>
    </List>
  );
};

export default StoreMenuOptions;
