import { Link, useHistory, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

import { Aside } from "components/Heading/Aside";
import { Grid } from "components/Grid";
import { Heading } from "components/Heading";
import { Icon } from "components/Icon";
import { Main } from "components/Layout/Main";
import { Sidebar } from "components/Layout/Sidebar";

import { PaymentMethod } from "elements/PaymentMethod";

export function SetupIntent() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      history.replace("/setup-intent");
    }
    document.title = "Setup Intent - billin.io";
  });

  return (
    <>
      <Main>

        {/* Header */}
        <Heading title="Setup Intent">
          <Aside>
            <Link to="/setup-intent" onClick={() => history.go(0)}>
              <Icon icon="fas fa-undo-alt" tooltip="Reset all forms" />
            </Link>
            <a href="https://stripe.com/docs/payments/setup-intents" target="_blank" rel="noreferrer">
              <Icon icon="fas fa-question-circle" tooltip="More info" />
            </a>
          </Aside>
        </Heading>

        {/* Payment Method */}
        <Grid size="large">
          <PaymentMethod />
        </Grid>

      </Main>
      <Sidebar>Sidebar</Sidebar>
    </>
  );

}
