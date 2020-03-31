import React, { useState, useEffect } from "react";
import { oneOfType, func, object } from "prop-types";
import { Route } from "react-router-dom";

import Loader from "../Loader";
import { ADMIN_LOGIN_PATH } from "../../constants/RoutesConstants";
import { auth } from "../../firebase";

function PrivateRoute({ ...rest }) {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    console.log(auth.currentUser && auth.currentUser.emailVerified);
    setHasSession(auth.currentUser && auth.currentUser.emailVerified);
    setLoading(false);
  }, []);

  const renderOrRedirect = () => {
    if (hasSession) return <Route {...rest} />;

    return global.location.assign(ADMIN_LOGIN_PATH);
  };

  return loading ? <Loader /> : renderOrRedirect();
}

PrivateRoute.propTypes = {
  component: oneOfType([func, object]).isRequired
};

export default PrivateRoute;
