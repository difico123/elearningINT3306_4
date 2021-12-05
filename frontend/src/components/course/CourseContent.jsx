import React from "react";
import styled from "styled-components";

function CourseContent() {
  return (
    <Container>
      <TopicNav>
        <Wrap>
          <NavTitle>Khóa học HTML</NavTitle>
          <TopicTitle>
            <a target="_self" href="#">
              Chủ đề 1: Giới thiệu về HTML
            </a>
          </TopicTitle>
        </Wrap>
        <Wrap>
          <TopicTitle>
            <a target="_self" href="#">
              Chủ đề 1: Giới thiệu về HTML
            </a>
          </TopicTitle>
        </Wrap>
        <Wrap>
          <TopicTitle>
            <a target="_self" href="/z">
              Chủ đề 1: Giới thiệu về HTML
            </a>
          </TopicTitle>
        </Wrap>
        <Wrap>
          <TopicTitle>
            <a target="_self" href="#">
              Chủ đề 1: Giới thiệu về HTML
            </a>
          </TopicTitle>
        </Wrap>
        <Wrap>
          <TopicTitle>
            <a target="_self" href="#">
              Chủ đề 1: Giới thiệu về HTML
            </a>
          </TopicTitle>
        </Wrap>
      </TopicNav>
      <TopicContent>def</TopicContent>
    </Container>
  );
}

const Container = styled.div`
  min-height: calc(100vh - 435px);
  display: flex;
  flex-flow: row nowrap;
  gap: 3vw;
`;

const TopicNav = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 2vh;
  background-color: #e0e0e0;
`;

const Wrap = styled.div`
  inline-size: 15vw;
  overflow-wrap: break-word;
`;

const NavTitle = styled.div`
  font-size: 21px;
  padding-left: 1vw;
  padding-top: 2vh;
  margin: -4px 0 4px 0;
`;

const TopicTitle = styled.div`
  font-size: 1.25rem;
  padding: 2px 1vw 1px;
  color: white;
  background-color: #04aa6d;
`;

const NavContent = styled.div`
  padding: 2px 1px 1px 1vw;
`;

const TopicContent = styled.div``;

export default CourseContent;