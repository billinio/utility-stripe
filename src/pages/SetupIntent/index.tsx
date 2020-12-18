import { useHistory, useLocation, Link } from "react-router-dom";
import React, { useEffect } from "react";

import { Aside } from "components/Layout/Aside";
import { Header } from "components/Header";
import { Icon } from "components/Icon";
import { Main } from "components/Layout/Main";
import { Side } from "components/Header/Side";
import { Title } from "components/Header/Title";

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
      <Main>
        <Header>
          <Title>Setup Intent</Title>
          <Side>
            <Link to="/setup-intent" onClick={() => history.go(0)}>
              <Icon icon="fas fa-undo-alt" tooltip="Reset form" />
            </Link>
          </Side>
        </Header>
      </Main>
      <Aside>Aside</Aside>
    </>
  );

}
