import React from "react";
import classNames from "classnames";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
  type?: "h1" | "h2" | "h3";
  title: string;
}

export function Heading({ children, type = "h1", title }: Props) {

  return (
    <header className={classNames(style.container, style[type])}>
      <h1 className={classNames(style.title)}>
        {title}
      </h1>
      {children}
    </header>
  );

}
