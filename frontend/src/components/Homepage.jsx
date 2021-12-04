import React, { Component } from "react";
import styled from "styled-components";

import Categories from "./Categories";

function Homepage() {
  return (
    <Container>
      <Categories />
    </Container>
  );
}

const Container = styled.main`
  min-height: calc(100vh - 350px);
  padding: 10vw;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export default Homepage;
