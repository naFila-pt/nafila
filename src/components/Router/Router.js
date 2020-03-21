import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import OnBoardingContent from "../../pages/OnBoardingContent";
import HomeContent from "../../pages/HomeContent";
import AdminContent from "../../pages/AdminContent";
import NotFoundContent from "../../pages/NotFoundContent";

class Router extends Component {
  render() {
    // Properties
    const { user } = this.props;

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          <Route path="/" exact>
            <OnBoardingContent />
            {/* <HomeContent user={user} /> */}
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
  user: PropTypes.object
};

export default Router;
