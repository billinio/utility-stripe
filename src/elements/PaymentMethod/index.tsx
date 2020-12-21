import React from "react";

import { Box } from "components/Box";
import { Heading } from "components/Heading";
import { Summary } from "components/Heading/Summary";

export function PaymentMethod() {

  return (
    <Box>
      <Heading type="h2" title="Payment Method">
        <Summary>
          Dolor sit amet consectetur adipisicing elit. Nisi debitis reprehenderit reiciendis iure id, ut optio recusandae
          iste perferendis quaerat itaque impedit inventore architecto. Reiciendis iure id, ut optio recusandae iste
          perferendis perspiciatis quaerat itaque impedit. <a href="https://stripe.com/docs/payments/payment-methods" target="_blank" rel="noreferrer">Find out more</a>.
        </Summary>
      </Heading>

      <p>under</p>
    </Box>
  );

}
