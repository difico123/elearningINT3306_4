import React, {useEffect, useState} from 'react'
import CourseService from "../../../service/courseService";
import styled from 'styled-components';
import Loader from '../../common/loader';

function TopicContent({courseId, topicId}) {
    const [topic,setTopic] = useState({
        id: '',
        title: "",
        description: "",
        content: "",
    })
    const [isLoading,setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let topic = CourseService.getTopicDetails(courseId, topicId).then((response) => {
            setTopic({...response.topic})
        }).catch(err => {
            setLoading(false);
            let obj = {
                id: '',
                title: "",
                description: "",
                content: "",
            }
            setTopic({...obj})
        })

        Promise.all([topic]).then(() => {
            setLoading(false);
        })
    },[courseId,topicId])

    const Loading = <WrapLoader><Loader/></WrapLoader>
    
    const Loaded =  !topic.id ? <NoContent>Chưa có nội dung</NoContent>:<div> <div><WrapDescription>{topic.description}</WrapDescription></div><WrapDescription></WrapDescription> <div dangerouslySetInnerHTML={{ __html: topic.content}} /></div>

    return (
        <WrapperContent>
            {isLoading ?  Loading: Loaded }
        </WrapperContent>
    )
}

export default TopicContent

const NoContent = styled.div`
    position: absolute;
    top:10%;
    left:50%;
    transform: translateX(-50%);
    font-size: 1.2rem;

`
const WrapperContent = styled.div`
    padding: 1rem;
    overflow-x: hidden;
`
const WrapLoader = styled.div`
    position: absolute;
    top:20%;
    left:50%;
    transform: translate(-50%, -50%);
`
const WrapDescription = styled.span`
    font-size:1.2rem;
    font-weight:500;
    margin-right: 1rem;
`