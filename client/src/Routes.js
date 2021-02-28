import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

export default function Routes({ routes }) {
  return (
    <BrowserRouter>
      <RouteFactory routes={routes} />
    </BrowserRouter>
  );
}

function RouteFactory({ routes }) {
  return routes.map(({ path, component, exact}) => (
    <Route
      key={`path-${path}` }
      path={path}
      component={component}
      exact={exact}
    />
  ));
}
