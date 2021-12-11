import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams, Navigate, Route, Routes } from "react-router-dom";
import CourseService from "../../../service/courseService";
import TopicContent from "./TopicContent";

function EditCourseInfos({ courseParam, topicsParam }) {
  let { id } = useParams();

  const [course, setCourse] = useState({
    id: id,
    name: "",
    description: "",
    instructorName: "",
    imageUrl: "",
    register: 0,
    rating: "",
  });

  const [topicId, setTopicId] = useState();
  const [isLoading, setLoading] = useState(true);

  const [topics, setTopics] = useState([
    {
      id: "",
      title: "",
    },
  ]);

  const [topicDetails, setTopicDetails] = useState([
    {
      id: 0,
      title: "",
    },
  ]);
  
  useEffect(() => {
    setTopicId(topicsParam[0]? topicsParam[0].id:null)
    setCourse({ ...courseParam });
    setTopics(topicsParam);
    setLoading(false);
  }, [courseParam, topicsParam]);


  const renderTopics = topics.map((topic, index) => (
    <>
      <Title className='bg-green-300' key={index} onClick={() => setTopicId(topic.id)} >
        Chủ đề {index + 1}: {topic.title}
      </Title>
    </>
  ));

  return (
    <Container>
      <Body>
        <CourseInfos>
          <InfoWrap>
            <CourseTitle>{course.name}</CourseTitle>
            <CourseDescription>{course.description}</CourseDescription>
            <ARWrap>
              <CourseAttendance>
                Số học viên: {course.register}
              </CourseAttendance>
              <CourseRating>Đánh giá: {course.rating} sao;</CourseRating>
            </ARWrap>
          </InfoWrap>
          <CourseCover>
            <BackgroundImage
              src={
                course.imageUrl
                  ? course.imageUrl
                  : "https://www.optionabroad.com/wp-content/uploads/2021/03/Study-in-USA.jpg"
              }
            ></BackgroundImage>
          </CourseCover>
        </CourseInfos>
        <Topic>
          <TopicNav>
            <NavTitle>
              <span>Nội dung khóa học</span>
              <Link to="../createTopic">
              <button>+</button>
              </Link>
            </NavTitle>
            <TopicWrap>{!topics[0]? <NoContent>Chưa có chủ đề</NoContent>: renderTopics}</TopicWrap>
          </TopicNav>
          {!isLoading && (
            <TopicContent courseId={course.id} topicId={topicId} />
          )}
        </Topic>
      </Body>
    </Container>
  );
}

export default EditCourseInfos;
const NoContent = styled.div`
  text-align:center;
`
const Container = styled.div`
  height: 90vh;
  display: flex;
  width: 85vw;
  justify-content: flex-start;
  align-items: flex-start;
  flex-flow: row nowrap;
  overflow: auto;
`;

const Body = styled.div`
  background-color: #3a3e47;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
`;

const CourseInfos = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  padding: 4vh 2vw;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const CourseTitle = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
  inline-size: 35vw;
  overflow-wrap: break-word;
`;

const CourseDescription = styled.div`
  color: white;
  font-size: 1.2rem;
  padding-bottom: 1rem;
  inline-size: 35vw;
  overflow-wrap: break-word;
`;

const ARWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 50px;
  padding-bottom: 20px;
`;

const CourseAttendance = styled.div`
  color: white;
  font-size: 1rem;
`;
const CourseRating = styled.div`
  color: white;
  font-size: 1rem;
`;

const CourseCover = styled.div`
  padding: 0 8vw;
`;

const BackgroundImage = styled.img``;

const Topic = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  flex-flow: row nowrap;
  gap: 0;
`;

const TopicNav = styled.div`
  position: sticky;
  top: 0;
  position: -webkit-sticky;
`;

const NavTitle = styled.div`
  background-color: #e0e0e0;
  font-size: 1.2rem;
  padding: 0.5vh 0.5vw;
  align-items: center;
  font-weight: bold;
  border-left: 5px solid #3d4450;
  color: #1c1d1f;
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  button {
    background-color: #d0d0d0;
    padding: 3px 8px;
  }
`;

const TopicWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
  height: 16rem;
  background-color: #f0f0f0;
  right: 0px;
  min-height: 55vh;
`;

const Title = styled.div`
  padding: 1.5rem 0.75vw;
  font-weight: 500;
  word-wrap: break-word;
  width: 15rem;
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

const TopicTitle = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  padding-bottom: 3vh;
`;

const Content = styled.div``;