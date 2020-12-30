import axios, { Method } from "axios";

import { SetupIntent } from "@stripe/stripe-js";
import { config } from "system/config";
import qs from "qs";

class Stripe {

  /**
   * Create a Setup Intent
   * 
   * @see https://stripe.com/docs/api/setup_intents/create
   */
  public async createSetupIntent(paymentMethodId: string): Promise<SetupIntent> {
    return this.request(
      "POST",
      "https://api.stripe.com/v1/setup_intents",
      {
        confirm: true,
        payment_method: paymentMethodId,
        usage: "off_session",
      },
    );
  }

  /**
   * Send the request to Stripe
   */
  private async request(method: Method, url: string, data?: Dictionary) {
    try {
      const request = await axios({
        method,
        url,
        data: data && qs.stringify(data) || undefined,
        headers: {
          Authorization: `Bearer ${config.stripe.secretKey}`,
          "content-type": "application/x-www-form-urlencoded",
        },
      });
      return request.data;
    } catch (error) {
      throw new Error(error.response.data.error.message || "Unknown error occurred on Stripe.");
    }
  }

}

export const stripe = new Stripe();
