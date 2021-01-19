import React from "react";
import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
  value: string;
  onChange?: (value: string) => void;
}

export function Select({ children, value, onChange }: Props) {

  return (
    <div className={style.container}>
      <select className={style.field} value={value} onChange={(event) => { onChange && onChange(event.target.value); }}>
        {children}
      </select>
    </div>
  );

}
