import React from "react";
import styled from "styled-components";
import { Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseService from "../../../service/courseService";
import { ArrowBackIosIcon, ArrowForwardIosIcon,SearchIcon } from "../../common/icons";
import Toast from "../../common/toast"
import showToast from "../../../dummydata/toast"

function InstructorCourses() {
  const [getCourses, setCourses] = useState([]);
  const [change, setChange] = useState(false);

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastList, setToastList] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    CourseService.getInstructorCourses(keyword, currentPage).then((response) => {
      setCourses(response.courses);
    });
  }, [change]);

  const suspendCourse = (id) => (
    <SuspendButton
      onClick={() => {
        CourseService.suspendCourse(id).then((response) => {
          setChange(!change);
          setToastList([...toastList,showToast('warning','Thông báo', 'khoá học đã được tạm dừng!')])
        });
      }}
    >
      Tạm ngưng khóa học
    </SuspendButton>
  );

  const activateCourse = (id) => (
    <ActivateButton
      onClick={() => {
        CourseService.activateCourse(id).then((response) => {
          console.log(response);
          setChange(!change);
          setToastList([...toastList, showToast('info','Thông báo', 'khoá học đã được kích hoạt!')])
        });
      }}
    >
      Kích hoạt khóa học
    </ActivateButton>
  );

  const content = getCourses.length === 0 ? (<NoContent >không có khoá học nào</NoContent>) : (getCourses.map((course, index) => (
    <Wrap key={index}>
      {course.verified ? suspendCourse(course.id) : activateCourse(course.id)}
      <Link to={`/instructorcourses/${course.id}/infos`}>
        <CourseImage alt="" src={course.imageUrl}></CourseImage>
        <WrapItems>
          <CourseTitle>{course.name}</CourseTitle>
          <CourseCategory>
            <span className="bg-blue-400 rounded-full px-2 text-white">
              Danh mục:
            </span>{" "}
            {course.categoryName}
          </CourseCategory>
          <CourseDescription>{course.description}</CourseDescription>
          <CourseInfo>
            <CourseDateAdded>Thời gian tạo: {course.dateAdded}</CourseDateAdded>
          </CourseInfo>
        </WrapItems>
      </Link>
    </Wrap>
  )));

  const CreateCourse = (
    <Link to={`/instructorcourses/create`}>
      <CreateButton>Tạo mới khóa học</CreateButton>
    </Link>
  );
  const pageClick = async (e) => {
    let page = Number(e.target.value);
    setCurrentPage(page);
    CourseService.getInstructorCourses(keyword,page).then((response) => {
      setCourses(response.courses);
    });
  };
  const searchByKeyword = async (e) => {
    setKeyword(e.target.value)
    CourseService.getInstructorCourses(e.target.value, currentPage).then((response) => {
      setCourses(response.courses);
    });
  };
  return (
    <React.Fragment>
      <TitleWrap>
      <Link to="./"><Title>Trang các khóa học của bạn</Title></Link>
        <SearchBar>
          <input
            value={keyword}
            onChange={searchByKeyword}
            type="text"
            placeholder="Tìm kiếm khóa học..."
          />
          <button type="submit">
          <CustomSearch />
          </button>
        </SearchBar>
        {CreateCourse}
      </TitleWrap>
      <Container>
        <Content>
          <Courses>{content}</Courses>
        </Content>
      </Container>
      <Pagination>
        <div>
          <ArrowBackIosIcon
            className="page"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          />
          <button
            className={currentPage === page ? "bg-blue-300" : ""}
            value={page}
            onClick={pageClick}
          >
            {page}
          </button>
          <button
            className={currentPage === page + 1 ? "bg-blue-300" : ""}
            value={page + 1}
            onClick={pageClick}
          >
            {page + 1}
          </button>
          <button
            className={currentPage === page + 2 ? "bg-blue-300" : ""}
            value={page + 2}
            onClick={pageClick}
          >
            {page + 2}
          </button>
          <button
            className={currentPage === page + 3 ? "bg-blue-300" : ""}
            value={page + 3}
            onClick={pageClick}
          >
            {page + 3}
          </button>
          <button
            className={currentPage === page + 4 ? "bg-blue-300" : ""}
            value={page + 4}
            onClick={pageClick}
          >
            {page + 4}
          </button>
          <ArrowForwardIosIcon
            className="page"
            onClick={() => {
              setPage(page + 1);
            }}
          />
        </div>
      </Pagination>
      <Toast toastList={toastList}/>
    </React.Fragment>
  );
}

const Pagination = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  position: relative;
  margin: 4rem 0;
  button {
    width: 40px;
    text-align: center;
    margin: 0.1rem;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
  }
  & button:hover {
    background: #7fffd4;
  }
  div svg {
    cursor: pointer;
  }
  div svg:active {
    background-color: lightblue;
  }
`;
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;
const NoContent = styled.span`
  position: absolute;
  margin: 0 auto;
`;

const Content = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 50px;
`;

const Courses = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
`;

const Wrap = styled.div`
  position: relative;
  width: 17vw;
  background-color: #f7f9fa;
  border: 3px solid rgba(5, 5, 5, 0.1);
  cursor: pointer;
  transition: all 314ms cubic-bezier(0.2, 0.4, 0.38, 0.7) 0s;
  box-shadow: rgb(0 0 0 / 35%) 0 16px 25px -12px,
    rgb(1 1 1 / 25%) 0 9px 16px -10px;
  &:hover {
    box-shadow: rgb(0 0 0 / 45%) 0 25px 36px -20px,
      rgb(1 1 1 / 35%) 0 16px 25px -12px;
    transform: scale(0.975);
    border-color: rgba(5, 5, 5, 0.314);
  }
     box-shadow: rgb(6 24 44 / 40%) 0px 0px 0px 2px, rgb(6 24 44 / 65%) 0px 4px 6px -1px, rgb(255 255 255 / 8%) 0px 1px 0px inset;
    border-radius: 5px;
`;

const CourseImage = styled.img`
  width: 100%;
  margin-bottom: 20px;
  height: 200px;
`;
const WrapItems = styled.div`
  padding: 0 1rem;
`;

const CourseTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  height: 3.5rem;
  overflow: hidden;
`;

const CourseDescription = styled.div`
  font-size: 15px;
  font-weight: 500;
  height: 4rem;
  overflow: hidden;
`;

const CourseInfo = styled.div`
  position: relative;
  bottom: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
`;

const CourseCategory = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  height: 2rem;
  overflow: hidden;
  span {
    background-color: blue-sky;
    align-items: center;
  }
`;

const CourseDateAdded = styled.div`
  position: relative;
  font-size: 0.7rem;
  margin: 0.3rem 0;
`;

const Page = styled.div``;

const CreateButton = styled.button`
  color: white;
  background-color: black;
  font-weight: 600;
  padding: 5px 20px;
  cursor: pointer;
  font-size: 15px;
  width: clamp(10rem, 12rem, 12rem);
  height: clamp(2rem, 3rem, 3rem);
  transition: 0.3s ease 0s;
  &:hover {
    border: transparent;
    color: white;
    background-color: #04aa6d;
  }
  box-shadow: rgb(6 24 44 / 40%) 0px 0px 0px 2px, rgb(6 24 44 / 65%) 0px 4px 6px -1px, rgb(255 255 255 / 8%) 0px 1px 0px inset;
  border-radius: 5px;
`;

const SuspendButton = styled.button`
  color: white;
  background-color: black;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.7rem;
  padding: 0 0.5rem;
  height: clamp(2rem, 3rem, 4rem);
  position: absolute;
  transition: 0.3s ease 0s;
  &:hover {
    border: transparent;
    color: white;
    background-color: #04aa6d;
  }
`;

const ActivateButton = styled.button`
    color: black;
    font-weight: 600;
    font-size: 0.7rem;
    padding: 0 0.5rem;
    height: clamp(2rem, 3rem, 4rem);
    transition: 0.3s ease 0s;
    background-color: lightgreen;
    position: absolute;
    &:hover {
        border: transparent;
        color: white;
        background-color: #04aa6d;
`;

const Title = styled.span`
    font-size: 1rem;
    font-weight: bold;
    padding: 8px 20px;
    box-shadow: rgb(6 24 44 / 40%) 0px 0px 0px 2px, rgb(6 24 44 / 65%) 0px 4px 6px -1px, rgb(255 255 255 / 8%) 0px 1px 0px inset;
    border-radius: 5px;
    background-color: white;
    color: #3b5990;
`;

const TitleWrap = styled.div`
  padding: 5vh 5vw;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;
const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 900px;
  cursor: pointer;
  padding: 8px 25px;
  cursor: text;
  font-weight: lighter;
  background-color: white;
  input {
    padding-left: 10px;
    border: none;
    width: 90%;
    autocomplete: off;
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
  box-shadow: rgb(6 24 44 / 40%) 0px 0px 0px 2px, rgb(6 24 44 / 65%) 0px 4px 6px -1px, rgb(255 255 255 / 8%) 0px 1px 0px inset;
  border-radius: 5px;
`;

const CustomSearch = styled(SearchIcon)``;
export default InstructorCourses;