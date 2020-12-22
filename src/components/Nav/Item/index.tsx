import { Link, useLocation } from "react-router-dom";

import React from "react";
import classNames from "classnames";
import style from "./style.module.css";

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
    <Link className={classNames(style.container, !isActive() || style.active)} to={to}>
      <span className={style.label}>{label}</span>
      {children}
    </Link>
  );

}
