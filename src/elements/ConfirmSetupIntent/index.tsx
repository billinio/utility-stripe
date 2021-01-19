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

export function ConfirmSetupIntent() {
  const [setupIntentId, setSetupIntentId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [status, setStatus] = useState("");
  const loader = useLoader();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const stripe = Elements.useStripe() as Stripe.Stripe;

  //
  // Events
  //
  const onReset = async () => {
    setSetupIntentId("");
    setClientSecret("");
    setStatus("");
    setNextAction("");
  };

  const onSubmit = async () => {
    loader.loading();
    try {
      const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret);
      loader.loaded();
      if (error) {
        Alert.error(error.message, "Oops!");
      } else if (setupIntent) {
        setSetupIntentId(setupIntent.id);
        setStatus(setupIntent.status);
        setNextAction(JsonToString(setupIntent.next_action));
        Alert.info("Copied to clipboard", "Setup Intent ID");
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

  //
  // Render
  //
  return (
    <Box>
      <Heading type="h2" title="Confirm Setup Intent">
        <Aside>
          <Link to="/setup-intent" onClick={onReset}>
            <Icon size="small" color="blue" icon="fas fa-undo-alt" tooltip="Reset form" />
          </Link>
        </Aside>
        <Summary>
          Finally we can <a href="https://stripe.com/docs/api/setup_intents/confirm" target="_blank" rel="noreferrer">confirm the Setup Intent</a> using
          the <code>setup_intent.client_secret</code> from above. This form is where the PSD2/3DS/3DS2 prompt will happen (if applicable) for this
          specific payment method.
        </Summary>
      </Heading>

      <Form onSubmit={onSubmit}>
        <Grid layout="small-right">
          <Input value={clientSecret} placeholder="Client Secret" onChange={onClientSecretChange} />
        </Grid>
        <Grid>
          <Button loading={loader.isLoading}>Confirm Setup Intent</Button>
        </Grid>

        {setupIntentId && (
          <>
            <Grid>
              <Readonly value={setupIntentId} placeholder="Setup Intent ID" reference={ref} />
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
