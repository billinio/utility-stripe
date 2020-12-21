import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export function Heading(props: Props) {

  return (
    <div className={style.container}>
      {props.children}
    </div>
  );

}
