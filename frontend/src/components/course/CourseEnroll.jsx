import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import userCourseService from "../../service/userCourseService";
import { ArrowBackIosIcon, GroupsIcon, StarIcon } from "../common/icons";
import { useParams, Link } from "react-router-dom";
import Toast from "../common/toast";
import showToast from "../../dummydata/toast";
import CourseService from "../../service/courseService";
import Loader from "../../components/common/loader";

function CourseEnroll({ checkEnroll }) {
  const { id } = useParams();
  const [styleEnrollBtn, setStyleEnrollBtn] = useState(() =>
    checkEnroll === 200
      ? "bg-green-600 hover:bg-green-500"
      : "bg-gray-500 cursor-not-allowed"
  );

  const [disabledEnrollBtn, setDisableEnrollBtn] = useState(() =>
    checkEnroll === 200 ? false : true
  );

  const notification = useRef([]);
  const [isLoading, setLoading] = useState(true);

  const [msg, setMsg] = useState(() =>
    disabledEnrollBtn
      ? checkEnroll === 403
        ? "Chờ giảng viên của bạn chấp nhận..."
        : "Đăng nhập tài khoản học sinh để tham gia .."
      : "Tham gia"
  );

  const [course, setCourse] = useState({
    name: "",
    description: "",
    instructorName: "",
    rating: "",
    register: "",
  });

  const [topics, setTopics] = useState([
    {
      id: "",
      title: "",
      description: "",
    },
  ]);

  const [userRank, setUserRank] = useState([]);

  useEffect(() => {
    (async () => {
      await CourseService.getEnrollTopics(id).then((response) => {
        setCourse({ ...response.course });
        setTopics([...response.topics]);
      });
      await CourseService.rank(id).then((data) => {
        setUserRank(data.students);
      });
      setLoading(false);
    })();
  }, []);

  const enroll = (id) => (
    <>
      <EnrollButton
        className={styleEnrollBtn}
        type="submit"
        onClick={() => {
          userCourseService
            .enrollCourse(id)
            .then((response) => {
              notification.current = [
                showToast("success", "Thông báo", response.msg),
              ];
              setStyleEnrollBtn("bg-gray-400 cursor-not-allowed");
              setDisableEnrollBtn(true);
              setMsg("Chờ giảng viên của bạn chấp nhận...");
            })
            .catch((err) => {
              notification.current = [
                showToast("danger", "Thông báo", err.response.data.msg),
              ];
            });
        }}
        disabled={disabledEnrollBtn}
        value={msg}
      />
      <Toast toastList={notification.current} />
    </>
  );

  const topicContent = topics.map((topic, index) => (
    <Wrap key={index}>
      <Topic>
        Chủ đề {index + 1}: {topic.title}
      </Topic>
      <TopicContent className="noblur">
        <Slide>{topic.description}</Slide>
      </TopicContent>
    </Wrap>
  ));

  const loading = (
    <WrapLoader>
      <Loader />
    </WrapLoader>
  );

  const loaded =
    topics.length === 0 ? (
      <>
        <p className="text-center">Không có Topic nào</p>
      </>
    ) : (
      topicContent
    );

  return (
    <>
      {isLoading ? (
        loading
      ) : (
        <Container>
          <CourseInfos>
            <InfoWrap>
              <Back>
                <Link to="../">
                  <ArrowBackIosIcon /> Trở về
                </Link>
              </Back>
              <Breadcrumb>Đăng ký khoá học</Breadcrumb>
              <CourseTitle>{course.name}</CourseTitle>
              <CourseDescription>{course.description}</CourseDescription>
              <ARWrap>
                <CourseAttendance>
                  <span> Số học viên: {course.register}</span>
                  <GroupsIcon />
                </CourseAttendance>
                <CourseRating>
                  Đánh giá: {course.rating ? course.rating : "0"}
                  <StarIcon />
                </CourseRating>
              </ARWrap>
              <CourseInstructor>
                <span className="bg-green-800 text-xl rounded pb-1 pl-1 pr-1 mr-2">
                  Giảng viên: 
                </span>{" "}{course.instructorName}
              </CourseInstructor>
            </InfoWrap>
            <EnrollSection>
              <BackgroundImage src={course.imageUrl}></BackgroundImage>
              {enroll(id)}
            </EnrollSection>
          </CourseInfos>
          <Title>Nội dung khóa học</Title>
          <Body>
            <Content>{loaded}</Content>
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
          </Body>
        </Container>
      )}
    </>
  );
}

const WrapLoader = styled.div`
  width: 99vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Back = styled.span`
  position: absolute;
  top: 1rem;
  right: 5rem;
  color: white !important;
  cursor: pointer;
`;

const Container = styled.div`
  min-height: 90vh;
  display: flex;
  flex-flow: column nowrap;
  padding: 0;
  position: relative;
`;
const CourseInfos = styled.div`
  background-color: #1c1d1f;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  padding: 5vh 16vw;
  gap: 2.5vw;
`;

const Breadcrumb = styled.div`
  color: #c0c0c0;
  font-weight: bold;
  font-size: 1.4rem;
  padding-bottom: 1.5rem;
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
  inline-size: 45vw;
  overflow-wrap: break-word;
`;

const CourseDescription = styled.div`
  color: white;
  font-size: 1.2rem;
  padding-bottom: 1rem;
  inline-size: 45vw;
  overflow-wrap: break-word;
`;

const CourseInstructor = styled.div`
  color: white;
  font-size: 1.2rem;
  padding-bottom: 1rem;
  inline-size: 45vw;
  overflow-wrap: break-word;
  font-weight: bold;
`;

const CourseAttendance = styled.div`
  color: white;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  svg {
    color: #c7ecee;
  }
`;
const CourseRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  color: white;
  font-size: 1rem;
  svg {
    color: #f0932b;
  }
`;
const ARWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 50px;
  padding-bottom: 20px;
`;

const EnrollSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin: auto auto;
`;

const BackgroundImage = styled.img`
  width: 100%;
`;

const EnrollButton = styled.input`
  text-align: center;
  color: white;
  font-weight: 600;
  padding: 12px 0;
  font-size: 15px;
  height: 50px;
  transition: 0.5s ease 0s;
  padding: 0 1rem;
`;

const Body = styled.div`
  padding: 0 12vw 5vh;
  display: flex;
  flex-flow: row nowrap;
  gap: 7vw;
`;

const Title = styled.div`
  padding: 6vh 12vw 0;
  font-size: 1.75rem;
  font-weight: bold;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  padding-top: 1.5rem;
  flex-flow: column nowrap;
  gap: 2.75rem;
  inline-size: 50vw;
  overflow-wrap: break-word;
`;

const Wrap = styled.div`
  padding-left: 1rem;
`;

const Topic = styled.div`
  padding: 0.7rem 0.6rem;
  border-left: 5px solid grey;
  background-color: #f7f9fa;
  font-size: 1.25rem;
  font-weight: bold;
`;

const TopicContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  padding: 3vh 1vw 0;
`;

const Slide = styled.div``;

const Quiz = styled.div``;

const Leaderboard = styled.div`
  width: 20vw;
  border-top: 1px solid black;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(0 0 1.5rem black);
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
export default CourseEnroll;