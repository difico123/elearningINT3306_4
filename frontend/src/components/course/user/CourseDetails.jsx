import React,{useEffect, useState} from 'react'
import styled from "styled-components";
import { Link, useParams, Navigate } from "react-router-dom";
import Rating from '../Rating.jsx'
import UserCourseService from '../../../service/userCourseService.js';
import CourseService from '../../../service/courseService.js';
import Loader from '../../common/loader.jsx';


function CourseDetails({user}) {
    const {id} = useParams();
    const [course,setCourse] = useState({})
    const [topics,setTopics] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [userRank, setUserRank] = useState([]);
    

    useEffect(() => {
        (async () => {
            await UserCourseService.getCourseDetails(id).then((res) => {
                setCourse(res.course)
            })
            await UserCourseService.showCourseScore(id).then((res) => {
                setTopics(res.topics)
            })
            await CourseService.rank(id).then((data) => {
              setUserRank(data.students)
            })
            setLoading(false);
          })()
    },[])

    const topicTable = topics.length ===0 ? <div>Không có topic</div> : topics.map((topic,index) => {
        return (<div>
                {topic.title}
                {topic.total}
                {topic.quizNum}
            </div>)
    }) 

    return (
        <>
        {isLoading? <Loader /> :
            <Container>
                <WrapCourse>
                    <TitleWrap>
                        <TitleContent>
                            {course.name}
                            {course.description}
                            {course.instructorName}
                            {course.phoneNumber}
                            {course.address}
                        </TitleContent>
                        <Rating role={0}/>
                    </TitleWrap>
                    <ImgWrap>
                        <EnrollImg>
                            <img src={course.imageUrl} alt="abc" />
                            <Link to='/category/3/course/4'><Enroll>Vào ngay</Enroll></Link>
                        </EnrollImg>
                    </ImgWrap>
                </WrapCourse>
                <ContainerWrap>
                    <WrapTable>
                        {topicTable}
                    </WrapTable>
                    <WrapRank>  
                        <Leaderboard>
                        <LBTitle>Đại lộ danh vọng</LBTitle>
                            <LBContent>
                                <Pro>
                                <Grandmaster>{userRank[0]&&userRank[0].fullName}</Grandmaster>
                                <Point>{userRank[0]&&userRank[0].marks}</Point>
                                </Pro>
                                <Pro>
                                <Master>{userRank[1]&&userRank[1].fullName}</Master>
                                <Point>{userRank[1]&&userRank[1].marks}</Point>
                                </Pro>
                                <Pro>
                                <Master>{userRank[2]&&userRank[2].fullName}</Master>
                                <Point>{userRank[2]&&userRank[2].marks}</Point>
                                </Pro>
                                <Pro>
                                <Master>{userRank[3]&&userRank[3].fullName}</Master>
                                <Point>{userRank[3]&&userRank[3].marks}</Point>
                                </Pro>
                                <Pro>
                                <Master>{userRank[4]&&userRank[4].fullName}</Master>
                                <Point>{userRank[4]&&userRank[4].marks}</Point>
                                </Pro>
                                <Pro>
                                <Hacker>{userRank[5]&&userRank[5].fullName}</Hacker>
                                <Point>{userRank[5]&&userRank[5].marks}</Point>
                                </Pro>
                                <Pro>
                                <Hacker>{userRank[6]&&userRank[6].fullName}</Hacker>
                                <Point>{userRank[6]&&userRank[6].marks}</Point>
                                </Pro>
                                <Pro>
                                <Hacker>{userRank[7]&&userRank[7].fullName}</Hacker>
                                <Point>{userRank[7]&&userRank[7].marks}</Point>
                                </Pro>
                                <Pro>
                                <Hacker>{userRank[8]&&userRank[8].fullName}</Hacker>
                                <Point>{userRank[8]&&userRank[8].marks}</Point>
                                </Pro>
                                <Pro>
                                <Hacker>{userRank[9]&&userRank[9].fullName}</Hacker>
                                <Point>{userRank[9]&&userRank[9].marks}</Point>
                                </Pro>
                            </LBContent>
                        </Leaderboard>
                    </WrapRank>
                </ContainerWrap>
            </Container>}
        </>
    )
}

export default CourseDetails;
const TitleContent = styled.div`

`
const Container = styled.div`
    height: 80vh;
    width: 90vw;
    background-color:white;
    border-radius: 5px;
`
const ContainerWrap = styled.div`
    display: flex;
`
const WrapRank = styled.div`
    border: solid black;
    width:100%;
    margin-top: 3rem;
    height:100%;
    display: flex;
    justify-content: center;
    flex: 3;
`
const WrapTable = styled.div`
    border: solid black;
    width:100%;
    background-color: blue;
    height:100%;
    flex: 4;
`

const WrapCourse = styled.div`
    width: 100%;
    border: solid black;
    width:100%;
    background-color: blue;
    display: flex;
`
const TitleWrap = styled.div`
    border: solid black;
    width:100%;
    flex: 4;
`
const EnrollImg = styled.div`
    width:50%;
    margin: 0 auto;
`
const ImgWrap = styled.div`
    border: solid black;
    background-color: blue;
    width:100%;
    flex: 3;
    padding-top: 1rem;
    padding-bottom: 0.5rem;

    img {
        height: 90%;
        margin: 0 auto;
    }
`
const Enroll = styled.button`
    color: white;
    font-weight: 500;
    border: 5px;
    background: green;
    text-align: center;
    width:100%;
    margin: 0 auto;
    height: 2rem;
    display:flex;
    justify-content: center;
    align-items: center;
    border-radius:
`

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
  &>div{
    min-height:2rem;
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
