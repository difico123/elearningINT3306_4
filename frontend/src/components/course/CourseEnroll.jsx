import React,{useRef, useState, useEffect} from "react";
import styled from "styled-components";
import userCourseService from "../../service/userCourseService";
import {ArrowBackIosIcon} from '../common/icons'
import { useParams, Link } from "react-router-dom";
import Toast from '../common/toast'
import showToast from '../../dummydata/toast'
import CourseService from '../../service/courseService'
import Loader from '../../components/common/loader'

function CourseEnroll({checkEnroll}) {
  const { id } = useParams();
  const [styleEnrollBtn, setStyleEnrollBtn] = useState(() => checkEnroll? "bg-green-600 hover:bg-green-500": "bg-gray-500 cursor-not-allowed")
  const [enrolled, setEnrolled] = useState(checkEnroll);
  const notification = useRef([])
  const [isLoading,setLoading] = useState(true);

  const [msg, setMsg] = useState(() => 
    !enrolled? "Chờ giảng viên của bạn chấp nhận...": "Tham gia"
  )

  const [course, setCourses] = useState({
    name: '',
    description: '',
    instructorName: '',
    rating: '',
    register: ''
  })

  const [topics, setTopics] = useState([
    {
      id: '',
      title: '',
      description: '',
    }
  ]);

  useEffect(() => {
    CourseService.getEnrollTopics(id).then(response => {
      setCourses({...response.course})
      setTopics([...response.topics])
      setLoading(false)
    })
  },[])

  const enroll = (id) => (
    <>
      <EnrollButton className={styleEnrollBtn} 
        type="submit" 
        onClick={() => {
          userCourseService
            .enrollCourse(id)
            .then((response) => {
              notification.current = [showToast("success","Thông báo",response.msg)]
              setStyleEnrollBtn('bg-gray-400 cursor-not-allowed')
              setEnrolled(true)
              setMsg('Chờ giảng viên của bạn chấp nhận...')
            })
            .catch((err) => {
              notification.current = [showToast("danger","Thông báo",err.response.data.msg)]
            });

        }}
        disabled={!enrolled}
        value={msg}
      />
        <Toast toastList={notification.current} />
    </>
  );


const topicContent = topics.map((topic,index) =>
      <Wrap key={index}>
          <Topic>Chủ đề {index + 1}: {topic.title}</Topic>
          <TopicContent className="noblur">
            <Slide>{topic.description}</Slide>
          </TopicContent>
        </Wrap>
    )

  const loading = (<WrapLoader>
        <Loader/>
      </WrapLoader>)

  const loaded = topics.length === 0 ? (<><p className="text-center">Không có Topic nào</p></>) : topicContent
 
  return (
    <Container>
      <CourseInfos>
        <InfoWrap>
          <Back><Link to="/category/3"><ArrowBackIosIcon/> Trở về</Link></Back>
          <Breadcrumb>Đăng ký khoá học</Breadcrumb>
          <CourseTitle>
            {course.name}
          </CourseTitle>
          <CourseDescription>
            {course.description}
          </CourseDescription>
          <ARWrap>
            <CourseAttendance>Số học viên: {course.register}</CourseAttendance>
            <CourseRating>Đánh giá: {course.rating? course.rating:'0'} sao</CourseRating>
          </ARWrap>
          <CourseInstructor>Giảng viên:  {course.instructorName}</CourseInstructor>
        </InfoWrap>
        <EnrollSection>
          <BackgroundImage src="https://res.cloudinary.com/subarashis/image/upload/v1637942441/courses/hueihncfseglg2hkrkzg.jpg"></BackgroundImage>
          {enroll(id)}
        </EnrollSection>
      </CourseInfos>
      <Title>Nội dung khóa học</Title>
      <Body>
       <Content>
        {isLoading? loading: loaded}
      </Content>
        <Leaderboard>
          <LBTitle>Đại lộ danh vọng</LBTitle>
          <LBContent>
            <Pro>
              <Grandmaster>Lăn Lông Lốc</Grandmaster>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Master>Lông Nương Múp</Master>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Master>Cindy Thái Tài</Master>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Master>Duy Mạnh</Master>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Master>Tiến Bịp</Master>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Hacker>Putin</Hacker>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Hacker>Chim Bé</Hacker>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Hacker>Bùi Xuân Huấn</Hacker>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Hacker>Tập Cận Bình</Hacker>
              <Point>10</Point>
            </Pro>
            <Pro>
              <Hacker>ĐàM VĩnH HưnG</Hacker>
              <Point>10</Point>
            </Pro>
          </LBContent>
        </Leaderboard>
      </Body>
    </Container>
  );
}

const WrapLoader = styled.div`
position: absolute;
top: 10%;
left: 50%;
transform: translate(-50%,-50%)
`
const Back = styled.span`
  position: absolute;
  top: 1rem;
  right: 5rem;
  color:white!important;
  cursor: pointer;
`

const Container = styled.div`
  height: 90vh;
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
  font-size: 1rem;
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
  font-size: 0.9rem;
  padding-bottom: 1rem;
  inline-size: 45vw;
  overflow-wrap: break-word;
  font-weight: bold;
`;

const CourseAttendance = styled.div`
  color: white;
  font-size: 1rem;
`;
const CourseRating = styled.div`
  color: white;
  font-size: 1rem;
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
  filter: drop-shadow(0 0 2.5rem crimson);
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