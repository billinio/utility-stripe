import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export function HeaderAside(props: Props) {

  return (
    <aside className={style.container}>
      {props.children}
    </aside>
  );

}
