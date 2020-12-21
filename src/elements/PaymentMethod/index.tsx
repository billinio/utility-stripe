import React from "react";

import { Box } from "components/Box";
import { Heading } from "components/Heading";
import { Title } from "components/Heading/Title";
import { Aside } from "components/Heading/Aside";
import { Summary } from "components/Heading/Summary";
import { Icon } from "components/Icon";

export function PaymentMethod() {

  return (
    <Box>
      <Heading>
        <Title>Title</Title>
        <Aside>
          <Icon color="orange" icon="fas fa-undo-alt" tooltip="Reset form" />
          <Icon color="orange" icon="fas fa-undo-alt" tooltip="Reset form" />
        </Aside>
        <Summary>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit voluptatum mollitia blanditiis vel molestiae nostrum maxime, minus debitis velit! Ut itaque.</Summary>
      </Heading>

      <p>under</p>
    </Box>
  );

}
