import { BrowserRouter } from "react-router-dom";
import { Routes } from "routes";
import React from "react";
import ReactDOM from "react-dom";

import "./css/global.css";

ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById("root"),
);
