import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import OnBoardingContent from "../../pages/OnBoardingContent";
import { HomeContent, TermsConditions } from "../../pages/HomeContent";
import Admin from "../../pages/Admin";
import NotFoundContent from "../../pages/NotFoundContent";
import { ADMIN_WELCOME_PATH, ADMIN_SIGNUP_PATH, ADMIN_LOGIN_PATH, ADMIN_RECOVERPASSWORD_PATH, ADMIN_RECOVERPASSWORDCHANGE_PATH } from '../../constants/RoutesConstants'

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
          <Route path="/termos-condicoes" component={TermsConditions} exact />

          <Route path={ADMIN_WELCOME_PATH} component={Admin.WelcomePanel} exact />
          <Route path={ADMIN_SIGNUP_PATH} component={Admin.SignUp} exact />
          <Route path={ADMIN_LOGIN_PATH} component={Admin.Login} exact />
          <Route path={ADMIN_RECOVERPASSWORD_PATH} component={Admin.RecoverPassword} exact />
          <Route path={ADMIN_RECOVERPASSWORDCHANGE_PATH} component={Admin.ChangePassword} exact />

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
