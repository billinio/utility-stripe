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
import { Input } from "components/Form/Input";
import { JsonToString } from "system/util";
import { Link } from "react-router-dom";
import { Readonly } from "components/Form/Readonly";
import { Summary } from "components/Heading/Summary";
import { useLoader } from "components/Loader";

export function ConfirmCardPayment() {
  const [clientSecret, setClientSecret] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [status, setStatus] = useState("");
  const loader = useLoader();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const stripe = Elements.useStripe() as Stripe.Stripe;

  //
  // Events
  //
  const onReset = async () => {
    setClientSecret("");
    setNextAction("");
    setPaymentIntentId("");
    setPaymentMethodId("");
    setStatus("");
  };

  const onSubmit = async () => {
    loader.loading();
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodId || undefined,
      });
      loader.loaded();
      if (error) {
        Alert.error(error.message, "Oops!");
      } else if (paymentIntent) {
        setPaymentIntentId(paymentIntent.id);
        setStatus(paymentIntent.status);
        setNextAction(JsonToString(paymentIntent.next_action));
        Alert.info("Copied to clipboard", "Payment Intent ID");
        ref.current.focus();
        ref.current.select();
        document.execCommand("copy");
      }
    } catch (error) {
      Alert.error(error.message, "Something went wrong!");
      loader.loaded();
    }
  };

  const onClientSecretChange = (value: string) => {
    setClientSecret(value);
  };

  const onPaymentMethodIdChange = (value: string) => {
    setPaymentMethodId(value);
  };

  //
  // Render
  //
  return (
    <Box>
      <Heading type="h2" title="Confirm Card Payment">
        <Aside>
          <Link to="/payment-intent" onClick={onReset}>
            <Icon size="small" color="blue" icon="fas fa-undo-alt" tooltip="Reset form" />
          </Link>
        </Aside>
        <Summary>
          Now the intent to pay has been requested, we need to <a href="https://stripe.com/docs/js/payment_intents/confirm_card_payment" target="_blank" rel="noreferrer">confirm this payment</a> to
          allow the customer to verify any PSD2/3DS/3DS2 prompts (if applicable). <code>payment_method.id</code> is only required for members to confirm the card 
          the customer wants to use (as they may have multiple).
        </Summary>
      </Heading>

      <Form onSubmit={onSubmit}>
        <Grid>
          <Input value={clientSecret} placeholder="Client Secret" onChange={onClientSecretChange} />
        </Grid>
        <Grid>
          <Input value={paymentMethodId} placeholder="Payment Method ID (members only)" onChange={onPaymentMethodIdChange} />
        </Grid>
        <Grid>
          <Button loading={loader.isLoading}>Confirm Card Payment</Button>
        </Grid>

        {paymentIntentId && (
          <>
            <Grid>
              <Readonly value={paymentIntentId} placeholder="Payment Intent ID" reference={ref} />
              <Readonly value={status} placeholder="Status" />
            </Grid>
            {nextAction && (
              <Grid>
                <Readonly type="textarea" value={nextAction} placeholder="Next Action" />
              </Grid>
            )}
          </>
        )}

      </Form>
    </Box>
  );

}
