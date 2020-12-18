import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export function Header(props: Props) {

  return (
    <header className={style.container}>
      {props.children}
    </header>
  );

}
