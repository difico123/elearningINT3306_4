import React, { Component } from "react";
import styled from "styled-components";
import Login from "./auth/Login";
import Category from "../service/categoryService";

function Home() {
  return (
    <Wrap>
      <Categories></Categories>
      <div className="flex flex-col">
        <div className="bg-yellow-300">abc</div>
        <div className="bg-yellow-300">xyz</div>
      </div>
    </Wrap>
  );
}

const Wrap = styled.div`
  min-height: calc(100vh - 435px);
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 150px;
`;

export default Home;
