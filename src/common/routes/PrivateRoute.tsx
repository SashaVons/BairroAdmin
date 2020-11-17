import React, { Component, FC } from "react";
import { Route, Redirect } from "react-router-dom";

interface PrivateRouteProps {
  component: FC<any>;
  authed: boolean;
  path: string;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  authed,
  path,
}) => {
  return (
    <Route
      path={path}
      render={(props) =>
        authed ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};

interface PermissionsRouteProps {
  component: FC<any>;
  access: boolean;
  path: string;
}

export const PermissionsRoute: FC<PermissionsRouteProps> = ({
  path,
  component: Component,
  access,
}) => {
  if (access) {
    return <Route exact path={path} render={() => <Component />} />;
  }
  return <Redirect to="/cabinet" />;
};
