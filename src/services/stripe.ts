import axios, { Method } from "axios";

import { SetupIntent } from "@stripe/stripe-js";
import { Stripe as Types } from "stripe";
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
      "/setup_intents",
      {
        confirm: true,
        payment_method: paymentMethodId,
        usage: "off_session",
      },
    );
  }

  /**
   * List customers on Stripe (10 customers)
   * 
   * @see https://stripe.com/docs/api/customers/list
   */
  public async listCustomers(): Promise<Types.Customer[]> {
    const request = await this.request(
      "GET",
      "/customers",
    );
    return request.data;
  }

  /**
   * Send the request to Stripe
   */
  private async request(method: Method, endpoint: string, data?: Dictionary) {
    try {
      console.log("CALLED");
      const request = await axios({
        method,
        url: `https://api.stripe.com/v1${endpoint}`,
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
