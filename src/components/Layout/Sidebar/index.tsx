import React from "react";
import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export function Sidebar(props: Props) {

  return (
    <aside className={style.container}>
      {props.children}
    </aside>
  );

}
