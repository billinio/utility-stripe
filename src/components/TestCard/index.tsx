import React, { useRef } from "react";

import { Alert } from "components/Alert";
import { Icon } from "components/Icon";
import style from "./style.module.css";

interface Props {
  number: string;
  icon: string;
  description: string;
}

export function TestCard(props: Props) {
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;

  const onClick = () => {
    ref.current.focus();
    ref.current.select();
    document.execCommand("copy");
    Alert.info("Copied to clipboard", "Card Number");
  };

  return (
    <div className={style.container} onClick={onClick}>
      <div className={style.icon}><Icon icon={props.icon} color="orange" /></div>
      <div className={style.details}>
        <input ref={ref} type="text" readOnly className={style.number} value={props.number} />
        <small className={style.description}>{props.description}</small>
      </div>
    </div>
  );

}
