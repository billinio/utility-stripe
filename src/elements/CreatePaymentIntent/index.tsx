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
import { Select } from "components/Form/Select";
import { Summary } from "components/Heading/Summary";
import { stripe } from "services/stripe";
import { useLoader } from "components/Loader";

export function CreatePaymentIntent() {
  const [amount, setAmount] = useState("0.00");
  const [clientSecret, setClientSecret] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [nextAction, setNextAction] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [status, setStatus] = useState("");
  const loader = useLoader();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  //
  // Events
  //
  const onReset = async () => {
    setAmount("0.00");
    setCurrency("USD");
    setPaymentMethodId("");
    setClientSecret("");
    setNextAction("");
    setPaymentIntentId("");
    setStatus("");
  };

  const onSubmit = async () => {
    if (!sessionStorage.getItem("customer_id") && !paymentMethodId) {
      return Alert.error(
        "You must enter a Payment Method ID if performing this task as a guest customer.",
        "Payment Method Missing",
      );
    }
    loader.loading();
    try {
      const request = await stripe.createPaymentIntent(
        amount,
        currency,
        paymentMethodId,
      );
      setPaymentIntentId(request.id);
      setClientSecret(request.client_secret || "");
      setStatus(request.status);
      setNextAction(JsonToString(request.next_action));
      loader.loaded();
      Alert.info("Copied to clipboard", "Payment Intent ID");
      ref.current.focus();
      ref.current.select();
      document.execCommand("copy");
    } catch (error) {
      Alert.error(error.message, "Something went wrong!");
      loader.loaded();
    }
  };

  const onAmountChange = (value: string) => {
    setAmount(value);
  };

  const onCurrencyChange = (value: string) => {
    setCurrency(value);
  };

  const onPaymentMethodIdChange = (value: string) => {
    setPaymentMethodId(value);
  };

  //
  // Renders
  //
  const currencySymbol = (): string => {
    switch (currency) {
      case "USD":
        return "fa-dollar-sign";
      case "GBP":
        return "fa-pound-sign";
      case "EUR":
        return "fa-euro-sign";
      default:
        return "fa-coins";
    }
  };

  return (
    <Box>
      <Heading type="h2" title="Create Payment Intent">
        <Aside>
          <Link to="/payment-intent" onClick={onReset}>
            <Icon size="small" color="blue" icon="fas fa-undo-alt" tooltip="Reset form" />
          </Link>
        </Aside>
        <Summary>
          To make a payment we need to <a href="https://stripe.com/docs/api/payment_intents/create" target="_blank" rel="noreferrer">create a Payment Intent</a> with Stripe. Using
          the <code>payment_method.id</code> from the above form we can assign this payment intent to that card, alternatively we can use a customer on the right (assuming they
          have a card assigned to them).
        </Summary>
      </Heading>

      <Form onSubmit={onSubmit}>
        <Grid layout="small-right">
          <Input type="number" value={amount} placeholder="Amount" onChange={onAmountChange} icon={`fas ${currencySymbol()}`} />
          <Select value={currency} onChange={onCurrencyChange}>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="EUR">EUR</option>
          </Select>
        </Grid>
        <Grid>
          <Input value={paymentMethodId} placeholder="Payment Method ID (required if guest)" onChange={onPaymentMethodIdChange} />
        </Grid>
        <Grid>
          <Button loading={loader.isLoading}>Create Payment Intent</Button>
        </Grid>

        {clientSecret && (
          <>
            <Grid>
              <Readonly value={paymentIntentId} placeholder="Payment Intent ID" reference={ref} />
            </Grid>
            <Grid layout="small-right">
              <Readonly value={clientSecret} placeholder="Client Secret" />
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
