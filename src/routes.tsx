import { Route, Switch } from "react-router-dom";
import React from "react";

import { SetupIntent } from "pages/SetupIntent";

export const Routes = () => {
  return (
    <Switch>

      <Route path={["/", "/stripe"]} exact>
        <SetupIntent />
      </Route>

    </Switch>
  );
};
