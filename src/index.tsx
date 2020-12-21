import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Routes } from "routes";
import React from "react";
import ReactDOM from "react-dom";
import { config } from "system/config";

const publicKey = config.stripe.publicKey;
const stripe = loadStripe(publicKey);

if (!publicKey.includes("_test_")) {
  console.warn("IMPORTANT:\nYou are using a live Stripe API Key. This is not advised, you have been warned!");
}

import "./css/global.css";

ReactDOM.render(
  <Elements stripe={stripe}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Elements>,
  document.getElementById("root"),
);
