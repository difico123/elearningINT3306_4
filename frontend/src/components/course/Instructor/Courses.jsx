import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CourseService from "../../../service/courseService";

function InstructorCourses() {
  const [getCourses, setCourses] = useState([
    {
      id: "",
      name: "",
      description: "",
      categoryId: "",
      verified: true,
      imageUrl: "",
    },
  ]);

  useEffect(() => {
    CourseService.getInstructorCourses().then((response) => {
      setCourses(response.courses);
    });
  });

  const suspendCourse = (id) => (
    <SuspendButton
      onClick={() => {
        CourseService.suspendCourse(id).then((response) => {
          console.log(response);
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
        });
      }}
    >
      Kích hoạt khóa học
    </ActivateButton>
  );

  const content = getCourses.map((course) => (
    <Wrap>
      {course.verified ? suspendCourse(course.id) : activateCourse(course.id)}
      {/* <Link to={`/category/${id}/course/${course.courseId}`}> */}
      <CourseImage alt="" src={course.imageUrl}></CourseImage>
      <CourseTitle>{course.name}</CourseTitle>
      <CourseDescription>{course.description}</CourseDescription>
      <CourseInfo>
        <CourseAttendance>Số học viên: {course.register}</CourseAttendance>
        <CourseRating>
          Đánh giá: {course.rating ? course.rating : 0}
        </CourseRating>
      </CourseInfo>
      {/* </Link> */}
    </Wrap>
  ));

  const CreateCourse = <CreateButton>Tạo mới khóa học</CreateButton>;

  return (
    <React.Fragment>
      <TitleWrap>
        <Title>Trang các khóa học của bạn</Title>
        {CreateCourse}
      </TitleWrap>
      <Container>
        <Content>
          <Courses>{content}</Courses>
        </Content>
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
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
  padding: 0 0 5px;
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

const CourseInstructor = styled.div`
  padding: 0 20px;
  font-size: 16px;
  font-weight: 600;
  color: #5e5e5e;
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

const CreateButton = styled.button`
  color: white;
  background-color: black;
  font-weight: 600;
  padding: 5px 20px;
  cursor: pointer;
  font-size: 15px;
  width: 10vw;
  height: 5vh;
  transition: 0.3s ease 0s;
  &:hover {
    border: transparent;
    color: white;
    background-color: #04aa6d;
  }
`;

const SuspendButton = styled.button`
  color: white;
  background-color: black;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;
  height: clamp(2rem, 3rem, 4rem);
  position: absolute;
  transition: 0.3s ease 0s;
  &:hover {
    border: transparent;
    color: white;
    background-color: #04aa6d;
  }
  padding: 0 3px;
`;

const ActivateButton = styled.button`
    color: black;
    font-weight: 600;
    font-size: 15px;
    height: clamp(2rem, 3rem, 4rem);
    transition: 0.3s ease 0s;
    background-color: lightgreen;
    position: absolute;
    padding: 0 5px;
    &:hover {
        border: transparent;
        color: white;
        background-color: #04aa6d;
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

export default InstructorCourses;
