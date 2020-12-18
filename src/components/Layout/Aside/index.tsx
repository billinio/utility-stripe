import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export function Aside(props: Props) {

  return (
    <aside className={style.aside}>
      {props.children}
    </aside>
  );

}
