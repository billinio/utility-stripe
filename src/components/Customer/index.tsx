import React, { useState } from "react";

import { Icon } from "components/Icon";
import classNames from "classnames";
import faker from "faker";
import style from "./style.module.css";

export function Customer() {
  const [firstName, setFirstName] = useState(faker.name.firstName());
  const [lastName, setLastName] = useState(faker.name.lastName());
  const [email, setEmail] = useState(faker.internet.email());
  const [guest, setGuest] = useState(true);

  const onGuestClick = () => {
    setGuest(true);
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const onChangeClick = () => {
    const customer = generateCustomerDetails();
    setGuest(false);
    console.log(customer);
  };

  const onCreateClick = () => {
    console.log("Create customer...");
  };

  const generateCustomerDetails = () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    return { firstName, lastName, email };
  };

  return (
    <div className={style.container}>
      <section className={classNames(style.selected, guest ? style.guest : style.customer)}>
        <div className={style.avatar}>
          <i className={classNames(style.action, style.anon, "fas fa-user-secret")} onClick={onGuestClick} title="As a guest" />
          <i className={classNames(style.action, style.change, "fas fa-sync-alt")} onClick={onChangeClick} title="Change customer" />
          <i className={classNames(style.icon, style.iconCustomer, "fas fa-user")} />
          <i className={classNames(style.icon, style.iconGuest, "fas fa-user-secret")} />
        </div>
        <p className={style.name}>
          {guest ? "Guest" : `${firstName} ${lastName}`}
        </p>
        <small className={style.label}>
          {guest ? "Perform all requests as a guest" : email}
        </small>
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
