import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import courseService from "../../../service/courseService";
import { useParams,Link } from "react-router-dom";
import quizService from "../../../service/quizService";
import { ClearIcon } from "../../common/icons";
import ShowQuestions from "./ShowQuestions";
import Toast from "../../common/toast";
import Loader from "../../common/loader";
import showToast from "../../../dummydata/toast";

function CreateQuestion() {
  let { id } = useParams();
  const [topics, setTopics] = useState([
    {
      id: "",
      title: "",
    },
  ]);
  const [quizzes, setQuizzes] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [toastList, setToastList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [question, setQuestion] = useState({
    content: "",
    marks: 5,
    questionId: "",
  });
  const [answerList, setAnswerList] = useState([
    {
      choiceId: "",
      content: "",
      isAnswer: false,
    },
  ]);
  const [topicId, setTopicId] = useState(-1);
  const [quizId, setQuizId] = useState(-1);
  const selectInputRef = useRef();
  const [addAnswerQuestion, setAddAnswerQuestion] = useState({});
  const [updateAnswerQuestion, setUpdateAnswerQuestion] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(-1);
  const [deleteQuestionId, setDeleteQuestionId] = useState(-1);
  const [correctAnswer, setCorrectAnswer] = useState(-1);
  const onChangeInput = (e, index) => {
    let newArr = [...answerList];
    newArr[index].content = e.target.value;
    setAnswerList(newArr);
  };

  const onChangeAnswer = (e, index) => {
    // let newArr = [...answerList];
    setCorrectAnswer(index);
    // newArr[index].isAnswer = e.target.checked ? 1: 0;
    // setAnswerList(newArr);
  };

  useEffect(() => {
    if (updateAnswerQuestion) {
      setUpdateMode(true);
      let { content, marks, questionId, answers } = updateAnswerQuestion;
      setQuestion({ content, marks, questionId });
      setAnswerList(answers);
      setCorrectAnswer(answers.findIndex((v) => v.isAnswer === 1));
    }
    setErrorMsg("");
  }, [updateAnswerQuestion]);

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
    quizService.getQuizTitles(id, topicId).then((response) => {
      setQuizzes(response.quizes);
    });
  }, [topicId]);

  const selectTopic = (
    <Dropdown
      onChange={(e) => {
        setQuizId(-1);
        selectInputRef.current.selected = true;
        setTopicId(e.target.value);
        setCorrectAnswer(-1);
        setUpdateMode(false)
      }}
    >
      <option disabled selected={true} value={topicId} defaultValue={null}>
        Chọn topic
      </option>
      {chooseTopic}
    </Dropdown>
  );

  const selectQuiz = (
    <Dropdown
      onChange={(e) => {
        setQuizId(e.target.value);
        setCorrectAnswer(-1);
        setUpdateMode(false)
      }}
    >
      <option
        disabled
        ref={selectInputRef}
        selected={true}
        value={quizId}
        defaultValue={null}
      >
        Chọn quiz
      </option>
      {chooseQuiz}
    </Dropdown>
  );

  const handleAddAnswer = (e) => {
    e.preventDefault();
    if (answerList.length > 3) {
      setToastList([
        showToast("info", "Thông báo!", "Chỉ có tối đa 4 đáp án!"),
      ]);
      return;
    } else {
      setAnswerList([
        ...answerList,
        {
          choiceId: "",
          content: "",
          isAnswer: false,
        },
      ]);
    }
  };

  const handleDeleteAnswer = (e, index) => {
    e.preventDefault();
    setAnswerList(answerList.filter((answer, i) => i !== index));
    if (correctAnswer === index) {
      setCorrectAnswer(-1);
    } else if (correctAnswer > index) {
      setCorrectAnswer((old) => old - 1);
    }
    setErrorMsg("");
  };

  const quiz = answerList.map((v, index) => {
    return index > 3 ? (
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
            // checked={v.isAnswer}
            checked={correctAnswer === index}
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

  const handleAddAnswerQuestion = async (e) => {
    e.preventDefault();

    if (topicId <= 0) {
      setErrorMsg("Vui lòng chọn topic");
      return;
    }
    if (quizId <= 0) {
      setErrorMsg("Vui lòng chọn quiz");
      return;
    }
    if (question.content.length <= 10) {
      setErrorMsg("Câu hỏi phải nhiều hơn 10 kí tự");
      return;
    }
    if (answerList.length < 2) {
      setErrorMsg("Phải có 2 đáp án trở lên");
      return;
    }
    if (correctAnswer === -1) {
      setErrorMsg("Phải có 1 đáp án đúng");
      return;
    }

    for (let i = 0; i < answerList.length; i++) {
      answerList[i].isAnswer = false;
      if (answerList[i].content.length <= 10) {
        setErrorMsg("Đáp án có nhiều hơn 10 kí tự");
        return;
      }
    }
    answerList[correctAnswer].isAnswer = 1;

    let body = {
      content: question.content,
      marks: question.marks,
    };

    let addedAnswerQuestion = {};
    setLoading(true);

    await quizService
      .createQuestion(id, topicId, quizId, body)
      .then(async (response) => {
        const questionId = response.newQuestion.id;
        const { content, marks } = response.newQuestion;
        addedAnswerQuestion = {
          content,
          marks,
          questionId,
          answers: [],
        };
        for (let i = 0; i < answerList.length; i++) {
          await quizService
            .createAnswer(id, topicId, quizId, questionId, answerList[i])
            .then((res) => {
              const { id, isAnswer, content } = res.newChoice;
              const choiceId = id;
              let newChoice = { choiceId, isAnswer: isAnswer ? 1 : 0, content };
              addedAnswerQuestion.answers.push(newChoice);
            })
            .catch((err) => {
              console.log(err.response);
              setToastList([
                ...toastList,
                showToast("danger", "Thông báo", "lỗi"),
              ]);
            });
        }

        setErrorMsg("");
        setLoading(false);
        setToastList([
          showToast("success", "Thông báo", "Tạo câu hỏi thành công"),
        ]);
      })
      .catch((error) => {
        setErrorMsg(error.response.data.msg.toString());
        setToastList([
          showToast("danger", "Thông báo", error.response.data.msg.toString()),
        ]);
        setLoading(false);
      });
    setAddAnswerQuestion({ ...addedAnswerQuestion });
    setSelectedQuestionId(addedAnswerQuestion.questionId);
  };

  const handleUpdateAnswerQuestion = async (e) => {
    e.preventDefault();

    if (topicId <= 0) {
      setErrorMsg("Vui lòng chọn topic");
      return;
    }
    if (quizId <= 0) {
      setErrorMsg("Vui lòng chọn quiz");
      return;
    }
    if (question.content.length <= 10) {
      setErrorMsg("Câu hỏi phải nhiều hơn 10 kí tự");
      return;
    }
    if (answerList.length < 2) {
      setErrorMsg("Phải có 2 đáp án trở lên");
      return;
    }
    if (correctAnswer === -1) {
      setErrorMsg("Phải có 1 đáp án đúng");
      return;
    }

    for (let i = 0; i < answerList.length; i++) {
      answerList[i].isAnswer = false;
      if (answerList[i].content.length <= 10) {
        setErrorMsg("Đáp án có nhiều hơn 10 kí tự");
        return;
      }
    }
    answerList[correctAnswer].isAnswer = 1;
    try {
      await quizService.deleteQuestion(id, topicId, quizId, selectedQuestionId);

      let body = {
        content: question.content,
        marks: question.marks,
      };

      let addedAnswerQuestion = {};
      setLoading(true);

      await quizService
        .createQuestion(id, topicId, quizId, body)
        .then(async (response) => {
          const questionId = response.newQuestion.id;
          const { content, marks } = response.newQuestion;
          addedAnswerQuestion = {
            content,
            marks,
            questionId,
            answers: [],
          };
          for (let i = 0; i < answerList.length; i++) {
            await quizService
              .createAnswer(id, topicId, quizId, questionId, answerList[i])
              .then((res) => {
                const { id, isAnswer, content } = res.newChoice;
                const choiceId = id;
                let newChoice = {
                  choiceId,
                  isAnswer: isAnswer ? 1 : 0,
                  content,
                };
                addedAnswerQuestion.answers.push(newChoice);
              })
              .catch((err) => {
                console.log(err.response);
                setToastList([
                  ...toastList,
                  showToast("danger", "Thông báo", "lỗi"),
                ]);
              });
          }

          setErrorMsg("");
          setLoading(false);
          setToastList([
            showToast("success", "Thông báo", "Sửa câu hỏi thành công"),
          ]);
        })
        .catch((error) => {
          setErrorMsg(error.response.data.msg.toString());
          setToastList([
            showToast(
              "danger",
              "Thông báo",
              error.response.data.msg.toString()
            ),
          ]);
          setLoading(false);
        });
      setDeleteQuestionId(selectedQuestionId);
      setAddAnswerQuestion({ ...addedAnswerQuestion });
      setSelectedQuestionId(addedAnswerQuestion.questionId);
    } catch (error) {
      setToastList([showToast("danger", "Thông báo", "lỗi")]);
    }
  };

  const loading = (
    <WrapLoader>
      <Loader />
    </WrapLoader>
  );
  const loaded = (
    <WrapLoader>
      <p className="text-red-600">{errorMsg}</p>
    </WrapLoader>
  );

  const handleBackToAddQuestion = () => {
    setQuestion({
      content: "",
      marks: 5,
      questionId: "",
    });
    setAnswerList([
      {
        choiceId: "",
        content: "",
        isAnswer: false,
      },
    ]);
    setUpdateMode(false);
    setSelectedQuestionId(-1);
    setCorrectAnswer(-1);
  };

  return (
    <Container>
      <AddQuestion>
        <WrapTitle>
           <TitleWrap>
             <Link to="./"><Title  onClick={handleBackToAddQuestion}>Tạo câu hỏi mới</Title></Link> 
             {updateMode && <Link to="./"><Title className="edit">Chỉnh sửa câu hỏi</Title></Link>}
          </TitleWrap>

        </WrapTitle>
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
            <textarea
              name="name"
              value={question.content}
              onChange={(e) => {
                setQuestion({ ...question, content: e.target.value });
              }}
            ></textarea>
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
                value={question.marks}
                onChange={(e) => {
                  if (e.target.value > -1) {
                    setQuestion({ ...question, marks: e.target.value });
                  } else {
                    setQuestion({ ...question, marks: 5 });
                  }
                }}
              ></input>
            </Marks>
            {updateMode ? (
              <Confirm
                className="active"
                type="submit"
                value="Sửa câu hỏi"
                onClick={handleUpdateAnswerQuestion}
              ></Confirm>
            ) : (
              <Confirm
                type="submit"
                value="Xác nhận"
                onClick={handleAddAnswerQuestion}
              ></Confirm>
            )}
          </MarksSubmitBtn>
          {isLoading ? loading : loaded}
        </CreateQuestionForm>
      </AddQuestion>
      <ShowQuestionContent
        topicId={topicId}
        quizId={quizId}
        addAnswerQuestion={addAnswerQuestion}
        setUpdateAnswerQuestion={setUpdateAnswerQuestion}
        selectedQuestionId={selectedQuestionId}
        setSelectedQuestionId={setSelectedQuestionId}
        deleteQuestionId={deleteQuestionId}
        setUpdateMode={setUpdateMode}
      ></ShowQuestionContent>

      <Toast toastList={toastList} />
    </Container>
  );
}

export default CreateQuestion;

const BackBtn = styled.input`
  padding: 0 2rem;
  background-color: rgba(255, 255, 255, 0.2);
  font-weight: 500;
  transition: 0.3s ease 0s;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: green;
    border: 1px solid green;
    color: white;
  }
`;
const WrapTitle = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
`;
const AddQuestion = styled.div`
  padding: 1vh 1vw;
  min-height: 100vh;
  flex: 1;
`;
const WrapLoader = styled.div`
  position: relative;
  text-align: center;
  margin-top: 2rem;
  & > div {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const MarksSubmitBtn = styled.div`
  position: relative;
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
    border-radius: 5px;
    font-weight: bold;
    font-size: 1.25rem;
    border: 2px solid #ccc;
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
  flex: 1;
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
  background-color: rgba(189, 195, 199, 0.7);
`;
const TitleWrap = styled.div`
  display: flex;
  gap:10px;
  
  `
const Title = styled.span`
    font-size: 1rem;
    font-weight: bold;
    padding: 8px 20px;
    box-shadow: rgb(6 24 44 / 40%) 0px 0px 0px 2px, rgb(6 24 44 / 65%) 0px 4px 6px -1px, rgb(255 255 255 / 8%) 0px 1px 0px inset;
    border-radius: 5px;
    background-color: white;
    color: #3b5990;
    &.edit{
      background-color: #FED54A;
    }
`;

const CreateQuestionForm = styled.form`
  position: relative;
  margin: 1rem auto;
  padding: 2rem 0 5rem;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  min-height: 80vh;
  background-color: rgba(255, 255, 255, 0.4);
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
  border-radius: 5px;
  padding: 0 2rem;
  background-color: #4caf50;
  width: 10rem;
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
  &.active {
    color: white;
    background-color: purple;
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
  textarea,
  input {
    font-size: 1.2rem;
    font-weight: 500;
    border: 2px solid #ccc;
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
    border: 2px solid #ccc;
  }
  input[type="text"] {
    padding: 0.35rem 0.1rem 0.35rem 1rem;
    height: 45px;
    width: 100%;
    autocomplete: off;
    background-image: none;
    font-weight: 500;
    font-size: 1.2rem;
    background-color: #f9f9f9;
    outline: none;
    border-radius: 5px;
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