import * as Elements from "@stripe/react-stripe-js";
import * as Stripe from "@stripe/stripe-js";

import React, { useRef, useState } from "react";

import { Alert } from "components/Alert";
import { Aside } from "components/Heading/Aside";
import { Box } from "components/Box";
import { Button } from "components/Form/Button";
import { Form } from "components/Form";
import { Grid } from "components/Grid";
import { Heading } from "components/Heading";
import { Icon } from "components/Icon";
import { Link } from "react-router-dom";
import { Readonly } from "components/Form/Readonly";
import { StripeElement } from "components/Form/StripeElement";
import { StripeStyle } from "system/constants";
import { Summary } from "components/Heading/Summary";
import style from "./style.module.css";
import { useLoader } from "components/Loading";

export function PaymentMethod() {
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const elements = Elements.useElements() as Stripe.StripeElements;
  const loader = useLoader();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const stripe = Elements.useStripe() as Stripe.Stripe;

  //
  // Events
  //
  const onReset = () => {
    const card = elements.getElement(Elements.CardNumberElement) as Stripe.StripeCardNumberElement;
    const exp = elements.getElement(Elements.CardExpiryElement) as Stripe.StripeCardExpiryElement;
    card.clear();
    exp.clear();
    setPaymentMethodId("");
  };

  const onSubmit = async () => {
    loader.loading();
    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(Elements.CardNumberElement) as Stripe.StripeCardNumberElement,
      });
      loader.loaded();
      if (error) {
        Alert.error(error.message, "Oops!");
      } else if (paymentMethod) {
        setPaymentMethodId(paymentMethod.id);
        Alert.info("Copied to clipboard", "Payment Method ID");
        ref.current.focus();
        ref.current.select();
        document.execCommand("copy");
      }
    } catch (error) {
      Alert.error(error.message, "Something went wrong!");
      loader.loaded();
    }
  };

  //
  // Render
  //
  return (
    <Box classNames={style.container}>
      <div className={style.form}>
        <Heading type="h2" title="Payment Method">
          <Aside>
            <Link to="/setup-intent" onClick={onReset}>
              <Icon size="small" color="blue" icon="fas fa-undo-alt" tooltip="Reset form" />
            </Link>
          </Aside>
          <Summary>
            Collect a customer's card details and convert into a Stripe <a href="https://stripe.com/docs/api/payment_methods" target="_blank" rel="noreferrer">Payment Method</a> that can be
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
            <Button loading={loader.isLoading}>Get Payment Method ID</Button>
          </Grid>

          {paymentMethodId && (
            <Grid>
              <Readonly value={paymentMethodId} placeholder="Payment Method ID" reference={ref} />
            </Grid>
          )}

        </Form>
      </div>
      <div className={style.cards}>
        <Heading type="h3" title="Test Cards" />
        cards here...
      </div>
    </Box>
  );

}
