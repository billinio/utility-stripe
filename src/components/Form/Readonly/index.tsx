import React from "react";
import classNames from "classnames";
import style from "./style.module.css";

interface Props {
  placeholder: string;
  value: string;
  type?: "input" | "textarea";
  reference?: React.MutableRefObject<HTMLInputElement>;
  rows?: number;
}

export function Readonly({ placeholder, value, type = "input", reference, rows = 8 }: Props) {

  const label = () => <span className={style.label}>{placeholder}</span>;

  if (type === "input") {
    return (
      <div className={classNames(style.container, style.input)}>
        {label()}
        <input
          type="text"
          readOnly
          className={style.field}
          value={value}
          ref={reference}
        />
      </div>
    );
  }
  return (
    <div className={classNames(style.container, style.textarea)}>
      {label()}
      <textarea
        readOnly
        className={style.field}
        value={value}
        rows={rows}
      />
    </div>
  );

}
