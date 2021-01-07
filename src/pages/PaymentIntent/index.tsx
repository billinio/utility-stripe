import { Link, useHistory } from "react-router-dom";
import React, { useEffect } from "react";

import { Aside } from "components/Heading/Aside";
import { CreatePaymentIntent } from "elements/CreatePaymentIntent";
import { Customer } from "components/Customer";
import { Grid } from "components/Grid";
import { Heading } from "components/Heading";
import { Icon } from "components/Icon";
import { Main } from "components/Layout/Main";
import { PaymentMethod } from "elements/PaymentMethod";
import { Sidebar } from "components/Layout/Sidebar";

export function PaymentIntent() {
  const history = useHistory();

  useEffect(() => {
    document.title = "Payment Intent - billin.io";
  });

  return (
    <>
      <Main>

        {/* Header */}
        <Heading title="Payment Intent">
          <Aside>
            <Link to="/payment-intent" onClick={() => history.go(0)}>
              <Icon icon="fas fa-undo-alt" tooltip="Reset all forms" />
            </Link>
            <a href="https://stripe.com/docs/payments/payment-intents" target="_blank" rel="noreferrer">
              <Icon icon="fas fa-question-circle" tooltip="More info" />
            </a>
          </Aside>
        </Heading>

        {/* Payment Method */}
        <Grid size="large">
          <PaymentMethod />
        </Grid>

        {/* Create Payment Intent */}
        <Grid size="large">
          <CreatePaymentIntent />
        </Grid>

      </Main>
      <Sidebar>
        <Heading type="h3" title="Customer" />
        <Customer />
      </Sidebar>
    </>
  );

}
