import React, { useEffect, useState } from "react";
import { Types, stripe } from "services/stripe";

import { Alert } from "components/Alert";
import { Icon } from "components/Icon";
import classNames from "classnames";
import faker from "faker";
import style from "./style.module.css";
import { useLoader } from "components/Loader";

export function Customer() {
  const loader = useLoader();
  const [customers, setCustomers] = useState<Types.Customer[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [guest, setGuest] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loader.loading();
    setStorage(null);
    (async () => {
      await listCustomers();
      loader.loaded();
    })();
    return function cleanup() {
      setStorage(null);
    };
  }, []);

  const onGuestClick = () => {
    setGuest(true);
    setStorage(null);
    Alert.info(
      "Perform all requests as a guest",
      "Guest activated",
    );
  };

  const onChangeClick = () => {
    if (!hasCustomers) {
      return;
    }
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const name = customer.name!.split(" ");
    const firstName = name[0];
    const lastName = name[1];
    setStorage(customer.id);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(customer.email!);
    setGuest(false);
    Alert.info(
      `Perform all requests as ${firstName} ${lastName}`,
      "Customer changed",
    );
  };

  const onCreateClick = async () => {
    loader.loading();
    setCreating(true);
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email(firstName, lastName);
    const customer = await stripe.createCustomer(firstName, lastName, email);
    await listCustomers();
    setStorage(customer.id);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setGuest(false);
    setCreating(false);
    Alert.info(
      `${firstName} ${lastName} created`,
      "Customer created and assigned",
    );
    loader.loaded();
  };

  const listCustomers = async () => {
    const list = await stripe.listCustomers();
    setCustomers(list);
  };

  const hasCustomers = (): boolean => {
    return !!customers.length;
  };

  const showChangeCustomer = (): boolean => {
    if (!hasCustomers()) {
      return false;
    }
    return customers.length > 1 || guest;
  };

  const setStorage = (id: string | null) => {
    if (!id) {
      return sessionStorage.removeItem("customer_id");
    }
    return sessionStorage.setItem("customer_id", id);
  };

  return (
    <div className={style.container}>
      <section className={classNames(style.selected, guest ? style.guest : style.customer)}>
        <div className={style.avatar}>
          <i className={classNames(style.action, style.anon, "fas fa-user-secret")} onClick={onGuestClick} title="As a guest" />
          {showChangeCustomer() && (
            <i className={classNames(style.action, style.change, "fas fa-sync-alt")} onClick={onChangeClick} title="Change customer" />
          )}
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
        <div className={classNames(style.button, !creating || style.disabled)} onClick={onCreateClick}>
          <Icon color="orange" icon="fas fa-user-plus" />
          <div className={style.details}>
            {creating ? (
              <>
                <p className={style.title}>Creating customer</p>
                <small className={style.desc}>Please wait...</small>
              </>
            ) : (
                <>
                <p className={style.title}>Create new customer</p>
                <small className={style.desc}>Create random customer on Stripe</small>
                </>
              )}
          </div>
        </div>
      </section>
    </div>
  );

}
