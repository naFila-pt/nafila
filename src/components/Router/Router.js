import React, { Component } from "react";

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
    return (
      <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
        <Switch>
          <Route path={Routes.ROOT_PATH} exact>
            <Home {...this.props} />
          </Route>

          <Route path={Routes.TICKET_PATH}>
            <Ticket {...this.props} />
          </Route>

          <Route path={Routes.ONBOARDING_PATH} exact>
            <OnBoardingContent {...this.props} />
          </Route>

          <Route path={Routes.ADMIN_HELLO_PATH} exact>
            <Admin.Hello {...this.props} />
          </Route>

          <Route path={Routes.TICKET_LEAVE_PATH} exact>
            <Leave {...this.props} />
          </Route>

          <Route path={Routes.TCS_PATH} exact>
            <TermsConditions {...this.props} />
          </Route>

          <Route path={Routes.ADMIN_WELCOME_PATH} exact>
            <Admin.WelcomePanel {...this.props} />
          </Route>
          <Route path={Routes.ADMIN_SIGNUP_PATH} exact>
            <Admin.SignUp {...this.props} />
          </Route>

          <Route path={Routes.ADMIN_LOGIN_PATH} exact>
            <Admin.Login {...this.props} />
          </Route>
          <Route path={Routes.ADMIN_RECOVER_PASSWORD_PATH} exact>
            <Admin.RecoverPassword {...this.props} />
          </Route>

          <PrivateRoute
            path={Routes.ADMIN_PRE_QUEUE_PATH}
            component={Admin.PreQueue}
            exact
          />

          <PrivateRoute
            path={Routes.ADMIN_QUEUE_MANAGEMENT_PATH}
            render={props => <Admin.Queue {...props} {...this.props} />}
            exact
          />

          <PrivateRoute
            path={Routes.ADMIN_END_QUEUE_PATH}
            render={props => <Admin.EndQueue {...props} {...this.props} />}
            exact
          />

          <PrivateRoute
            path={Routes.ADMIN_ADD_CUSTOMER_PATH}
            render={props => <Admin.AddConsumer {...props} {...this.props} />}
            exact
          />

          <PrivateRoute
            path={Routes.ADMIN_QUEUE_POSTER_PATH}
            render={props => <Admin.QueuePoster {...props} {...this.props} />}
          />

          <Route>
            <NotFoundContent />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
