import React, { Component } from "react";

import { Switch, Route } from "react-router-dom";

import PrivateRoute from "../PrivateRoute";

import OnBoardingContent from "../../pages/OnBoardingContent";
import { Legal, Home, AboutUs } from "../../pages/HomeContent";
import { Ticket, Leave } from "../../pages/TicketContent";
import TicketStatus from "../../pages/TicketStatus";
import QueuePoster from "../../pages/QueuePoster";
import QueueStatus from "../../pages/QueueStatus";
import CreateQueue from "../../pages/CreateQueue";
import Admin from "../../pages/Admin";
import FAQ from "../../pages/FAQ";
import NotFoundContent from "../../pages/NotFoundContent";
import * as Routes from "../../constants/RoutesConstants";

class Router extends Component {
  render() {
    return (
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

        <Route
          path={Routes.TICKET_STATUS_PATH}
          component={TicketStatus}
          exact
        />

        <Route path={Routes.ADMIN_HOME_PATH} exact>
          <Admin.Home openSnackbar={this.props.openSnackbar} />
        </Route>

        <Route path={Routes.ADMIN_HOME_ONBOARDING_PATH} exact>
          <Admin.OnBoarding {...this.props} />
        </Route>

        <Route path={Routes.TICKET_LEAVE_PATH} exact>
          <Leave {...this.props} />
        </Route>

        <Route path={Routes.TCS_PATH} exact>
          <Legal
            {...this.props}
            titleLabel="terms#title"
            textLabel="terms#text"
            pageId="terms_conditions"
            analyticsTitle="Termos e Condições"
          />
        </Route>

        <Route path={Routes.PRIVACY_PATH} exact>
          <Legal
            {...this.props}
            titleLabel="privacy#title"
            textLabel="privacy#text"
            pageId="privacy"
            analyticsTitle="Política de privacidade"
          />
        </Route>

        <Route path={Routes.ABOUT_US_PATH} exact>
          <AboutUs {...this.props} />
        </Route>

        <Route path={Routes.FAQ} exact>
          <FAQ {...this.props} />
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
        <Route path={Routes.QUEUE_STATUS} exact>
          <QueueStatus {...this.props} />
        </Route>
        <Route path={Routes.CREATE_QUEUE} exact>
          <CreateQueue {...this.props} />
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

        <Route
          path={Routes.QUEUE_POSTER_PATH}
          render={props => <QueuePoster {...props} {...this.props} />}
        />

        <Route>
          <NotFoundContent />
        </Route>
      </Switch>
    );
  }
}

export default Router;
