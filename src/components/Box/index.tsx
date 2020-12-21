import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export function Box(props: Props) {

  return (
    <section className={style.container}>
      {props.children}
    </section>
  );

}
