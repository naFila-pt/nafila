import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

import HomeContent from "../../pages/HomeContent";
import AdminContent from "../../pages/AdminContent";
import NotFoundContent from "../../pages/NotFoundContent";

class Router extends Component {
  render() {
    // Properties
    const { user, roles, bar } = this.props;

    // Functions
    const { openSnackbar } = this.props;

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        {bar}

        <Switch>
          <Route path="/" exact>
            <HomeContent user={user} openSnackbar={openSnackbar} />
          </Route>

          <Route path="/admin">
            <AdminContent />
          </Route>

          <Route>
            <NotFoundContent />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

Router.propTypes = {
  // Properties
  user: PropTypes.object,
  roles: PropTypes.array.isRequired,
  bar: PropTypes.element,

  // Functions
  openSnackbar: PropTypes.func.isRequired
};

export default Router;
