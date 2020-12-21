import { StripeStyle } from "system/constants";
import * as Elements from "@stripe/react-stripe-js";
import * as Stripe from "@stripe/stripe-js";
import delay from "delay";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Box } from "components/Box";
import { Button } from "components/Form/Button";
import { Grid } from "components/Grid";
import { Heading } from "components/Heading";
import { StripeElement } from "components/Form/StripeElement";
import { Summary } from "components/Heading/Summary";
import { Aside } from "components/Heading/Aside";
import { Form } from "components/Form";
import { Icon } from "components/Icon";

export function PaymentMethod() {
  const [loading, setLoading] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const elements = Elements.useElements() as Stripe.StripeElements;
  const stripe = Elements.useStripe() as Stripe.Stripe;

  //
  // Utils
  //
  const isLoading = () => {
    setLoading(true);
    NProgress.start();
  };

  const isLoaded = () => {
    setLoading(false);
    NProgress.done();
  };

  //
  // Events
  //
  const reset = () => {
    const card = elements.getElement(Elements.CardNumberElement) as Stripe.StripeCardNumberElement;
    card.clear();
    setPaymentMethodId("");
  };

  const onSubmit = async () => {
    isLoading();
    try {
      await delay(1000);
      setPaymentMethodId("pm_1733737262626346325");
      isLoaded();
    } catch (error) {
      isLoaded();
    }
  };

  //
  // Render
  //
  return (
    <Box>
      <Heading type="h2" title="Payment Method">
        <Aside>
          <Link to="/setup-intent" onClick={reset}>
            <Icon color="blue" icon="fas fa-undo-alt" tooltip="Reset form" />
          </Link>
        </Aside>
        <Summary>
          Dolor sit amet consectetur adipisicing elit. Nisi debitis reprehenderit reiciendis iure id, ut optio recusandae
          iste perferendis quaerat itaque impedit inventore architecto. Reiciendis iure id, ut optio recusandae iste
          perferendis perspiciatis quaerat itaque impedit. <a href="https://stripe.com/docs/payments/payment-methods" target="_blank" rel="noreferrer">Find out more</a>.
        </Summary>
      </Heading>

      <Form onSubmit={onSubmit}>
        <Grid layout="small-right">
          <StripeElement>
            <Elements.CardNumberElement options={{ style: StripeStyle, showIcon: true }} />
          </StripeElement>
          <Button loading={loading}>Submit</Button>
        </Grid>

        {paymentMethodId && (
          <Grid>
            {paymentMethodId}
          </Grid>
        )}
        
      </Form>
    </Box>
  );

}
