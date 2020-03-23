import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import OnBoardingContent from "../../pages/OnBoardingContent";
import HomeContent from "../../pages/HomeContent";
import Admin from "../../pages/Admin";
import NotFoundContent from "../../pages/NotFoundContent";
import { ADMIN_WELCOME_PATH } from '../../constants/RoutesConstants'

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

          <Route path={ADMIN_WELCOME_PATH} component={Admin.WelcomePanel} />

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
