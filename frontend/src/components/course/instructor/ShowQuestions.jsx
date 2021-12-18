import React,{ useState, useEffect} from 'react'
import styled from "styled-components";
import './ShowQuestion.css'
import quizService from '../../../service/quizService';
import {useParams} from 'react-router-dom'
import {CheckIcon, ClearIcon, DeleteForeverIcon } from '../../common/icons.js'
import Loader from '../../common/loader';
import showToast from '../../../dummydata/toast';
import Toast from '../../common/toast';

function ShowQuestion({topicId, quizId, setUpdateAnswerQuestion, addAnswerQuestion, selectedQuestionId, setSelectedQuestionId, deleteQuestionId,setUpdateMode}) {
    const {id} = useParams();
    const [questions,setQuestions] = useState([])
    const [isLoading,setLoading] = useState(false)
    const [toastList, setToastList] = useState([])

    useEffect(() => {
        if(quizId !== -1 && topicId !== -1) {
            (async () => {
                setLoading(true)
                await quizService.getInstructorQuestions(id, topicId, quizId).then(data => {
                setQuestions(data.questions)
                setLoading(false)
            }).catch(error =>{
                setLoading(false)
            })})()
        }
    },[topicId, quizId])

    useEffect(() => {
        if(quizId !== -1 && topicId !== -1) {
            setQuestions(old => [...old,addAnswerQuestion])
        }
    },[addAnswerQuestion])

    useEffect(() => {
        if(deleteQuestionId!== -1) {
            setQuestions(old => [...old,addAnswerQuestion])
            setQuestions(questions.filter((question) =>  question.questionId!== deleteQuestionId));
        }
    },[deleteQuestionId])


    const handleSelectedQuestionId = (question) => {
        setUpdateAnswerQuestion(question)
        setSelectedQuestionId(question.questionId)
    }
    
    const handleDeleteQuestion = () => {
        quizService.deleteQuestion(id,topicId,quizId,selectedQuestionId).then(() => {
            setToastList([showToast('success','Thông báo', 'Xoá câu hỏi thành công!')])
            setQuestions(questions.filter((question) =>  question.questionId!== selectedQuestionId));
            setUpdateAnswerQuestion({
                content: "",
                marks: 5,
                questionId: '',
                answers: [{
                    choiceId:"",
                    content: "",
                    isAnswer: false,
                }]
            })
            setSelectedQuestionId(-1)
            setUpdateMode(false)
        }).catch(() => {
            setToastList([showToast('danger','Thông báo', 'Chưa xoá được câu hỏi!')])
        })
    }
    
    const loading = <WrapLoader><Loader/></WrapLoader>

    const tables = questions.map((question,index) => {
        let {questionId, content, marks, answers} = question;
        answers = answers? answers: [{
            isAnswer: 0,
            content: ''
        }]
        return (
        <tbody className={selectedQuestionId === questionId? "active" : ''} key={index}>
            <tr  onClick={() => {handleSelectedQuestionId(question) }}>
                <td rowSpan={answers.length} data-label="question">Câu {index + 1}: {content}</td>
                <td  data-label="isAnswer">{answers[0].isAnswer === 1? <Correct/>:<Fail/>}</td>
                <td colSpan="4" data-label="Answer" >{answers[0].content}</td>
                <td rowSpan={answers.length} data-label="marks">{marks}</td>
                <td rowSpan={answers.length} data-label="options">{selectedQuestionId === questionId?<DeleteIcon onClick={handleDeleteQuestion}/> : '...' }</td>
            </tr>

            {
                answers.map((answer,index) => {
                    if(index < 1 ) {
                        return;
                    } else {
                        return (<tr  onClick={() => {handleSelectedQuestionId(question)}}>
                                    <td  data-label="isAnswer">{answer.isAnswer === 1? <Correct/>:<Fail/>}</td>
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
            <Toast toastList={toastList}/>
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

const DeleteIcon = styled(DeleteForeverIcon) `
    color: red;
    border-radius: 5px;
    &:hover{
        background-color: #bdc3c7;
        padding:2px;
    }
`