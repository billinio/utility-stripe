import React from "react";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
}

export function HeaderHeading(props: Props) {

  return (
    <h1 className={style.container}>
      {props.children}
    </h1>
  );

}
