import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import CourseService from "../../service/courseService";
import Loader from "../common/loader";
import quizService from "../../service/quizService";
import Rating from "./Rating";
import Toast from "../common/toast";
import showToast from "../../dummydata/toast";

import {
  GroupsIcon,
  StarIcon,
  BooksIcon,
  ClearIcon,
  CheckIcon,
  EventAvailableIcon,
} from "../common/icons";

function CourseContent({ user }) {
  let { id } = useParams();
  const [isLoading, setLoading] = useState(true);

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
      content: "",
      imageUrl: "",
    },
  ]);

  const [topicId, setTopicId] = useState(null);

  // console.log(topicId, id);

  useEffect(() => {
    (async () => {
      await CourseService.getEnrollTopics(id).then((res) => {
        setCourse({ ...res.course });
        setTopics([...res.topics]);
        setTopicId(res.topics[0] ? res.topics[0].id : "");
        setLoading(false);
      });
    })();
  }, []);

  const Loading = (
    <LoaderWrap>
      <Loader />
    </LoaderWrap>
  );

  const renderTopics = topics.map((topic, index) => (
    <Title
      className={topicId === topic.id ? "active" : ""}
      key={index}
      onClick={() => {
        setTopicId(topic.id);
      }}
    >
      Chủ đề {index + 1}: {topic.title}
    </Title>
  ));

  const Loaded = (
    <TopicContent
      courseId={id}
      topicId={topicId}
      course={course}
      role={user.role}
    />
  );

  return (
    <Container>
      <TopicWrap>{renderTopics}</TopicWrap>
      <Content>{isLoading ? Loading : Loaded}</Content>
    </Container>
  );
}

function TopicContent({ topicId, courseId, course, role }) {
  const [quizId, setQuizId] = useState(-1);
  const [topic, setTopic] = useState({
    content: "",
    courseId: "",
    createdAt: "",
    description: "",
    id: "",
    title: "",
  });
  const [isLoading, setLoading] = useState(true);
  const [quizzes, setQuizzes] = useState([
    {
      id: "",
      title: "",
      shown: "",
    },
  ]);
  const Loading = (
    <LoaderWrap>
      <Loader />
    </LoaderWrap>
  );

  const renderQuizzes = quizzes.map((quiz, index) => (
    <ShowQuizButton
      className={quiz.id === quizId ? "active" : ""}
      onClick={() => {
        setQuizId(quiz.id);
      }}
      key={index}
    >
      {!quiz.avail && <EventAvailableIcon />}
      Quiz {index + 1}
    </ShowQuizButton>
  ));

  const quizLoaded = (
    <QuizWrapper>
      <Buttons>{renderQuizzes}</Buttons>
      {quizId !== -1 && (
        <DisplayQuizzes topicId={topicId} quizId={quizId} role={role} />
      )}
    </QuizWrapper>
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      await CourseService.getTopicDetails(courseId, topicId)
        .then((res) => {
          console.log(res, "tiopic");
          setTopic({ ...res.topic });
          setQuizzes(res.quizIds);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
      setQuizId(-1);
    })();
  }, [topicId]);

  const Loaded = !topic.id ? (
    <NoContent>Không có nội dung</NoContent>
  ) : (
    <>
      <CourseInfos>
        <InfoWrap>
          <CourseTitle>{course.name}</CourseTitle>
          <CourseDescription>{course.description}</CourseDescription>
          <ARWrap>
            <CourseAttendance>
              <span>Số học viên: </span> {course.register} <GroupsIcon />
            </CourseAttendance>
            <CourseRating>
              <span>Đánh giá: </span>
              <Rating rating={course.rating} role={role} />
            </CourseRating>
            <CourseAttendance>
              <span>Chủ đề: {course.numTopic ? course.numTopic : "0"} </span>
              <BooksIcon />
            </CourseAttendance>
          </ARWrap>
        </InfoWrap>
        <CourseCover>
          <BackgroundImage
            src={
              course.imageUrl
                ? course.imageUrl
                : "https://www.optionabroad.com/wp-content/uploads/2021/03/Study-in-USA.jpg"
            }
          ></BackgroundImage>
        </CourseCover>
      </CourseInfos>
      <Topic>
        <div>
          <WrapDescription>{topic.description}</WrapDescription>
        </div>
        <div dangerouslySetInnerHTML={{ __html: topic.content }} />
      </Topic>{" "}
      {!quizzes[0] ? "" : quizLoaded}
      {/* {DisplayQuizzes} */}
    </>
  );
  return <>{isLoading ? Loading : Loaded}</>;
}

function DisplayQuizzes({ topicId, quizId, role }) {
  let { id } = useParams();
  const [qzTitle, setQzTitle] = useState("");
  const [questionIds, setQuestionIds] = useState([]);
  const [questionId, setQuestionId] = useState(-1);
  useEffect(() => {
    quizService.getQuestionIds(id, topicId, quizId).then((response) => {
      setQzTitle(response.quiz.title);
      setQuestionIds(response.questionIds);
      setQuestionId(!response.questionIds[0] ? -1 : response.questionIds[0].id);
    });
  }, [topicId, quizId]);

  const questions =
    questionIds.length === 0
      ? ""
      : questionIds.map((question, index) => (
          <ChooseQuestion
            className={question.id === questionId ? "active" : ""}
            key={index}
            value={question}
            onClick={() => setQuestionId(question.id)}
          >
            {!question.avail && <EventAvailableIcon />}
            {index + 1}
          </ChooseQuestion>
        ));

  return (
    <QuizSection>
      <QuizWrap>
        <QuizTitle>{qzTitle}</QuizTitle>
        <DisplayAnswers
          topicId={topicId}
          quizId={quizId}
          questionId={questionId}
          role={role}
        />
      </QuizWrap>
      <QuestionWrap>
        <QuestionTitle>Bảng câu hỏi</QuestionTitle>
        <QuestionWap>
          <SelectQuestion>{questions}</SelectQuestion>
        </QuestionWap>
      </QuestionWrap>
    </QuizSection>
  );
}

function DisplayAnswers({ topicId, quizId, questionId, role }) {
  let { id } = useParams();
  const [qTitle, setQTitle] = useState("");
  const [marks, setMarks] = useState(5);
  const [choiceIds, setChoiceIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toastList, setToastList] = useState([]);
  const [answerMsg, setAnswerMsg] = useState("");
  const [history, setHistory] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [result, setResult] = useState(-1);
  const Loading = (
    <LoaderWrap>
      <Loader />
    </LoaderWrap>
  );
  useEffect(() => {
    (async () => {
      setResult(-1);
      setIsLoading(true);
      if (quizId !== -1) {
        await quizService
          .getQuestionAnswers(id, topicId, quizId, questionId)
          .then((response) => {
            setQTitle(response.content);
            setMarks(response.marks);
            setChoiceIds(response.question);
          });
      }
      if (role === 0) {
        await quizService.getHistory(id, questionId).then((res) => {
          setHistory(res.history);
          setCorrectAnswer(res.correctAnswer);
        });
      }
      setIsLoading(false);
    })();
  }, [topicId, quizId, questionId]);

  const handleSubmitAnswer = () => {
    if (role === 0) {
      quizService
        .submitAnswer(id, topicId, quizId, questionId, choiceId)
        .then((response) => {
          setResult(response.isCorrect);
        })
        .catch((error) => {
          alert(error.response.data.msg);
        });
    } else {
      setToastList([
        showToast("danger", "Thông Báo", "Bạn không thể nộp bài này!"),
      ]);
    }
  };

  const [choiceId, setChoiceId] = useState(-1);

  const choices =
    choiceIds.length === 0
      ? ""
      : choiceIds.map((choice, index) => {
          let anphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

          return (
            <Answer
              className={
                choiceId === choice.choiceId
                  ? "active"
                  : "" +
                    (role === 0 &&
                      !history &&
                      result === -1 &&
                      " hover:bg-blue-300 rounded")
              }
              key={index}
              value={choice.choiceId}
              onClick={() => {
                if (role === 0 && !history && result === -1) {
                  setChoiceId(choice.choiceId);
                }
              }}
            >
              <Inputs>
                {/* {result === -1 ? "" : result ? <Correct /> : <Incorrect />} */}
                {history &&
                  history.choiceId === choice.choiceId &&
                  (correctAnswer === history.choiceId ? (
                    <Correct />
                  ) : (
                    <Incorrect />
                  ))}
                {result !== -1 &&
                  choiceId === choice.choiceId &&
                  (result ? <Correct /> : <Incorrect />)}
                {role === 0 && !history && result === -1 && (
                  <input
                    type="checkbox"
                    name="isAnswer"
                    checked={choiceId === choice.choiceId ? true : false}
                  ></input>
                )}
                {anphabet[index]}.<label>{choice.content}</label>
              </Inputs>
            </Answer>
          );
        });

  return (
    <AnswerWrap>
      {questionId === -1 ? (
        <NoContent>Quiz lừa</NoContent>
      ) : isLoading ? (
        Loading
      ) : (
        <>
          <QuestionSection>
            <QuestionName>{qTitle}</QuestionName>
            <QuestionName>Điểm: {marks}</QuestionName>
            <Answers>{choices}</Answers>
          </QuestionSection>
          {role === 0 &&
            !history &&
            (result === -1 ? (
              <SubmitQuiz onClick={handleSubmitAnswer}>Nộp bài</SubmitQuiz>
            ) : result ? (
              <Result>
                <span className="text-green-400">
                  Bạn đã trả lời đúng câu hỏi này
                </span>
                <span>Điểm: {marks}</span>
              </Result>
            ) : (
              <Result>
                <span className="text-red-400">
                  Bạn đã trả lời sai câu hỏi này
                </span>
                <span>Điểm: 0 :(</span>
              </Result>
            ))}
          <Toast toastList={toastList} />
        </>
      )}
    </AnswerWrap>
  );
}

const NoContent = styled.div`
  margin: 2rem 0;
  text-align: center;
`;
const Result = styled.div`
  display: flex;
  font-size: 1.2rem;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const WrapDescription = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  margin-right: 1rem;
`;
const LoaderWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-top: 10vh;
  justify-content: center;
`;

const Container = styled.div`
  min-height: 90vh;
  display: flex;
  flex-flow: row nowrap;
  background-color: #f0f0f0;
  overflow: hidden;
`;

const TopicWrap = styled.div`
  display: flex;
  width: 20%;
  flex-flow: column nowrap;
  position: sticky;
  background-color: #969eaa;
  right: 0px;
`;

const Title = styled.div`
  position: relative;
  padding: 1.5rem 0.75vw;
  font-weight: 500;
  word-wrap: break-word;
  width: 100%;
  font-size: 1.15rem;
  cursor: pointer;
  transition: 0.471s ease-out;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
    rgba(17, 17, 26, 0.1) 0px 0px 8px;
  background-color: #969eaa;
  &:hover {
    background-color: #3a3e47;
    color: white;
    background-position: left;
  }
  &.active {
    background-color: #3a3e47;
    background-position: 0 0;
    color: #fff;
  }
`;

const Topic = styled.div`
  padding: 1vh 2vw;
  div {
    padding-bottom: 2vh;
  }
`;

const Content = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  background-color: #e0e0e0;
  display: flex;
  flex-flow: column nowrap;
  gap: 4vh;
  height: 90vh;
  overflow-x: hidden;
`;

const ShowQuizButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border: 0.5px solid black;
  color: black;
  font-weight: 600;
  padding: 1rem 1rem;
  font-size: 15px;
  width: 120px;
  transition: 0.5s ease 0s;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  &:hover {
    color: white;
    background-color: #04aa6d;
    border: 0.5px solid #04aa6d;
  }
  &.active {
    background-color: #03203c;
    background-position: 0 0;
    color: #fff;
    svg {
      color: white;
    }
  }
  svg {
    color: rgba(5, 150, 105, 0.6);
    transition: 0.5s ease 0s;
    font-size: 2rem;
  }
  &:hover svg {
    color: white;
  }
`;

const QuizSection = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  border-top: 5px solid green;
  overflow-y: hidden;
`;
const QuizWrap = styled.div`
  background-color: #f0f0f0;
  width: 70%;
  padding: 2rem;
`;

const QuizTitle = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  width: 100%;
  background-color: rgba(231, 231, 231, 1);
  padding: 1vh 1vw;
  border-left: 5px solid lightgrey;
`;

const QuestionWrap = styled.div`
  background-color: #e0e0e0;
  display: flex;
  flex-flow: column nowrap;
  gap: 30px;
  width: 30%;
  padding: 2rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;

const QuestionTitle = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 1vh 1vw;
  border-left: 5px solid blue;
  font-size: 1.25rem;
  font-weight: bold;
`;

const QuestionWap = styled.div`
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
  rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
  rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  min-height: 30vh;
`
const SelectQuestion = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-flow: row wrap;
  width: 100%;
  padding: 3vh 2vw;
  margin: 0 auto;
  gap: 20px;
  justify-content: flex-start;
`;

const ChooseQuestion = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    display:flex;
    justify-content: center;
    align-items: center;
  padding: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10%;
  border: 0.5px solid black;
  color: #03203c;
  &:hover {
    background-color: rgba(229, 114, 28, 0.8);
  }
  &.active {
    background-color: #03203c;
    color: white;
  }
`;

const SubmitQuiz = styled.div`
  background-color: #04aa6d;
  margin: 2vh auto;
  color: white;
  font-weight: 600;
  padding: 15px 20px;
  font-size: 15px;
  cursor: pointer;
  text-align: center;
  transition: 0.5s ease 0s;
  &:hover {
    background-color: #04aa6d;
    opacity: 0.78;
  }
  align-self: flex-end;
`;

const QuestionSection = styled.div`
  border: 5px solid grey;
  border-radius: 10px;
  margin-top: 2vh;
`;
const QuestionName = styled.div`
  padding: 1vh 1.5vw;
  font-size: 1.15rem;
  font-weight: 500;
`;

const Answers = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 1.5vh;
  padding: 0 2vw 2vh 2vw;
`;

const Answer = styled.div`
  font-weight: 400;
  font-size: 1.15rem;
  width: 100%;
  cursor: pointer;
  padding: 0.5rem 0.5rem;
  &.active {
    background-color: lightblue;
  }
`;

const Inputs = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  input[type="checkbox"] {
    height: 15px;
    width: 15px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: flex-start;
  gap: 20px;
  margin: 2vw;
`;

const CourseInfos = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  padding: 4vh 2vw;
  background-color: #3a3e47;
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
  inline-size: 35vw;
  overflow-wrap: break-word;
`;

const CourseDescription = styled.div`
  color: white;
  font-size: 1.2rem;
  padding-bottom: 1rem;
  inline-size: 35vw;
  overflow-wrap: break-word;
`;

const ARWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 50px;
  padding-bottom: 20px;
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
  gap: 20px;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 1rem;
  svg {
    color: #f0932b;
  }
`;

const CourseCover = styled.div`
  padding: 0 8vw;
  margin: auto;
`;
const QuizWrapper = styled.div`
  height: 60vh;
`;

const BackgroundImage = styled.img``;

const Correct = styled(CheckIcon)`
  position: absolute;
  left: 2.5vw;
  color: green;
`;

const Incorrect = styled(ClearIcon)`
  position: absolute;
  left: 2.5vw;
  color: red;
`;

const AnswerWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 2vh;
  min-height: 45vh;
`;
export default CourseContent;