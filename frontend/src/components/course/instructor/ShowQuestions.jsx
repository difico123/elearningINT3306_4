import React,{ useState, useEffect} from 'react'
import styled from "styled-components";
import './ShowQuestion.css'
import quizService from '../../../service/quizService';
import {useParams} from 'react-router-dom'
import {CheckIcon, ClearIcon} from '../../common/icons.js'
import Loader from '../../common/loader';

function ShowQuestion({topicId, quizId}) {
    const {id} = useParams();
    const [questions,setQuestions] = useState([])
    const [isLoading,setLoading] = useState(false)

    useEffect(() => {
        if(quizId !== -1 && topicId !== -1) {
            setLoading(true)
            quizService.getInstructorQuestions(id, topicId, quizId).then(data => {
                setQuestions(data.questions)
                setLoading(false)
            }).catch(error =>{
                setLoading(false)
            })
        }
    },[topicId, quizId])

    const loading = <WrapLoader><Loader/></WrapLoader>

    const tables = questions.map(question => {
        const {content, marks, answers} = question;
        return (
        <tbody>
            
            <tr>
                <td rowSpan={answers.length} data-label="question">{content}</td>
                <td data-label="isAnswer">{answers[0].isAnswer === 1? <Correct/>:<Fail/>}</td>
                <td colSpan="4" data-label="Answer">{answers[0].content}</td>
                <td rowSpan={answers.length} data-label="marks">{marks}</td>
                <td rowSpan={answers.length} data-label="options">..</td>
            </tr>

            {
                answers.map((answer,index) => {
                    if(index < 1 ) {
                        return;
                    } else {
                        return (<tr>
                                    <td data-label="isAnswer">{answer.isAnswer === 1? <Correct/>:<Fail/>}</td>
                                    <td colSpan="4" data-label="Answer">{answer.content}</td>
                                </tr>)
                    }
                })
            }
        </tbody>)
    })

    return (
        <ContentWrap>
          <table>
                <thead>
                    <th data-label="question">Tên câu hỏi</th>
                    <th data-label="marks">Đ/S</th>
                    <th colSpan="4" data-label="answer" >Đáp Án</th>
                    <th data-label="marks">Điểm</th>
                    <th data-label="options"></th>
                </thead>
                {!isLoading&&tables}
            </table>
            {isLoading&&loading}
        </ContentWrap>
    )
}

export default ShowQuestion;

const ContentWrap = styled.div`
    width:50%;
    height:100vh;
    overflow-y:auto;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.7);
    position:relative;
`

const Fail = styled(ClearIcon)`
    color: red;
`
const Correct = styled(CheckIcon)`
    color: green;
`

const WrapLoader = styled.div`
    display:flex;
    justify-content: center;
    margin-top:2rem;
`