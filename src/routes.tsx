import { Container } from "components/Layout/Container";
import { Route, Switch } from "react-router-dom";
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
