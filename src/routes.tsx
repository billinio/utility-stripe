import { Route, Switch } from "react-router-dom";

import { Container } from "components/Layout/Container";
import React from "react";
import { SetupIntent } from "pages/SetupIntent";

export const Routes = () => {
  return (
    <Container>
      <Switch>

        <Route path={["/", "/setup-intent"]} exact>
          <SetupIntent />
        </Route>

      </Switch>
    </Container>
  );
};
