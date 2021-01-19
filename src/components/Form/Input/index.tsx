import React from "react";
import classNames from "classnames";
import style from "./style.module.css";

interface Props {
  value: string;
  placeholder: string;
  onChange?: (value: string) => void;
  type?: "text" | "number";
  icon?: string;
}

export function Input({ value, placeholder, onChange, type = "text", icon }: Props) {

  return (
    <div className={style.container}>
      {icon && <i className={classNames(style.icon, icon)} />}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={style.field}
        onChange={(event) => { onChange && onChange(event.target.value); }}
      />
    </div>
  );

}
