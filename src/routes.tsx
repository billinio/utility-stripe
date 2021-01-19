import { Route, Switch } from "react-router-dom";

import { Container } from "components/Layout/Container";
import { PaymentIntent } from "pages/PaymentIntent";
import React from "react";
import { SetupIntent } from "pages/SetupIntent";

export const Routes = () => {
  return (
    <Container>
      <Switch>

        <Route path={["/", "/setup-intent"]} exact>
          <SetupIntent />
        </Route>

        <Route path="/payment-intent" exact>
          <PaymentIntent />
        </Route>

      </Switch>
    </Container>
  );
};
