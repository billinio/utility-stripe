import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export function Title(props: Props) {

  return (
    <h2 className={style.container}>
      {props.children}
    </h2>
  );

}
