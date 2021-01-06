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
import delay from "delay";
import { stripe } from "services/stripe";
import { useLoader } from "components/Loader";

export function CreatePaymentIntent() {
  const loader = useLoader();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  //
  // Events
  //
  const onReset = async () => {
    console.log("Reset...");
  };

  const onSubmit = async () => {
    loader.loading();
    try {
      delay(1000);
      loader.loaded();
      Alert.info("Copied to clipboard", "Client Secret");
      // ref.current.focus();
      // ref.current.select();
      // document.execCommand("copy");
    } catch (error) {
      Alert.error(error.message, "Something went wrong!");
      loader.loaded();
    }
  };

  //
  // Render
  //
  return (
    <Box>
      <Heading type="h2" title="Create Payment Intent">
        <Aside>
          <Link to="/payment-intent" onClick={onReset}>
            <Icon size="small" color="blue" icon="fas fa-undo-alt" tooltip="Reset form" />
          </Link>
        </Aside>
        <Summary>
          Bla Bla Bla
        </Summary>
      </Heading>

      <Form onSubmit={onSubmit}>
        <Grid>
          <Button loading={loader.isLoading}>Create Payment Intent</Button>
        </Grid>
      </Form>
    </Box>
  );

}
