import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams, Navigate } from "react-router-dom";
import Rating from "../Rating.jsx";
import UserCourseService from "../../../service/userCourseService.js";
import CourseService from "../../../service/courseService.js";
import Loader from "../../common/loader.jsx";
import {ArrowBackIosIcon,ArrowForwardIosIcon} from '../../common/icons'

function CourseDetails({ user }) {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [topics, setTopics] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
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
          <XYZ>
            <div>{topic.title}</div>
            <div>{topic.quizNum}/ {topic.total}</div>
            <div>{topic.marks}</div>
          </XYZ>
        );
      })
    );
    const pageClick = async (e) => {
      let page = Number(e.target.value);
     
      await UserCourseService.showCourseScore(id, page).then((res) => {
        setCurrentPage(page);
        setTopics(res.topics);
      });
    };
    console.log(currentPage,"currentPage")
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
                <Link to={`/category/${course.categoryId}/course/${course.id}`}>
                  <Enroll>Vào học ngay!</Enroll>
                </Link>
              </EnrollImg>
            </ImgWrap>
          </WrapCourse>
          <ContainerWrap>
            <div>
            <ABC>
              <WrapTable>
                <div>Chủ đề</div>
                <div>Số câu đúng/Tổng số câu</div>
                <div>Tổng điểm</div>
              </WrapTable>
              {topicTable}
            </ABC>
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
            </div>
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
const Pagination = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  position: relative;
  margin: 2rem 0;
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
  padding: 4vh 4vw;
  width: 100%;
`;

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
  padding: 1.2vh 0;
  transition: 0.4s ease 0s;
  &:hover {
    background-color: #04aa6d;
  }
`;

const WrapRank = styled.div`
  height: 100%;
  width: 20vw;
  display: flex;
  justify-content: flex-end;
  flex: 2;
`;
const WrapTable = styled.div`
  display: flex;
  background: white;
  border-bottom: 2.5px solid grey;
  div {
    padding: 1rem;
    font-weight: 600;
  }
  div:nth-child(1) {
    width: 60%;
  }
  div:nth-child(2) {
    width: 20%;
    text-align: end;
  }
  div:nth-child(3) {
    width: 20%;
    text-align: end;
  }
`;

const XYZ = styled.div`
  display: flex;
  background: white;
  border-bottom: 1px solid grey;
  div {
    padding: 1rem;
  }
  div:nth-child(1) {
    width: 60%;
  }
  div:nth-child(2) {
    width: 20%;
    text-align: end;
  }
  div:nth-child(3) {
    width: 20%;
    text-align: end;
  }
`;

const Leaderboard = styled.div`
  width: 18vw;
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

const ABC = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 70vw;
  flex: 4;
  padding: 2vh 2vw 4vh;
  background-color: white;
  border-radius: 14px;
  min-height: 25rem;
`;