import React from "react";
import style from "./style.module.css";

interface Props {
  name: string;
}

export function Customer(props: Props) {

  return (
    <div className={style.container}>
      { props.name}
    </div>
  );

}
