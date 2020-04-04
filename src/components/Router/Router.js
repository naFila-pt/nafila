import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";

import OnBoardingContent from "../../pages/OnBoardingContent";
import { HomeContent, Leave, TermsConditions } from "../../pages/HomeContent";
import Admin from "../../pages/Admin";
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
              <HomeContent openSnackbar={this.props.openSnackbar} user={user} />
            ) : (
              <OnBoardingContent />
            )}
          </Route>

          <Route path="/sair" component={Leave} />

          <Route path="/termos-condicoes" component={TermsConditions} exact />

          <Route
            path={Routes.ADMIN_WELCOME_PATH}
            render={props => (
              <Admin.WelcomePanel
                {...props}
                openSnackbar={this.props.openSnackbar}
              />
            )}
            exact
          />
          <Route
            path={Routes.ADMIN_SIGNUP_PATH}
            render={props => (
              <Admin.SignUp {...props} openSnackbar={this.props.openSnackbar} />
            )}
            exact
          />
          <Route
            path={Routes.ADMIN_LOGIN_PATH}
            render={props => (
              <Admin.Login {...props} openSnackbar={this.props.openSnackbar} />
            )}
            exact
          />
          <Route
            path={Routes.ADMIN_RECOVER_PASSWORD_PATH}
            render={props => (
              <Admin.RecoverPassword
                {...props}
                openSnackbar={this.props.openSnackbar}
              />
            )}
            exact
          />

          <PrivateRoute
            path={Routes.ADMIN_PRE_QUEUE_PATH}
            component={Admin.PreQueue}
            exact
          />

          <PrivateRoute
            path={Routes.ADMIN_QUEUE_MANAGEMENT_PATH}
            render={props => (
              <Admin.Queue {...props} openSnackbar={this.props.openSnackbar} />
            )}
            exact
          />

          <PrivateRoute
            path={Routes.ADMIN_END_QUEUE_PATH}
            render={props => (
              <Admin.EndQueue
                {...props}
                openSnackbar={this.props.openSnackbar}
              />
            )}
            exact
          />

          <PrivateRoute
            path={Routes.ADMIN_ADD_CUSTOMER_PATH}
            render={props => (
              <Admin.AddConsumer
                {...props}
                openSnackbar={this.props.openSnackbar}
              />
            )}
            exact
          />

          <PrivateRoute
            path={Routes.ADMIN_QUEUE_POSTER_PATH}
            render={props => (
              <Admin.QueuePoster
                {...props}
                openSnackbar={this.props.openSnackbar}
              />
            )}
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
