import { useHistory, useLocation, Link } from "react-router-dom";
import React, { useEffect } from "react";

import { Aside } from "components/Header/Aside";
import { Grid } from "components/Grid";
import { Header } from "components/Header";
import { Title } from "components/Header/Title";
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
        <Header>
          <Title>Setup Intent</Title>
          <Aside>
            <Link to="/setup-intent" onClick={() => history.go(0)}>
              <Icon icon="fas fa-undo-alt" tooltip="Reset form" />
            </Link>
            <a href="https://stripe.com/docs/payments/setup-intents" target="_blank" rel="noreferrer">
              <Icon icon="fas fa-question-circle" tooltip="More info" />
            </a>
          </Aside>
        </Header>

        {/* Payment Method */}
        <Grid>
          <PaymentMethod />
        </Grid>

      </Main>
      <Sidebar>Sidebar</Sidebar>
    </>
  );

}
