import React from "react";
import styled from "styled-components";

function CourseContent() {
  return (
    <Container>
      <TopicWrap>
        <Title>Chủ đề 1: Một chủ đề nào đó</Title>
        <Title>Chủ đề 2: Một chủ đề nào đó hết sức đần độn</Title>
        <Title>Chủ đề 3: Một chủ đề nào đó không đần độn cho lắmzzzzz</Title>
        <Title>Chủ đề 4: Một chủ đề nào đó của đức múp</Title>
      </TopicWrap>
      <Content>def</Content>
    </Container>
  );
}

const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-flow: row nowrap;
`;

const NavTitle = styled.div`
  background-color: #f0f0f0;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.7rem 1rem;
  border-left: 5px solid #3d4450;
  color: #1c1d1f;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  button {
    background-color: #dddddd;
    padding: 3px 8px;
  }
`;

const TopicWrap = styled.div`
  display: flex;
  width: 20%;
  flex-flow: column nowrap;
  overflow-y: auto;
  height: 16rem;
  position: sticky;
  background-color: #f0f0f0;
  right: 0px;
  height: 90vh;
`;

const Title = styled.div`
  padding: 1.5rem 0.75vw;
  font-weight: 500;
  word-wrap: break-word;
  font-size: 1.15rem;
  cursor: pointer;
  background: linear-gradient(to left, #f0f0f0 50%, white 50%) right;
  background-size: 200%;
  transition: 0.471s ease-out;
  &:hover {
    background-color: white;
    color: black;
    background-position: left;
  }
  &.active {
    background-color: black;
    background-position: 0 0;
    color: #fff;
  }
`;

const Content = styled.div`
  background-color: white;
  width: 100%;
`;

export default CourseContent;