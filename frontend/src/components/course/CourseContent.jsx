import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import CourseService from "../../service/courseService";
import Loader from "../common/loader";
import quizService from "../../service/quizService";
import { GroupsIcon, StarIcon, BooksIcon } from "../common/icons";

function CourseContent() {
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
    <TopicContent courseId={id} topicId={topicId} course={course} />
  );

  return (
    <Container>
      <TopicWrap>{renderTopics}</TopicWrap>
      <Content>{isLoading ? Loading : Loaded}</Content>
    </Container>
  );
}

function TopicContent({ topicId, courseId, course }) {
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
  const handleSelectedQuiz = (id) => {
    setQuizId(id);
  };
  console.log(quizId, "abc");
  const renderQuizzes = quizzes.map((quiz, index) => (
    <ShowQuizButton
      onClick={() => {
        handleSelectedQuiz(quiz.id);
      }}
      key={index}
    >
      Làm quiz {index + 1}
    </ShowQuizButton>
  ));

  const quizLoaded = (
    <QuizWrapper>
      <Buttons>{renderQuizzes}</Buttons>
      {quizId !== -1 && <DisplayQuizzes topicId={topicId} quizId={quizId} />}
    </QuizWrapper>
  );

  console.log("abc", quizzes);
  useEffect(() => {
    (async () => {
      setLoading(true);
      await CourseService.getTopicDetails(courseId, topicId)
        .then((res) => {
          console.log(res);
          setTopic({ ...res.topic });
          setQuizzes(res.quizIds);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
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
              <span> Số học viên: {course.register}</span>
              <GroupsIcon />
            </CourseAttendance>
            <CourseRating>
              <span>Đánh giá: {course.rating ? course.rating : "0"} </span>
              <StarIcon />
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

function DisplayQuizzes({ topicId, quizId }) {
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
            key={index}
            value={question}
            onClick={() => setQuestionId(question.id)}
          >
            {index + 1}
          </ChooseQuestion>
        ));
  console.log(questionId, "duc");
  return (
    <QuizSection>
      <QuizWrap>
        <QuizTitle>{qzTitle}</QuizTitle>
        <DisplayAnswers
          topicId={topicId}
          quizId={quizId}
          questionId={questionId}
        />
      </QuizWrap>
      <QuestionWrap>
        <QuestionTitle>Bảng câu hỏi</QuestionTitle>
        <SelectQuestion>{questions}</SelectQuestion>
        <SubmitQuiz>Nộp bài</SubmitQuiz>
      </QuestionWrap>
    </QuizSection>
  );
}

function DisplayAnswers({ topicId, quizId, questionId }) {
  let { id } = useParams();
  const [qTitle, setQTitle] = useState("");
  const [choiceIds, setChoiceIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const Loading = (
    <LoaderWrap>
      <Loader />
    </LoaderWrap>
  );
  useEffect(() => {
    setIsLoading(true);
    quizService
      .getQuestionAnswers(id, topicId, quizId, questionId)
      .then((response) => {
        setQTitle(response.content);
        setChoiceIds(response.question);
        setIsLoading(false);
      });
  }, [topicId, quizId, questionId]);

  console.log(qTitle, "abc", choiceIds);
  const [choiceId, setChoiceId] = useState(-1);

  const choices =
    choiceIds.length === 0
      ? ""
      : choiceIds.map((choice, index) => (
          <Answer key={index} value={choice}>
            <Inputs>
              <input type="checkbox" name="isAnswer"></input>
              <label>{choice.content}</label>
            </Inputs>
          </Answer>
        ));
  return (
    <>
      {questionId === -1 ? (
        <NoContent>Quiz lừa</NoContent>
      ) : isLoading ? (
        Loading
      ) : (
        <QuestionSection>
          <QuestionName>{qTitle}</QuestionName>
          <Answers>{choices}</Answers>
        </QuestionSection>
      )}
    </>
  );
}

const NoContent = styled.div`
  margin: 2rem 0;
  text-align: center;
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
  overflow-y: auto;
  overflow-x: hidden;
`;

const ShowQuizButton = styled.button`
  border: 0.5px solid black;
  color: black;
  font-weight: 600;
  padding: 15px 20px;
  font-size: 15px;
  width: 120px;
  transition: 0.5s ease 0s;
  background-color: transparent;
  &:hover {
    color: white;
    background-color: #04aa6d;
  }
  &.active {
    background-color: red;
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
  background-color: rgba(231, 231, 231, 0.7);
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
  background-color: rgba(231, 231, 231, 0.7);
  padding: 1vh 1vw;
  border-left: 5px solid blue;
  font-size: 1.25rem;
  font-weight: bold;
`;

const SelectQuestion = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  width: 100%;
  padding: 0 2vw;
  margin: 0 auto;
  justify-content: flex-start;
`;

const ChooseQuestion = styled.div`
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  padding: 14px;
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  background-color: rgba(204, 33, 33, 0.8);
  border-radius: 10%;
  &:hover {
    background-color: rgba(229, 114, 28, 0.8);
  }
`;

const SubmitQuiz = styled.div`
  margin: 0 auto;
  background-color: #04aa6d;
  color: white;
  font-weight: 600;
  padding: 15px 20px;
  font-size: 15px;
  cursor: pointer;
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
  &:hover {
    background-color: #d9edf7;
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
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
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
    height: 50vh;
`;

const BackgroundImage = styled.img``;

export default CourseContent;