/**
 * 404 Page when users navigate to a page that
 * does not exist
 */
import React from "react";

import MainLayout from "../../components/MainLayout/MainLayout";

import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";

export default function NotFound(props) {
  return (
    <MainLayout>
      <Container>
        <div style={{ textAlign: "center" }}>
          <h1>404 Page Not Found</h1>
          <Button href="/" appearance="outline" scale="l">
            Click here to return Home
          </Button>
        </div>
      </Container>
    </MainLayout>
  );
}
