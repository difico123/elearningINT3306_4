import React, {useEffect, useState} from 'react'
import CourseService from "../../../service/courseService";
import styled from 'styled-components';

function TopicContent(props) {
    const {courseId, topicId} = props;

    console.log(props)
    const [topic,setTopic] = useState({
        id: '',
        title: "đây là tiêu đề của topic",
        description: "đây là tiêu đề của topicđây là tiêu đề của topicđây là tiêu đề của topicđây là tiêu đề của topic",
        content: "",
    })
    const [isLoading,setLoading] = useState(true);

    useEffect(() => {
        let topic = CourseService.getTopicDetails(courseId, topicId).then((response) => {
            setTopic({...response.topic})
        })

        Promise.all([topic]).then(() => {
            setLoading(false);
        })
    },[courseId,topicId])


    return (
        <WrapperContent>
            {!isLoading && 
            <div>
                <div> {topic.description}</div>
                <div dangerouslySetInnerHTML={{ __html: topic.content}}  />
            </div>}
        </WrapperContent>
    )
}

export default TopicContent
const WrapperContent = styled.div`
    padding: 1rem;
`