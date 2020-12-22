import React from "react";
import style from "./style.module.css";

interface Props {
  value: string;
  placeholder: string;
  onChange?: (value: string) => void;
  type?: "text";
}

export function Input({ value, placeholder, onChange, type = "text" }: Props) {

  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      className={style.container}
      onChange={(event) => { onChange && onChange(event.target.value); }}
    />
  );

}
