import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";

function CourseContent() {
  const { courseId } = useParams();
  console.log(courseId);
  return <Container>abc</Container>;
}

export default CourseContent;

const Container = styled.div`
  min-height: calc(100vh - 350px);
  padding: 10vw;
  display: flex;
`;
