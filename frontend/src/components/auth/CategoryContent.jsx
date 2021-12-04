import React from "react";
import styled from "styled-components";

function CategoryContent() {
  return (
    <Container>
      <FilterCourses>abc</FilterCourses>
      <CategoryCourses>
        <Wrap></Wrap>
      </CategoryCourses>
    </Container>
  );
}

export default CategoryContent;

const Container = styled.div`
  min-height: calc(100vh - 350px);
  padding: 10vw;
  display: flex;
`;

const FilterCourses = styled.div`
  display: flex;
  flex-flow: column wrap;
`;

const CategoryCourses = styled.div``;

const Wrap = styled.div``;
