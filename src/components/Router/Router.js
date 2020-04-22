import React, { Component } from "react";

import PropTypes from "prop-types";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";

import { Ticket, Leave, TermsConditions, Home } from "../../pages/HomeContent";
import Admin from "../../pages/Admin";
import NotFoundContent from "../../pages/NotFoundContent";
import * as Routes from "../../constants/RoutesConstants";

class Router extends Component {
  render() {
    let shouldSkipOnBoarding;

    try {
      shouldSkipOnBoarding = true;
    } catch (error) {
      shouldSkipOnBoarding = false;
    }

    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          <Route path="/" exact>
            <Home shouldSkipOnBoarding={shouldSkipOnBoarding} />
          </Route>

          <Route path="/tirar-senha">
            <Ticket openSnackbar={this.props.openSnackbar} />
          </Route>

          <Route path="/como-funciona">
            <p> COMO FUNCIONA </p>
          </Route>

          <Route path="/lojista">
            <p> LOJISTA </p>
          </Route>

          <Route
            path="/sair/:queueId/:ticketId"
            render={props => (
              <Leave {...props} openSnackbar={this.props.openSnackbar} />
            )}
            exact
          />

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
