import React from "react";
import { List, ListItemText, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  ABOUT_US_PATH,
  ONBOARDING_PATH,
  ADMIN_HOME_PATH
} from "../../constants/RoutesConstants";
import { useHistory, useLocation } from "react-router-dom";
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
const ConsumerMenuOptions = ({ toggleMenu }) => {
  const classes = useStyles();
  const history = useHistory();
  const { pathname } = useLocation();
  const [t] = useTranslation();

  const handleListItemClick = link => {
    history.push(link);
    toggleMenu();
  };

  return (
    <List
      component="nav"
      aria-label="how it works about"
      classes={{ root: classes.list }}
    >
      <ListItem
        disableGutters
        button
        onClick={() => handleListItemClick(ONBOARDING_PATH)}
      >
        <ListItemText
          classes={{
            primary:
              pathname === ONBOARDING_PATH
                ? classes.listItemActive
                : classes.listItem
          }}
          primary={t("burger#how_it_works")}
        />
      </ListItem>
      <ListItem
        disableGutters
        button
        divider
        onClick={() => handleListItemClick(ABOUT_US_PATH)}
        classes={{ divider: classes.divider }}
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

      <ListItem
        disableGutters
        button
        onClick={() => handleListItemClick(ADMIN_HOME_PATH)}
      >
        <ListItemText
          classes={{
            primary:
              pathname === ADMIN_HOME_PATH
                ? classes.listItemActive
                : classes.listItem
          }}
          primary={t("burger#lojista")}
        />
      </ListItem>
    </List>
  );
};

export default ConsumerMenuOptions;
