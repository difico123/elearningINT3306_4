import dummydata from "../../dummydata/data2.json";
import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseService from "../../service/courseService";
import { SearchIcon } from "../common/icons";

function CloneCategoryCourses() {
  const { id } = useParams();
  const [searchKeyword, setSearchKeyword] = useState("");

  const [category, setCategory] = useState(id);
  const [keyword, setKeyword] = useState("");

  const [getCourses, setCourses] = useState([
    {
      imageUrl: "",
      courseId: "",
      name: "",
      description: "",
      categoryId: "",
      instructorName: "",
      rating: "",
      register: "",
    },
  ]);

  useEffect(() => {
    CourseService.getAll(id).then((response) => {
      setCourses(response.courses);
    });
  }, []);

  const searchByKeyword = (e) => {
    CourseService.getAll(category, e.target.value).then((data) => {
      setCourses(data.courses);
      setKeyword(e.target.value);
    });
  };

  const content = getCourses.map((course) => (
    <Link to={`/category/${id}/course/${course.courseId}`}>
      <Wrap>
        <CourseImage alt="" src={course.imageUrl}></CourseImage>
        <CourseTitle>{course.name}</CourseTitle>
        <CourseTitle>{course.instructorName}</CourseTitle>
        <CourseDescription>{course.description}</CourseDescription>
        <CourseInfo>
          <CourseAttendance>Số học viên: {course.register}</CourseAttendance>
          <CourseRating>
            Đánh giá: {course.rating ? course.rating : 0}
          </CourseRating>
        </CourseInfo>
      </Wrap>
    </Link>
  ));

  return (
    <Container>
      <Title>Các khóa học nổi bật về Lập trình</Title>
      <SearchBar>
        <input
          onChange={searchByKeyword}
          type="text"
          placeholder="Tìm kiếm khóa học..."
        />
        <button type="submit">
          <CustomSearch />
        </button>
      </SearchBar>
      <hr></hr>
      <Content>
        <LeftNav>
          <Filter>
            <FilterTitle>Ngôn ngữ</FilterTitle>
            <FilterWrap>
              <input value="" type="radio" id="javascript" name="z" />
              <label for="javascript">Javascript</label>
            </FilterWrap>
            <FilterWrap>
              <input value="" type="radio" id="php" name="z" />
              <label for="php">PHP</label>
            </FilterWrap>
            <FilterWrap>
              <input value="" type="radio" id="cpp" name="z" />
              <label for="cpp">C++</label>
            </FilterWrap>
            <FilterWrap>
              <input value="" type="radio" id="java" name="z"></input>
              <label for="java">Java</label>
            </FilterWrap>
          </Filter>
          <Filter>
            <FilterTitle>Đánh giá</FilterTitle>
            <FilterWrap>
              <input value="" type="radio" id="fourhalf" name="x" />
              <label for="fourhalf">4.5 sao trở lên</label>
            </FilterWrap>
            <FilterWrap>
              <input value="" type="radio" id="four" name="x" />
              <label for="four">4 sao trở lên</label>
            </FilterWrap>
            <FilterWrap>
              <input value="" type="radio" id="threehalf" name="x" />
              <label for="threehalf">3.5 sao trở lên</label>
            </FilterWrap>
            <FilterWrap>
              <input value="" type="radio" id="three" name="x"></input>
              <label for="three">3 sao trở lên</label>
            </FilterWrap>
            <FilterWrap>
              <input value="" type="radio" id="three" name="x"></input>
              <label for="other">Tất cả</label>
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
  min-height: 100vh;
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
  height: 50vh;
  flex-direction: column;
  background-color: #f7f9fa;
  justify-content: space-between;
  border: 4px solid black;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FilterTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  padding-bottom: 10px;
  inline-size: 200px;
  overflow-wrap: break-word;
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
  border: 3px solid rgba(5, 5, 5, 0.1);
  cursor: pointer;
  transition: all 314ms cubic-bezier(0.2, 0.4, 0.38, 0.7) 0s;
  box-shadow: rgb(0 0 0 / 35%) 0 16px 25px -12px,
    rgb(1 1 1 / 25%) 0 9px 16px -10px;
  &:hover {
    box-shadow: rgb(0 0 0 / 65%) 0 25px 36px -20px,
      rgb(1 1 1 / 45%) 0 16px 25px -12px;
    transform: scale(0.9875);
    border-color: rgba(5, 5, 5, 0.314);
  }
  padding: 0 5px;
`;

const CourseImage = styled.img`
  margin-bottom: 20px;
  height: 200px;
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
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 900px;
  border: 2px solid black;

  cursor: pointer;
  padding: 8px 25px;
  cursor: text;
  font-weight: lighter;

  input {
    padding-left: 10px;
    border: none;
    width: 90%;
    autocomplete: off;
    background-image: none;
    font-size: 15px;
    font-weight: lighter;
  }
  button {
    cursor: pointer;
    border: none;
    background: transparent;
  }
  textarea:focus,
  input:focus {
    outline: none;
  }
`;

const CustomSearch = styled(SearchIcon)``;
