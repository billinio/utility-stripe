import "./css/global.css";
import "react-notifications-component/dist/theme.css";

import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import ReactDOM from "react-dom";
import ReactNotification from "react-notifications-component";
import { Routes } from "routes";
import { config } from "system/config";
import { loadStripe } from "@stripe/stripe-js";

const publicKey = config.stripe.publicKey;
const stripe = loadStripe(publicKey);

if (!publicKey.includes("_test_")) {
  console.warn("IMPORTANT:\nYou are using a live Stripe API Key. This is not advised, you have been warned!");
}

ReactDOM.render(
  <Elements stripe={stripe}>
    <BrowserRouter>
      <ReactNotification />
      <Routes />
    </BrowserRouter>
  </Elements>,
  document.getElementById("root"),
);
