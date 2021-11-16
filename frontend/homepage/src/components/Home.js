import React, { Component } from "react";
import styled from "styled-components";

function Home() {
  return (
    <Wrap>
      <Categories></Categories>
    </Wrap>
  );
}
export default Home;

const Wrap = styled.div`
  height: 100vh;
  width: 100vw;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 150px;
  padding-top: 10vh;
  padding-left: 10vw;
`;
