import React from "react";
import style from "./style.module.css";

interface Props {
  children: React.ReactNode;
  type?: "submit" | "button";
  loading?: boolean;
  disabled?: boolean;
}

export function Button({ children, type = "submit", loading = false, disabled = false }: Props) {

  return (
    <button type={type} disabled={disabled || loading} className={style.container}>
      {loading ? "Please wait..." : children}
    </button>
  );

}
