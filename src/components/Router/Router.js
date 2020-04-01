import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";

import OnBoardingContent from "../../pages/OnBoardingContent";
import { HomeContent, TermsConditions } from "../../pages/HomeContent";
import Admin from "../../pages/Admin";
import Main from "../../pages/AfterLoggedIn";
import NotFoundContent from "../../pages/NotFoundContent";
import * as Routes from "../../constants/RoutesConstants";

class Router extends Component {
  render() {
    // Properties
    const { user } = this.props;

    const shouldSkipOnBoarding = localStorage.getItem("skipOnBoarding");

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          <Route path="/" exact>
            {shouldSkipOnBoarding ? (
              <HomeContent user={user} />
            ) : (
              <OnBoardingContent />
            )}
          </Route>
          <Route path="/termos-condicoes" component={TermsConditions} exact />

          <Route
            path={Routes.ADMIN_WELCOME_PATH}
            component={Admin.WelcomePanel}
            exact
          />
          <Route
            path={Routes.ADMIN_SIGNUP_PATH}
            component={Admin.SignUp}
            exact
          />
          <Route path={Routes.ADMIN_LOGIN_PATH} component={Admin.Login} exact />
          <Route
            path={Routes.ADMIN_RECOVER_PASSWORD_PATH}
            component={Admin.RecoverPassword}
            exact
          />
          <Route
            path={Routes.ADMIN_RECOVER_PASSWORDCHANGE_PATH}
            component={Admin.ChangePassword}
            exact
          />

          <PrivateRoute
            path={Routes.ADMIN_QUEUE_MANAGEMENT_PATH}
            component={Admin.Queue}
            exact
          />

          <PrivateRoute
            path={Routes.ADMIN_END_QUEUE_PATH}
            component={Main.EndQueue}
            exact
          />

          <PrivateRoute
            path={Routes.ADMIN_ADD_CUSTOMER_PATH}
            component={Main.AddConsumer}
            exact
          />

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
