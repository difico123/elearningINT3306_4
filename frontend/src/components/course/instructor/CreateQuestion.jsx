import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import dummy from "../../../dummydata/dummy.json";
import courseService from "../../../service/courseService";
import { useParams } from "react-router-dom";
import quizService from "../../../service/quizService";
import { ClearIcon } from "../../common/icons";
import ShowQuestions from "./ShowQuestions"
import Toast from '../../common/toast'
import Loader from '../../common/loader'
import showToast from '../../../dummydata/toast'


function CreateQuestion() {
  let { id } = useParams();
  const [topics, setTopics] = useState([
    {
      id: "",
      title: "",
    },
  ]);
  const [quizzes, setQuizzes] = useState([]);

  const [answerList, setAnswerList] = useState([
    {
      content: "",
      isAnswer: false,
    },
  ]);

  const [errorMsg, setErrorMsg] = useState('');
  const [toastList, setToastList] = useState([])
  const [isLoading, setLoading] = useState(false); //
  const [question,setQuestion] = useState('')
  const [marks, setMarks]  = useState(5);

  const onChangeInput = (e, index) => {
    let newArr = [...answerList];
    newArr[index].content = e.target.value;
    setAnswerList(newArr);
  };

  const onChangeAnswer = (e, index) => {
    let newArr = [...answerList];
    newArr[index].isAnswer = e.target.checked;
    setAnswerList(newArr);
  };

  const [topicId, setTopicId] = useState(-1);
  const [quizId, setQuizId] = useState(-1);

  const chooseTopic = topics.map((v, index) => (
    <option value={v.id} key={index}>
      {v.title}
    </option>
  ));

  const chooseQuiz = quizzes.map((v, index) => (
    <option value={v.id} key={index}>
      {v.title}
    </option>
  ));

  useEffect(() => {
    courseService.getTopicNames(id).then((response) => {
      setTopics(response.topics);
    });
  }, []);

  useEffect(() => {
    setQuizId(-1)
    quizService.getQuizTitles(id, topicId).then((response) => {
      setQuizzes(response.quizes);
    });
  }, [topicId]);

  const selectTopic = (
    <Dropdown
      onChange={(e) => {
        setTopicId(e.target.value);
      }}
    >
      <option disabled selected={true} defaultValue="">
        Chọn topic
      </option>
      {chooseTopic}
    </Dropdown>
  );

  const selectQuiz = (
    <Dropdown
      onChange={(e) => {
        setQuizId(e.target.value);
      }}
    >
      <option disabled selected={true} defaultValue="">
        Chọn quiz
      </option>
      {chooseQuiz}
    </Dropdown>
  );

  // console.log("abc",answerList)
  const handleAddAnswer = (e) => {
    e.preventDefault();
    if (answerList.length > 5) {
      return;
    } else {
      setAnswerList([
        ...answerList,
        {
          content: "",
          isAnswer: false,
        },
      ]);
    }
  };
  const handleDeleteAnswer = (e, index) => {
    e.preventDefault();
    setAnswerList(answerList.filter((answer, i) =>  i!== index));
  };

  const quiz = answerList.map((v, index) => {
    return index > 5 ? (
      ""
    ) : (
      <QuizWrap key={index}>
        <AnswerTitle>
          <span>Câu trả lời {index + 1}</span>
        </AnswerTitle>
        <Inputs>
          <input
            type="checkbox"
            name="isAnswer"
            checked={v.isAnswer}
            onChange={(e) => onChangeAnswer(e, index)}
          ></input>
          <input
            type="text"
            name="content"
            value={v.content}
            onChange={(e) => onChangeInput(e, index)}
          ></input>
          <DeleteAnswer onClick={(e) => handleDeleteAnswer(e, index)}>
            <ClearIcon />
          </DeleteAnswer>
        </Inputs>
      </QuizWrap>
    );
  });

  const handleAddAnswerQuestion = (e) => {
    e.preventDefault();

    if(topicId <= 0) {
      setErrorMsg('Vui lòng chọn topic');
      return;
    }
    if(quizId <= 0) {
      setErrorMsg('Vui lòng chọn quiz');
      return;
    }
    if(question.length <= 10) {
      setErrorMsg('Câu hỏi phải nhiều hơn 10 kí tự');
      return;
    }
    if(answerList.length < 2) {
      setErrorMsg('Phải có 2 đáp án trở lên');
      return;
    }
    for(let i = 0; i < answerList.length; i++) {
      if(answerList[i].content.length <= 10) {
        setErrorMsg('Đáp án có nhiều hơn 10 kí tự');
        return;
      }
    }

    let body = {
      content: question,
      marks: marks
    }
    setLoading(true);
    quizService.createQuestion(id,topicId,quizId,body).then(async (response) => {
      const questionId = response.newQuestion.id

      for(let i = 0; i < answerList.length; i++) {
        await quizService.createAnswer(id,topicId,quizId,questionId,answerList[i]).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err.response)
          setToastList([...toastList, showToast('danger','Thông báo', 'lỗi')])
        })
      }
      setErrorMsg('');
      setLoading(false)
      setToastList([showToast('success','Thông báo', 'Tạo câu hỏi thành công')])
    }).catch((error) => {
      setErrorMsg(error.response.data.msg.toString());
      setToastList([showToast('danger','Thông báo',error.response.data.msg.toString())])
      setLoading(false)
    })
  }

  const loading = <WrapLoader><Loader/></WrapLoader>
  const loaded = <WrapLoader><p className="text-red-600">{errorMsg}</p></WrapLoader>
  return (
    <Container>
      <AddQuestion>
        <Title>Tạo quiz mới</Title>
        <CreateQuestionForm>
          <CategoryWrap>
            <FormTitle>Lựa chọn topic</FormTitle>
            {selectTopic}
          </CategoryWrap>
          <CategoryWrap>
            <FormTitle>Lựa chọn quiz</FormTitle>
            {selectQuiz}
          </CategoryWrap>
          <QuizWrap>
            <FormTitle>Tên câu hỏi</FormTitle>
            <textarea name="name" value={question} onChange={(e)=> {setQuestion(e.target.value)}}></textarea>
          </QuizWrap>
          {quiz}
          <QuizWrap>
            <FormTitle></FormTitle>
            <AddAnswerButton onClick={handleAddAnswer}>
              <span>Thêm câu trả lời</span>
            </AddAnswerButton>
          </QuizWrap>
          <MarksSubmitBtn>
            <Marks>
              <label htmlFor="content">Điểm</label>
              <input
                type="number"
                name="content"
                value={marks}
                onChange={(e) => {setMarks(e.target.value)}}
              ></input>
            </Marks>
              <Confirm type="submit" value="Thêm câu hỏi" onClick={handleAddAnswerQuestion}></Confirm>
          </MarksSubmitBtn>
            {isLoading? loading :loaded}
        </CreateQuestionForm>
     
      </AddQuestion>
      <ShowQuestionContent>abc</ShowQuestionContent>

      <Toast toastList={toastList}/>
    </Container>
  );
}

export default CreateQuestion;

const AddQuestion = styled.div`
  padding: 1vh 1vw;
  min-height:100vh;
  flex:1;
`;
const WrapLoader = styled.div`
    position: relative;
    text-align: center;
    margin-top: 2rem;
    &>div{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%)
  }
`;
const MarksSubmitBtn = styled.div`
  position:relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
`;
const Marks = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
  input[type="number"] {
    max-width: 10rem;
    height: 3rem;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    -moz-appearance: textfield;
    border-radius:5px;
    font-weight:bold;
    font-size:1.25rem;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  label {
    font-weight: bold;
    font-size: 1.25rem;
  }
`;
const ShowQuestionContent = styled(ShowQuestions)`
  flex:1;
  width: 50%;
  background-color: white;
  
`;
const Container = styled.div`
  position: relative;
  width: 85vw;
  overflow: auto;
  height: 90vh;
  display: flex;
  flex-flow: row nowrap;
`;

const Title = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
`;

const CreateQuestionForm = styled.form`
  position: relative;
  margin: 2rem auto;
  padding: 2rem 0 5rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 0 2vw;
`;

const FormTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.4rem 0;
  width: 12vw;
`;

const Dropdown = styled.select`
  cursor: pointer;
  padding: 0.45rem 1vw 0.35rem 1vw;
  height: 45px;
  width: 100%;
  autocomplete: off;
  background-image: none;
  font-size: 18px;
  font-weight: lighter;
  background-color: #f9f9f9;
  outline: none;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  option {
    cursor: pointer;
  }
`;

const Confirm = styled.input`
  padding: 0 2rem;
  background-color: #4caf50;
  height: 45px;
  align-self: flex-end;
  font-weight: bold;
  color: white;
  transition: 0.3s ease 0s;
  cursor: pointer;
  &:hover {
    border: transparent;
    color: white;
    background-color: #04aa6d;
  }
`;

const QuizWrap = styled.div`
  padding: 0.2rem 2vw;
 
  textarea {
    padding: 0.35rem 0.1rem 0.35rem 1rem;
    height: 45px;
    width: 100%;
    autocomplete: off;
    background-image: none;
    font-size: 18px;
    font-weight: lighter;
    background-color: #f9f9f9;
    outline: none;
    border-radius: 5px;
    border: 1px solid #ccc;
    height: 6rem;
  }


  display: flex;
  flex-flow: row nowrap;
`;

const AddAnswerButton = styled.button`
background-color: #7f8c8d;
  height: 45px;
  width: 100%;
  font-weight: bold;
  color: white;
  transition: 0.3s ease 0s;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    border: transparent;
    color: black;
    background-color: lightgrey;
  }
`;

const AnswerTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.4rem 0;
  width: 12vw;
  gap: 1px;
  justify-content: flex-start;
  align-items: start;
  input {
    transform: scale(0.5);
    display: inline-block;
  }
  span {
    display: inline-block;
  }
`;

const Inputs = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  align-itens: center;
  justify-content: space-around;
  gap: 30px;
  input[type="checkbox"] {
    height: 45px;
    width: 5%;
  }
  input[type="text"]{
    padding: 0.35rem 0.1rem 0.35rem 1rem;
    height: 45px;
    width: 100%;
    autocomplete: off;
    background-image: none;
    font-size: 18px;
    font-weight: lighter;
    background-color: #f9f9f9;
    outline: none;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
`;

const DeleteAnswer = styled.button`
  background-color: crimson;
  color: white;
  display: flex;
  height: 45px;
  width: 60px;
  justify-content: center;
  align-items: center;
  display: inline-block;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: red;
    opacity: 0.75;
  }
`;