import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams, Navigate, Route, Routes } from "react-router-dom";
import CourseService from "../../../service/courseService";
import TopicContent from './TopicContent'

function EditCourseInfos() {
  let { id } = useParams();

  const [course, setCourse] = useState({
    id: id ,
    name: "",
    description: "",
    instructorName: "Văn Anh",
    imageUrl: "",
    register: 0,
    rating: ''
  });

  const [topicId,setTopicId] = useState()
  const [isLoading,setLoading] = useState(true);

  const [topics, setTopics] = useState([{ 
    id: 0,
    title: ""
  }]);

  const [topicDetails, setTopicDetails] = useState([{ 
    id: 0,
    title: ""
  }]);

  useEffect(() => {
      let course = CourseService.getInstructorCourseDetails(id).then((response) => {
        setCourse({...response.course})
        setTopics(response.topics)
      })

      Promise.all([course]).then(() => {
        setLoading(false)
      })

    }, [])

  const renderTopics = topics.map((topic, index) =><> 
    <Title key={index} onClick={() => setTopicId(topic.id)}>Chủ đề {index + 1}: {topic.title}</Title>
  </> )

  return (
    <Container>
      <Body>
        <CourseInfos>
          <InfoWrap>
            <CourseTitle>
              {course.name}
            </CourseTitle>
            <CourseDescription>
            {course.description}
            </CourseDescription>
            <ARWrap>
              <CourseAttendance>Số học viên: {course.register}</CourseAttendance>
              <CourseRating>Đánh giá: {course.rating} sao;</CourseRating>
            </ARWrap>
          </InfoWrap>
          <CourseCover>
            <BackgroundImage src={course.imageUrl ? course.imageUrl: 'https://www.optionabroad.com/wp-content/uploads/2021/03/Study-in-USA.jpg'}></BackgroundImage>
          </CourseCover>
        </CourseInfos>
        <Topic>
          <TopicNav>
            <NavTitle>
              <span>Nội dung khóa học</span>
              <button>+</button>
            </NavTitle>
            <TopicWrap>
                {renderTopics}
            </TopicWrap>
          </TopicNav>
          {!isLoading&& <TopicContent courseId={course.id} topicId={topicId}/>}
            {/* <TopicTitle>Chủ đề 1: Một chủ đề nào đó của Đức múp</TopicTitle>
            <Content>
              Đây là nội dung chủ đề 1 của khóa học dummy hết sức ngu xuẩn của
              Đức múp. Trong khóa học này, ta sẽ học cách trở nên ngu xuẩn
            </Content> */}
        </Topic>
      </Body>
    </Container>
  );
}

export default EditCourseInfos;

const Container = styled.div`
  height: 90vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-flow: row nowrap;
`;

const Body = styled.div`
  background-color: #3a3e47;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
`;

const CourseInfos = styled.div`
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
  background-color: white;
  display: flex;
  flex-flow: row nowrap;
  gap: 0;
`;

const TopicNav = styled.div`
`;

const NavTitle = styled.div`
  background-color: #f0f0f0;
  font-size: 1.3rem;
  font-weight: bold;
  border-left: 5px solid #3d4450;
  color: #1c1d1f;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  button {
    background-color: #dddddd;
    padding: 3px 8px;
  }
`;

const TopicWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
  height: 16rem;
  position: sticky;
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