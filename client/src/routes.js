import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { CreatePage } from "./pages/CreatePage";
import { DetailPage } from "./pages/DetailPage";
import { LinksPage } from "./pages/LinksPage";

export default function useRoutes(isAuthenticated) {
  if (isAuthenticated)
    return (
      <div>
        <Switch>
          <Route path="/links" exact>
            <LinksPage />
          </Route>
          <Route path="/create" exact>
            <CreatePage />
          </Route>
          <Route path="/detail/:id">
            <DetailPage />
          </Route>
          <Redirect to="/create" />
        </Switch>
      </div>
    );

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}
