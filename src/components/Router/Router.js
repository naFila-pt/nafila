import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import OnBoardingContent from "../../pages/OnBoardingContent";
import HomeContent from "../../pages/HomeContent";
import AdminContent from "../../pages/AdminContent";
import PrintCodeContent from "../../pages/PrintCodeContent";
import NotFoundContent from "../../pages/NotFoundContent";

class Router extends Component {
  render() {
    // Properties
    const { user } = this.props;

    const shouldSkipOnBoarding = localStorage.getItem('skipOnBoarding');

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          <Route path="/" exact>
            {shouldSkipOnBoarding ? <HomeContent user={user} /> : <OnBoardingContent />}
          </Route>

          <Route path="/admin/code">
            <PrintCodeContent />
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
