import { StripeElementStyle } from "@stripe/stripe-js";

export const StripeStyle: StripeElementStyle = {
  base: {
    backgroundColor: "#ffffff",
    fontSize: "18px",
    color: "#525f7f",
    fontFamily: "Camphor, sans-serif",
    fontWeight: "400",
    letterSpacing: "1px",
    "::placeholder": {
      color: "#c0c2d5",
    },
  },
  invalid: {
    color: "#e72d3d",
  },
};
