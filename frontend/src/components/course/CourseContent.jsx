import React,{useEffect, useState} from "react";
import styled from "styled-components";
import {useParams} from 'react-router-dom'
import CourseService from '../../service/courseService'
import Loader from '../common/loader'

function CourseContent() {
  let {id} = useParams()
  const [isLoading, setLoading] = useState(true);

  const [course, setCourse] = useState({
    name: "",
    description: "",
    instructorName: "",
    rating: "",
    register: "",
  });
  const [topics, setTopics] = useState([{
    id: '',
    title: '',
    description: '',
    content: '', 
    imageUrl: '',
  }])

  const [topicId,setTopicId] = useState(null)

useEffect(() => {
  (async () => {
    await CourseService.getEnrollTopics(id).then(res => {
      setCourse({...res.course})
      setTopics([...res.topics])
      setTopicId(res.topics[0]? res.topics[0].id: '')
      setLoading(false)
    })
  })()
},[])

  const Loading = <LoaderWrap><Loader/></LoaderWrap>
  const renderTopics = topics.map((topic, index) => (
    <Title key ={index} onClick={() =>{setTopicId(topic.id)}}>Chủ đề {index+1}: {topic.title}</Title>
  ))

  const Loaded = <TopicContent courseId={id} topicId={topicId}/>

  return (
    <Container>
      <TopicWrap>
        {renderTopics}
      </TopicWrap>
      <Content>
      {isLoading? Loading : Loaded}
      </Content>
    </Container>
  );
}


function TopicContent({topicId, courseId}) {

  const [topic,setTopic] = useState({
    content: "",
    courseId: '',
    createdAt: "",
    description: "",
    id: '',
    title: ""
  })
  const [isLoading, setLoading] = useState(true);

  const Loading = <LoaderWrap><Loader/></LoaderWrap>

  useEffect(()=> {
    (async () => {
      setLoading(true)
      await CourseService.getTopicDetails(courseId,topicId).then(res => {
        console.log(res)
        setTopic({...res.topic})
        setLoading(false)
      })
    })()
  },[topicId])
  const Loaded =  <div> <div><WrapDescription>Mô tả ngắn gọn: </WrapDescription> {topic.description}</div><WrapDescription>Nội dung: </WrapDescription> <div dangerouslySetInnerHTML={{ __html: topic.content}} /></div>
  return (
    <>
      {isLoading? Loading : Loaded}
    </>
  )
}

const WrapDescription = styled.span`
    font-size:1.2rem;
    font-weight:500;
    text-decoration: underline;
    margin-right: 1rem;
`
const LoaderWrap = styled.div`
  position: absolute;
  top:20%;
  left:50%;
  transform: translate(-50%, -50%);
`

const Container = styled.div`
  height: 90vh;
  display: flex;
  flex-flow: row nowrap;
`;

const NavTitle = styled.div`
  background-color: #f0f0f0;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.7rem 1rem;
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
  width: 20%;
  flex-flow: column nowrap;
  overflow-y: auto;
  height: 16rem;
  position: sticky;
  background-color: #f0f0f0;
  right: 0px;
  height: 90vh;
`;

const Title = styled.div`
  padding: 1.5rem 0.75vw;
  font-weight: 500;
  word-wrap: break-word;
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

const Content = styled.div`
  position: relative;
  overflow: auto;
  background-color: white;
  width: 100%;
`;

export default CourseContent;