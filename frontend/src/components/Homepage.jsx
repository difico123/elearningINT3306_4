import React, { Component } from "react";
import styled from "styled-components";

import Categories from "./Categories";
import Viewers from "./Viewers";

function Homepage() {
  return (
    <Wrap>
      <Viewers />
      <Categories />
    </Wrap>
  );
}

const Wrap = styled.main`
  min-height: calc(100vh - 350px);
  padding: 10vw;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export default Homepage;
