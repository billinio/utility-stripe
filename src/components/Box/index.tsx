import React from "react";
import classNames from "classnames";
import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
  classNames?: string | string[] | boolean;
}

export function Box(props: Props) {

  return (
    <section className={classNames(style.container, props.classNames)}>
      {props.children}
    </section>
  );

}
