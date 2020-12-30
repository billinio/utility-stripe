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
import { useLoader } from "components/Loading";

export function CreateSetupIntent() {
  const [clientSecret, setClientSecret] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const [status, setStatus] = useState("");
  const loader = useLoader();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  //
  // Events
  //
  const onReset = async () => {
    setPaymentMethodId("");
    setClientSecret("");
    setStatus("");
    setNextAction("");
  };

  const onSubmit = async () => {
    loader.loading();
    try {
      const request = await stripe.createSetupIntent(paymentMethodId);
      loader.loaded();
      setClientSecret(request.client_secret || "");
      setStatus(request.status);
      setNextAction(JsonToString(request.next_action));
      Alert.info("Copied to clipboard", "Client Secret");
      ref.current.focus();
      ref.current.select();
      document.execCommand("copy");
    } catch (error) {
      Alert.error(error.response.data.error.message, "Something went wrong!");
      loader.loaded();
    }
  };

  const onPaymentMethodIdChange = (value: string) => {
    setPaymentMethodId(value);
  };

  //
  // Render
  //
  return (
    <Box>
      <Heading type="h2" title="Create Setup Intent">
        <Aside>
          <Link to="/setup-intent" onClick={onReset}>
            <Icon size="small" color="blue" icon="fas fa-undo-alt" tooltip="Reset form" />
          </Link>
        </Aside>
        <Summary>
          Using the <code>payment_method.id</code> from above we can save these payment credentials for future payments.
          We can also optionally assign this <a href="https://stripe.com/docs/api/setup_intents" target="_blank" rel="noreferrer">Setup Intent</a> to
          a customer on Stripe without immediately collecting a payment. This form will return a <code>setup_intent.client_secret</code>.
        </Summary>
      </Heading>

      <Form onSubmit={onSubmit}>
        <Grid layout="small-right">
          <Input value={paymentMethodId} placeholder="Payment Method ID" onChange={onPaymentMethodIdChange} />
        </Grid>
        <Grid>
          <Button loading={loader.isLoading}>Create Setup Intent</Button>
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
