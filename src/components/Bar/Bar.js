import React, { Component } from "react";

import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  ButtonGroup,
  Button,
  IconButton,
  Divider,
  Menu,
  MenuItem
} from "@material-ui/core";

import UserAvatar from "../UserAvatar";

class Bar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: {
        anchorEl: null
      }
    };
  }

  openMenu = event => {
    const anchorEl = event.currentTarget;

    this.setState({
      menu: {
        anchorEl
      }
    });
  };

  closeMenu = () => {
    this.setState({
      menu: {
        anchorEl: null
      }
    });
  };

  render() {
    // Properties
    const { performingAction, user, userData, roles } = this.props;

    // Events
    const {
      onAboutClick,
      onSettingsClick,
      onSignOutClick,
      onSignUpClick,
      onSignInClick
    } = this.props;

    const { menu } = this.state;

    const menuItems = [
      {
        name: "About",
        onClick: onAboutClick
      },
      {
        name: "Profile",
        to: user ? `/user/${user.uid}` : null
      },
      {
        name: "Settings",
        onClick: onSettingsClick
      },
      {
        name: "Sign out",
        divide: true,
        onClick: onSignOutClick
      }
    ];

    return (
      <AppBar color="primary" position="static">
        <Toolbar>
          <Box display="flex" flexGrow={1} justifyContent="center">
            <Typography color="inherit" variant="h5">
              na fila.
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}

Bar.defaultProps = {
  performingAction: false
};

Bar.propTypes = {
  // Properties
  performingAction: PropTypes.bool.isRequired,
  user: PropTypes.object,
  userData: PropTypes.object,

  // Events
  onAboutClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
  onSignOutClick: PropTypes.func.isRequired
};

export default Bar;
