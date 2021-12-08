import React from "react";
import styled from "styled-components";
import { Link, useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import UserCourseService from "../../../service/userCourseService";
import { ArrowBackIosIcon, ArrowForwardIosIcon, CheckIcon } from '../../common/icons'

function UserCourses() {
  const [getCourses, setCourses] = useState([
    {
      courseId: '',
      email: '',
      enrollDate: '',
      fullName: '',
      imageUrl: '',
      instructorId: '',
      isComplete: '',
      marks: '',
      name: ''
    },
  ]);
  const [change, setChange] = useState(false);

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    UserCourseService.getAll().then((response) => {
      setCourses(response.courses);
    });

  }, [change]);

  const content = getCourses.map((course, index) => (
    <Wrap key={index}>
      <Link to={`/`}>
        <CourseImage alt="" src={course.imageUrl}></CourseImage>
        <WrapItems>
          <CourseTitle>
            {course.name}
          </CourseTitle>
          <CourseCategory>
            <span className="bg-blue-400 rounded px-2 text-white">Giảng viên</span> {course.fullName}
          </CourseCategory>
          <CourseEmail>
            <span>Email: </span> {course.email}
          </CourseEmail>
          <Course>
            <div>{course.isComplete ? 'Hoàn thành' : 'Chưa hoàn thành'}</div>
            <div><span>Điểm: </span>{course.marks}</div>
          </Course>
          <CourseInfo>
            <CourseDateAdded>Ngày đăng ký: {course.enrollDate}</CourseDateAdded>
          </CourseInfo>
        </WrapItems>
      </Link>
    </Wrap>
  ));

  const pageClick = async (e) => {
    // let page = Number(e.target.value)
    // setCurrentPage(page);
    // UserCourseService.getAll(page).then((response) => {
    //     setCourses(response.courses);
    // });
  }

  return (
    <React.Fragment>
      <TitleWrap>
        <Title>Trang các khóa học của bạn</Title>
      </TitleWrap>
      <Container>
        <Pagination>
          <div></div>
          <div>
            <ArrowBackIosIcon className="page" onClick={() => { if (page > 1) { setPage(page - 1) } }} />
            <button className={currentPage === page ? "bg-blue-300" : ""} value={page} onClick={pageClick}>{page}</button>
            <button className={currentPage === page + 1 ? "bg-blue-300" : ""} value={page + 1} onClick={pageClick}>{page + 1}</button>
            <button className={currentPage === page + 2 ? "bg-blue-300" : ""} value={page + 2} onClick={pageClick}>{page + 2}</button>
            <button className={currentPage === page + 3 ? "bg-blue-300" : ""} value={page + 3} onClick={pageClick}>{page + 3}</button>
            <button className={currentPage === page + 4 ? "bg-blue-300" : ""} value={page + 4} onClick={pageClick}>{page + 4}</button>
            <ArrowForwardIosIcon className="page" onClick={() => { setPage(page + 1); }} />
          </div>
        </Pagination>
        <Content>
          <Courses>{content}</Courses>
        </Content>

      </Container>
    </React.Fragment>
  );
}

const Pagination = styled.div`
  display: flex;                  
  flex-direction: row;     
  justify-content: space-around;
  align-self: flex-end;
  flex-wrap: nowrap;              
  position: relative;
  margin-bottom: 2rem;
  top: 0;
  button {
    width: 40px;
    text-align: center;
    margin: 0.1rem;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
  }
  & button:hover {
    background: #7FFFD4;
  }
  div svg {
    cursor: pointer;
  }
  div svg:active {
    background-color:lightblue;
  }
`
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
  margin-bottom: 5rem;
  padding: 0 12vw;
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
`;

const CourseImage = styled.img`
  width: 100%;
  margin-bottom: 20px;
  height: 200px;
`;
const WrapItems = styled.div`
  padding:0 1rem;
`;

const CourseTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  height:3.5rem;
  overflow:hidden;
  div {
    font-size: 0.9rem;
    color: lightblue;
  }
`;

const CourseInfo = styled.div`
  position: relative;
  bottom: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
`;

const CourseCategory = styled.div`
  font-weight: 600;
  height:2rem;
  overflow:hidden;
  font-size: 1.1rem;
  span{
    background-color:blue-sky;
    align-items: center;
  }
`;

const CourseEmail = styled.div`
  font-weight: 400;
  height:2rem;
  overflow:hidden;
  font-size: 0.9rem;
  span{
    background-color:blue-sky;
    align-items: center;
  }
`;
const Course = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 400;
  height:2rem;
  overflow:hidden;
  font-size: 0.9rem;
  span{
    background-color:blue-sky;
    align-items: center;
  }
`;

const CourseDateAdded = styled.div`
  position: relative;
  font-size: 0.7rem;
  margin: 0.3rem 0;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const TitleWrap = styled.div`
  padding: 5vh 5vw;
  display: flex;
  justify-content: space-between;
`;

export default UserCourses;