import React from "react";
import styled from "styled-components";
import data from "./dummydata/data.json";
import { Link } from "react-router-dom";

function Categories() {
  const content = data.map((value) => (
    // <Link to={`/courses/${value.id}`}>
    <Link to="/courses/clone">
      <Wrap>
        <CategoryImage alt="" src={value.img}></CategoryImage>
        <CategoryTitle>{value.title}</CategoryTitle>
        <CategoryDescription>{value.description}</CategoryDescription>
      </Wrap>
    </Link>
  ));

  return (
    <Container>
      <Title>Danh mục khóa học</Title>
      <Content>{content}</Content>
    </Container>
  );
}

export default Categories;

const Container = styled.div``;

const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Content = styled.div`
  padding-top: 20px;
  display: flex;
  flex-flow: row wrap;
  gap: 50px;
  justify-content: space-around;
`;

const Wrap = styled.div`
  height: 50vh;
  background-color: #f7f9fa;
  border-radius: 10%;
  border: 3px solid rgba(5, 5, 5, 0.1);
  cursor: pointer;
  transition: all 314ms cubic-bezier(0.2, 0.4, 0.38, 0.7) 0s;
  box-shadow: rgb(0 0 0 / 75%) 0 16px 25px -12px,
    rgb(1 1 1 / 55%) 0 9px 16px -10px;

  &:hover {
    box-shadow: rgb(0 0 0 / 65%) 0 25px 36px -20px,
      rgb(1 1 1 / 45%) 0 16px 25px -12px;
    transform: scale(0.9875);
    border-color: rgba(5, 5, 5, 0.314);
  }
  padding: 0 5px;
`;

const CategoryImage = styled.img`
  margin: 20px 0;
  border-radius: 10%;
`;

const CategoryTitle = styled.div`
  padding: 0 20px;
  font-size: 16px;
  font-weight: 600;
`;

const CategoryDescription = styled.div`
  padding: 3px 20px 20px;
  font-size: 15px;
  font-weight: 500;
  inline-size: 300px;
  overflow-wrap: break-word;
`;
