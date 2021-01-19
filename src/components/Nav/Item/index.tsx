import React from "react";
import classNames from "classnames";
import style from "./style.module.css";
import { useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  to: string;
  label: string;
}

export function Item({ children, to, label }: Props) {
  const location = useLocation();

  const isActive = () => {
    return location.pathname.includes(to);
  };

  return (
    <a className={classNames(style.container, !isActive() || style.active)} href={to}>
      <span className={style.label}>{label}</span>
      {children}
    </a>
  );

}
