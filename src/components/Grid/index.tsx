import React from "react";
import classNames from "classnames";

import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
  size?: "default" | "large";
  layout?: "even" | "small-right";
}

export function Grid({ children, size = "default", layout = "even" }: Props) {

  return (
    <div className={classNames(style.container, style[size], style[layout])}>
      {children}
    </div>
  );

}
