import React from "react";
import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export function Main(props: Props) {

  return (
    <main className={style.container}>
      {props.children}
    </main>
  );

}
