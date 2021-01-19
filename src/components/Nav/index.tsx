import { Item } from "components/Nav/Item";
import { Logo } from "components/Logo";
import React from "react";
import style from "./style.module.css";

export function Nav() {

  return (
    <nav className={style.container}>
      <Logo />
      <div className={style.separator} />
      <Item to="/setup-intent" label="Setup Intent">
        <i className="fas fa-save"></i>
      </Item>
      <Item to="/payment-intent" label="Payment Intent">
        <i className="far fa-credit-card"></i>
      </Item>
    </nav>
  );

}
