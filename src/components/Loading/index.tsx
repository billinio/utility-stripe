import React, { useState } from "react";

import style from "./style.module.css";

export const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loading = () => {
    setIsLoading(true);
    NProgress.start();
  };

  const loaded = () => {
    setIsLoading(false);
    NProgress.done();
  };

  const renderBlocking = () => {
    return (
      <div className={style.container}>
        <div className={style.blocking}>
          <div className={style.block1} />
          <div className={style.block2} />
          <div className={style.block3} />
          <div className={style.block4} />
          <div className={style.block5} />
        </div>
      </div>
    );
  };

  return { isLoading, loading, loaded, renderBlocking };
};
