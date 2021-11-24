import dummydata from "./dummydata/data2.json";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function CloneCategoryCourses() {
  const content = dummydata.map((value) => (
    <Link to={`/courses/clone/web-dev/${value.id}`}>
      <Wrap>
        <CourseImage alt="" src={value.img}></CourseImage>
        <CourseTitle>{value.title}</CourseTitle>
        <CourseDescription>{value.description}</CourseDescription>
        <CourseInfo>
          <CourseAttendance>{value.attendance} học viên</CourseAttendance>
          <CourseRating>Đánh giá: {value.rating}</CourseRating>
        </CourseInfo>
      </Wrap>
    </Link>
  ));

  return (
    <Container>
      <Title>Các khóa học nổi bật về Lập trình</Title>
      <hr></hr>
      <Content>
        <LeftNav>
          <Filter>
            <FilterTitle>Ngôn ngữ</FilterTitle>
            <FilterWrap>
              <input value="" type="checkbox" id="javascript" name="" />
              <label for="javascript">Javascript</label>
            </FilterWrap>
            <FilterWrap>
              <input value="" type="checkbox" id="php" name="" />
              <label for="php">PHP</label>
            </FilterWrap>
            <FilterWrap>
              <input value="" type="checkbox" id="cpp" name="" />
              <label for="cpp">C++</label>
            </FilterWrap>
            <FilterWrap>
              <input value="" type="checkbox" id="java" name=""></input>
              <label for="java">Java</label>
            </FilterWrap>
          </Filter>
          <Filter>
            <FilterTitle>Đánh giá</FilterTitle>
            <FilterWrap>
              <input value="" type="checkbox" id="fourhalf" name="" />
              <label for="fourhalf">4.5 sao trở lên</label>
            </FilterWrap>
            <FilterWrap>
              <input value="" type="checkbox" id="four" name="city" />
              <label for="four">4 sao trở lên</label>
            </FilterWrap>
            <FilterWrap>
              <input value="" type="checkbox" id="threehalf" name="city" />
              <label for="threehalf">3.5 sao trở lên</label>
            </FilterWrap>
            <FilterWrap>
              <input value="" type="checkbox" id="three" name="city"></input>
              <label for="three">3 sao trở lên</label>
            </FilterWrap>
          </Filter>
        </LeftNav>
        <Courses>{content}</Courses>
      </Content>
      <Page></Page>
    </Container>
  );
}

const Container = styled.div`
  min-height: calc(100vh - 350px);
  padding: 40px 3vw 50px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
`;

const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 50px;
`;

const LeftNav = styled.div`
  padding: 30px;
  display: flex;
  height: 40vh;
  flex-direction: column;
  width: 25vw;
  background-color: #f7f9fa;
  justify-content: space-between;
  border: 4px solid black;
  border-radius: 10%;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
`;

const FilterTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  padding-bottom: 10px;
`;

const FilterWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  gap: 12px;
  label {
    font-size: 15px;
  }
`;

const Courses = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 50px;
`;

const Wrap = styled.div`
  width: 17vw;
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

const CourseImage = styled.img`
  margin: 20px 0;
  border-radius: 10%;
`;

const CourseTitle = styled.div`
  padding: 0 20px;
  font-size: 16px;
  font-weight: 600;
  height: 5.7vh;
`;

const CourseDescription = styled.div`
  padding: 3px 20px 20px;
  font-size: 15px;
  font-weight: 500;
  inline-size: calc(17vw - 5px);
  overflow-wrap: break-word;
  height: 8vh;
`;

const CourseInfo = styled.div`
  padding: 3px 20px 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const CourseRating = styled.div`
  font-weight: 600;
`;

const CourseAttendance = styled.div`
  font-weight: 600;
`;

const Page = styled.div``;

export default CloneCategoryCourses;
