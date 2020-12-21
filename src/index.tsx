import { BrowserRouter } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Routes } from "routes";
import React from "react";
import ReactDOM from "react-dom";
import { config } from "system/config";

const stripe = loadStripe(config.stripe.publicKey);

import "./css/global.css";

ReactDOM.render(
  <Elements stripe={stripe}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Elements>,
  document.getElementById("root"),
);
