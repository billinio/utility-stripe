import { Nav } from "components/Nav";
import React from "react";
import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export function Container(props: Props) {

  return (
    <div className={style.container}>
      <Nav />
      {props.children}
    </div>
  );

}
