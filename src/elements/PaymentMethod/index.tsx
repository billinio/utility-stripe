import { Link } from "react-router-dom";
import { StripeStyle } from "system/constants";
import * as Elements from "@stripe/react-stripe-js";
import * as Stripe from "@stripe/stripe-js";
import React, { useState, useRef } from "react";

import { Alert } from "components/Alert";
import { Aside } from "components/Heading/Aside";
import { Box } from "components/Box";
import { Button } from "components/Form/Button";
import { Form } from "components/Form";
import { Grid } from "components/Grid";
import { Heading } from "components/Heading";
import { Icon } from "components/Icon";
import { Readonly } from "components/Form/Readonly";
import { StripeElement } from "components/Form/StripeElement";
import { Summary } from "components/Heading/Summary";

export function PaymentMethod() {
  const [loading, setLoading] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const elements = Elements.useElements() as Stripe.StripeElements;
  const stripe = Elements.useStripe() as Stripe.Stripe;
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  //
  // Utils
  //
  const copy = () => {
    ref.current.focus();
    ref.current.select();
    document.execCommand("copy");
  };

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
    const exp = elements.getElement(Elements.CardExpiryElement) as Stripe.StripeCardExpiryElement;
    card.clear();
    exp.clear();
    setPaymentMethodId("");
  };

  const onSubmit = async () => {
    isLoading();
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(Elements.CardNumberElement) as Stripe.StripeCardNumberElement,
      });
      isLoaded();
      if (error) {
        Alert.error(error.message, "Oops!");
      } else if (paymentMethod) {
        setPaymentMethodId(paymentMethod.id);
        Alert.info("Copied to clipboard", "Payment Method ID");
        copy();
      }
    } catch (error) {
      Alert.error(error.message, "Something went wrong!");
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
            <Icon size="small" color="blue" icon="fas fa-undo-alt" tooltip="Reset form" />
          </Link>
        </Aside>
        <Summary>
          Collect customer card details and convert into a Stripe <a href="https://stripe.com/docs/api/payment_methods" target="_blank" rel="noreferrer">Payment Method</a> that can be
          used later to make payments or assign to a customer. This form will return a <code>payment_method.id</code>.
        </Summary>
      </Heading>

      <Form onSubmit={onSubmit}>
        <Grid layout="small-right">
          <StripeElement>
            <Elements.CardNumberElement options={{ style: StripeStyle, showIcon: true }} />
          </StripeElement>
          <StripeElement>
            <Elements.CardExpiryElement options={{ style: StripeStyle }} />
          </StripeElement>
        </Grid>
        <Grid>
          <Button loading={loading}>Submit</Button>
        </Grid>

        {paymentMethodId && (
          <Grid>
            <Readonly value={paymentMethodId} placeholder="Payment Method ID" reference={ref} />
          </Grid>
        )}
        
      </Form>
    </Box>
  );

}
