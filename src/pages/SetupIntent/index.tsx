import { useHistory, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

import { Aside } from "components/Layout/Aside";
import { Main } from "components/Layout/Main";

export function SetupIntent() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      history.replace("/setup-intent");
    }
    document.title = "Setup Intent - billin.io";
  });

  return (
    <>
      <Main>Main</Main>
      <Aside>Aside</Aside>
    </>
  );

}
