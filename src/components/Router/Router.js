import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";

import OnBoardingContent from "../../pages/OnBoardingContent";
import { TermsConditions, Home } from "../../pages/HomeContent";
import { Ticket, Leave } from "../../pages/TicketContent";
import Admin from "../../pages/Admin";
import NotFoundContent from "../../pages/NotFoundContent";
import * as Routes from "../../constants/RoutesConstants";

class Router extends Component {
  render() {
    let shouldSkipOnBoarding;

    try {
      shouldSkipOnBoarding = localStorage.getItem("skipOnBoarding");
    } catch (error) {
      shouldSkipOnBoarding = false;
    }

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          <Route path={Routes.ROOT_PATH} exact>
            <Home
              shouldSkipOnBoarding={shouldSkipOnBoarding}
              openSnackbar={this.props.openSnackbar}
            />
          </Route>

          <Route path={Routes.TICKET_PATH}>
            <Ticket openSnackbar={this.props.openSnackbar} />
          </Route>

          <Route path={Routes.ONBOARDING_PATH} exact>
            <OnBoardingContent openSnackbar={this.props.openSnackbar} />
          </Route>

          <Route path={Routes.ADMIN_HOME_PATH} exact>
            <Admin.Home openSnackbar={this.props.openSnackbar} />
          </Route>

          <Route
            path={Routes.TICKET_LEAVE_PATH}
            render={props => (
              <Leave {...props} openSnackbar={this.props.openSnackbar} />
            )}
            exact
          />

          <Route path={Routes.TCS_PATH} component={TermsConditions} exact />

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
