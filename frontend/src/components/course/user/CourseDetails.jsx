import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams, Navigate } from "react-router-dom";
import Rating from "../Rating.jsx";
import UserCourseService from "../../../service/userCourseService.js";
import CourseService from "../../../service/courseService.js";
import Loader from "../../common/loader.jsx";

function CourseDetails({ user }) {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [topics, setTopics] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState([]);

  useEffect(() => {
    (async () => {
      await UserCourseService.getCourseDetails(id).then((res) => {
        setCourse(res.course);
      });
      await UserCourseService.showCourseScore(id).then((res) => {
        setTopics(res.topics);
      });
      await CourseService.rank(id).then((data) => {
        setUserRank(data.students);
      });
      setLoading(false);
    })();
  }, []);

  console.log(topics);

  const topicTable =
    topics.length === 0 ? (
      <div>Không có topic</div>
    ) : (
      topics.map((topic, index) => {
        return (
          <>
          <tr>
              <td class="p-2 whitespace-nowrap">
                  <div class="flex items-center">
                      <div class="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                        <img src="https://raw.githubusercontent.com/cruip/vuejs-admin-dashboard-template/main/src/images/user-36-05.jpg" alt="" />
                        </div>
                      <div class="font-medium text-gray-800">{topic.title}</div>
                  </div>
              </td>
              <td class="p-2 whitespace-nowrap">
                  <div class="text-left">{topic.total}</div>
              </td>
              <td class="p-2 whitespace-nowrap">
                  <div class="text-left font-medium text-green-500">{topic.quizNum}</div>
              </td>
          </tr>
          </>
        );
      })
    );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <WrapCourse>
            <TitleWrap>
              <CourseName>{course.name}</CourseName>
              <CourseDescription>{course.description}</CourseDescription>
              <InstructorInfos>
                <CourseInstructorName>
                  <span>Giảng viên: </span>
                  {course.instructorName}
                </CourseInstructorName>
                <CoursePhoneNumber>
                  <span>Liên hệ:</span>
                  {course.phoneNumber}
                </CoursePhoneNumber>
              </InstructorInfos>
              {/* {course.address} */}
              <CourseRating>
                <span>Đánh giá:</span>
                <Rating role={0} />
              </CourseRating>
            </TitleWrap>
            <ImgWrap>
              <EnrollImg>
                <img src={course.imageUrl} alt="abc" />
                <Link to="/category/3/course/4">
                  <Enroll>Vào ngay</Enroll>
                </Link>
              </EnrollImg>
            </ImgWrap>
          </WrapCourse>
          <ContainerWrap>
            <WrapTable>
              <section class="flex flex-col justify-center antialiased bg-gray-100 text-gray-600 ">
                <div class="h-full">
                    <div class="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
                        <div class="p-3">
                            <div class="overflow-x-auto">
                                <table class="table-auto w-full">
                                    <thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                                        <tr>
                                            <th class="p-2 whitespace-nowrap">
                                                <div class="font-semibold text-left">Name</div>
                                            </th>
                                            <th class="p-2 whitespace-nowrap">
                                                <div class="font-semibold text-left">Email</div>
                                            </th>
                                            <th class="p-2 whitespace-nowrap">
                                                <div class="font-semibold text-left">Spent</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="text-sm divide-y divide-gray-100">
                                        {topicTable}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </WrapTable>
            <WrapRank>
              <Leaderboard>
                <LBTitle>Đại lộ danh vọng</LBTitle>
                <LBContent>
                  <Pro>
                    <Grandmaster>
                      {userRank[0] && userRank[0].fullName}
                    </Grandmaster>
                    <Point>{userRank[0] && userRank[0].marks}</Point>
                  </Pro>
                  <Pro>
                    <Master>{userRank[1] && userRank[1].fullName}</Master>
                    <Point>{userRank[1] && userRank[1].marks}</Point>
                  </Pro>
                  <Pro>
                    <Master>{userRank[2] && userRank[2].fullName}</Master>
                    <Point>{userRank[2] && userRank[2].marks}</Point>
                  </Pro>
                  <Pro>
                    <Master>{userRank[3] && userRank[3].fullName}</Master>
                    <Point>{userRank[3] && userRank[3].marks}</Point>
                  </Pro>
                  <Pro>
                    <Master>{userRank[4] && userRank[4].fullName}</Master>
                    <Point>{userRank[4] && userRank[4].marks}</Point>
                  </Pro>
                  <Pro>
                    <Hacker>{userRank[5] && userRank[5].fullName}</Hacker>
                    <Point>{userRank[5] && userRank[5].marks}</Point>
                  </Pro>
                  <Pro>
                    <Hacker>{userRank[6] && userRank[6].fullName}</Hacker>
                    <Point>{userRank[6] && userRank[6].marks}</Point>
                  </Pro>
                  <Pro>
                    <Hacker>{userRank[7] && userRank[7].fullName}</Hacker>
                    <Point>{userRank[7] && userRank[7].marks}</Point>
                  </Pro>
                  <Pro>
                    <Hacker>{userRank[8] && userRank[8].fullName}</Hacker>
                    <Point>{userRank[8] && userRank[8].marks}</Point>
                  </Pro>
                  <Pro>
                    <Hacker>{userRank[9] && userRank[9].fullName}</Hacker>
                    <Point>{userRank[9] && userRank[9].marks}</Point>
                  </Pro>
                </LBContent>
              </Leaderboard>
            </WrapRank>
          </ContainerWrap>
        </Container>
      )}
    </>
  );
}

export default CourseDetails;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
  position: relative;
`;
const ContainerWrap = styled.div`
  display: flex;
`;

const TitleContent = styled.div``;

const WrapCourse = styled.div`
  background-color: #1c1d1f;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 5vh 15vw;
  color: white;
`;
const TitleWrap = styled.div`
  width: 100%;
  flex: 4;
  padding: 2vh 2vw;
  display: flex;
  flex-flow: column nowrap;
  font-size: 1.15rem;
  gap: 1.2rem;
`;
const EnrollImg = styled.div`
  width: 60%;
  margin: 0 auto;
`;
const ImgWrap = styled.div`
  width: 100%;
  flex: 3;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
  img {
    height: 90%;
    margin: 0 auto;
  }
`;
const Enroll = styled.button`
  color: white;
  font-weight: 500;
  border: 5px;
  background-color: green;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: 1.2vh 0;
  transition: 0.4s ease 0s;
  &:hover {
    background-color: #04aa6d;
  }
`;

const WrapRank = styled.div`
  border: solid black;
  width: 100%;
  margin-top: 3rem;
  height: 100%;
  display: flex;
  justify-content: center;
  flex: 3;
`;
const WrapTable = styled.div`
  border: solid black;
  width: 100%;
  background-color: blue;
  height: 100%;
  flex: 4;
`;

const Leaderboard = styled.div`
  width: 20vw;
  border-top: 1px solid black;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0 0 2.5rem brown);
`;

const LBTitle = styled.div`
  background-color: #82b74b;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.7rem 1rem;
  border-left: 5px solid crimson;
  color: white;
`;

const LBContent = styled.div`
  background-color: #f0f0f0;
  display: flex;
  flex-flow: column nowrap;
  & > div {
    min-height: 2rem;
  }
`;
const Pro = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding: 1vh 1vw;
  border-bottom: 1px solid white;
  font-weight: bold;
`;
const Grandmaster = styled.div`
  animation: colorRotate 10s linear 0s infinite;
  @keyframes colorRotate {
    from {
      color: red;
    }
    16% {
      color: yellow;
    }
    33% {
      color: green;
    }
    50% {
      color: lightblue;
    }
    66% {
      color: blue;
    }
    83% {
      color: purple;
    }
    100% {
      color: red;
    }
  }
`;
const Master = styled.div`
  color: red;
`;
const Hacker = styled.div`
  color: orange;
`;

const Point = styled.div`
  font-weight: 300;
`;

const CourseName = styled.div`
  font-size: 2rem;
  font-weight: bold;
`;

const CourseDescription = styled.div`
  font-weight: 400;
  font-size: 1.3rem;
`;

const CourseInstructorName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const CoursePhoneNumber = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.5rem;
  font-size: 1.15rem;
`;

const CourseRating = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const InstructorInfos = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 1.5rem;
`;

const TopicContent = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 100px;
`;

const TopicTitle = styled.div``;

const TopicTotal = styled.div``;

const TopicQuiz = styled.div``;