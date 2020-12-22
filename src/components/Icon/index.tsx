import React from "react";
import classNames from "classnames";
import style from "./style.module.css";

interface Props {
  icon: string;
  color?: "blue" | "orange" | "white";
  size?: "default" | "small";
  tooltip?: string;
}

export function Icon({ color = "white", size = "default", icon, tooltip }: Props) {

  return (
    <div className={classNames(style.container, style[color], style[size])}>
      <i className={icon} />
      {tooltip && (
        <div className={style.tooltip}>
          <i />
          {tooltip}
        </div>
      )}
    </div>
  );

}
