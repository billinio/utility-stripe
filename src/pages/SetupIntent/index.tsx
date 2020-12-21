import { useHistory, useLocation, Link } from "react-router-dom";
import React, { useEffect } from "react";

import { Box } from "components/Box";
import { Grid } from "components/Grid";
import { Header } from "components/Header";
import { HeaderAside } from "components/Header/HeaderAside";
import { HeaderHeading } from "components/Header/HeaderHeading";
import { Icon } from "components/Icon";
import { Main } from "components/Layout/Main";
import { Sidebar } from "components/Layout/Sidebar";

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

        {/* Header */}
        <Header>
          <HeaderHeading>Setup Intent</HeaderHeading>
          <HeaderAside>
            <Link to="/setup-intent" onClick={() => history.go(0)}>
              <Icon icon="fas fa-undo-alt" tooltip="Reset form" />
            </Link>
          </HeaderAside>
        </Header>

        {/* Payment Method */}
        <Grid>
          <Box>...</Box>
        </Grid>

      </Main>
      <Sidebar>Sidebar</Sidebar>
    </>
  );

}
