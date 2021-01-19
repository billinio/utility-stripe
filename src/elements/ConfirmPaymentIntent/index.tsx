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
import { stripe } from "services/stripe";
import { useLoader } from "components/Loader";

export function ConfirmPaymentIntent() {
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [status, setStatus] = useState("");
  const loader = useLoader();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  //
  // Events
  //
  const onReset = async () => {
    setPaymentIntentId("");
    setClientSecret("");
    setStatus("");
    setNextAction("");
  };

  const onSubmit = async () => {
    loader.loading();
    try {
      const request = await stripe.confirmPaymentIntent(
        paymentIntentId,
      );
      setPaymentIntentId(request.id);
      setClientSecret(request.client_secret || "");
      setStatus(request.status);
      setNextAction(JsonToString(request.next_action));
      loader.loaded();
      Alert.info("Successfully confirmed", "Payment Intent");
    } catch (error) {
      Alert.error(error.message, "Something went wrong!");
      loader.loaded();
    }
  };

  const onPaymentIntentIdChange = (value: string) => {
    setPaymentIntentId(value);
  };

  //
  // Render
  //
  return (
    <Box>
      <Heading type="h2" title="Confirm Payment Intent">
        <Aside>
          <Link to="/payment-intent" onClick={onReset}>
            <Icon size="small" color="blue" icon="fas fa-undo-alt" tooltip="Reset form" />
          </Link>
        </Aside>
        <Summary>
          In most situations a payment intent will not need to be confirmed as the above <strong>Confirm Card Payment</strong> action will automatically
          confirm the intent. However, if the above <code>status</code> returns anything other than <code>succeeded</code> then you may need
          to <a href="https://stripe.com/docs/api/payment_intents/confirm" target="_blank" rel="noreferrer">confirm the payment intent</a>.
        </Summary>
      </Heading>

      <Form onSubmit={onSubmit}>
        <Grid layout="small-right">
          <Input value={paymentIntentId} placeholder="Payment Intent ID" onChange={onPaymentIntentIdChange} />
        </Grid>
        <Grid>
          <Button loading={loader.isLoading}>Confirm Payment Intent</Button>
        </Grid>

        {clientSecret && (
          <>
            <Grid>
              <Readonly value={clientSecret} placeholder="Client Secret" reference={ref} />
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
