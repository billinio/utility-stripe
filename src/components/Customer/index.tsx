import { Icon } from "components/Icon";
import React from "react";
import classNames from "classnames";
import style from "./style.module.css";

export function Customer() {

  const onCreateClick = () => {
    console.log("Create customer...");
  };

  return (
    <div className={style.container}>
      <section className={classNames(style.selected, style.customer)}>
        <div className={style.avatar}>
          <i className={classNames(style.action, style.change, "fas fa-sync-alt")} title="As a guest" />
          <i className={classNames(style.action, style.anon, "fas fa-user-secret")} title="Change customer" />
          <i className={classNames(style.icon, style.iconCustomer, "fas fa-user")} />
          <i className={classNames(style.icon, style.iconGuest, "fas fa-user-secret")} />
        </div>
        <p className={style.name}>Jack Smith</p>
        <small className={style.label}>something@foobar.com</small>
      </section>

      <section className={style.buttons}>
        <div className={style.button} onClick={onCreateClick}>
          <Icon color="orange" icon="fas fa-user-plus" />
          <div className={style.details}>
            <p className={style.title}>Create new customer</p>
            <small className={style.desc}>Create random customer on Stripe</small>
          </div>
        </div>
      </section>
    </div>
  );

}
