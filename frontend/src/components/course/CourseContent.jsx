import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import CourseService from "../../service/courseService";
import Loader from "../common/loader";
import quizService from "../../service/quizService";

function CourseContent() {
  let { id } = useParams();
  const [isLoading, setLoading] = useState(true);

  const [quizId, setQuizId] = useState(-1);

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

  const [quizzes, setQuizzes] = useState([
    {
      id: "",
      title: "",
      shown: "",
    },
  ]);

  const [topicId, setTopicId] = useState(null);

  // console.log(topicId, id);
  useEffect(() => {
    quizService
      .getQuizTitles(id, topicId)
      .then((response) => {
        setQuizzes(response.quizes);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  }, [topicId]);

  console.log("abc", quizzes);
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
      key={index}
      onClick={() => {
        setTopicId(topic.id);
      }}
    >
      Chủ đề {index + 1}: {topic.title}
    </Title>
  ));
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

  const DisplayQuizzes = (
    <QuizSection>
      <QuizWrap>
        <QuizTitle>Tên của quiz</QuizTitle>
        <QuestionSection>
          <QuestionName>Tên câu hỏi</QuestionName>
          <Answers>
            <Answer>
              <Inputs>
                <input type="checkbox" name="isAnswer"></input>
                <label> Văn anh</label>
              </Inputs>
            </Answer>
            <Answer>
              <Inputs>
                <input type="checkbox" name="isAnswer"></input>
                <label> Văn anh</label>
              </Inputs>
            </Answer>
            <Answer>
              <Inputs>
                <input type="checkbox" name="isAnswer"></input>
                <label> Văn anh</label>
              </Inputs>
            </Answer>
            <Answer>
              <Inputs>
                <input type="checkbox" name="isAnswer"></input>
                <label> Văn anh</label>
              </Inputs>
            </Answer>
          </Answers>
        </QuestionSection>
      </QuizWrap>
      <QuestionWrap>
        <QuestionTitle>Bảng câu hỏi</QuestionTitle>
        <SelectQuestion>
          <ChooseQuestion>1</ChooseQuestion>
          <ChooseQuestion>2</ChooseQuestion>
          <ChooseQuestion>3</ChooseQuestion>
          <ChooseQuestion>4</ChooseQuestion>
          <ChooseQuestion>5</ChooseQuestion>
          <ChooseQuestion>6</ChooseQuestion>
        </SelectQuestion>
        <SubmitQuiz>Nộp bài</SubmitQuiz>
      </QuestionWrap>
    </QuizSection>
  );

  const Loaded = <TopicContent courseId={id} topicId={topicId} />;

  return (
    <Container>
      <TopicWrap>{renderTopics}</TopicWrap>
      <Content>
        {isLoading ? Loading : Loaded}
        <Buttons>
          {!quizzes[0] ? "Không có quiz cho chủ đề này" : renderQuizzes}
        </Buttons>
        {DisplayQuizzes}
      </Content>
    </Container>
  );
}

function TopicContent({ topicId, courseId }) {
  const [topic, setTopic] = useState({
    content: "",
    courseId: "",
    createdAt: "",
    description: "",
    id: "",
    title: "",
  });
  const [isLoading, setLoading] = useState(true);

  const Loading = (
    <LoaderWrap>
      <Loader />
    </LoaderWrap>
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      await CourseService.getTopicDetails(courseId, topicId)
        .then((res) => {
          console.log(res);
          setTopic({ ...res.topic });
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
    <Topic>
      {" "}
      <div>
        <WrapDescription>Mô tả ngắn gọn: </WrapDescription> {topic.description}
      </div>
      <WrapDescription>Nội dung: </WrapDescription>{" "}
      <div dangerouslySetInnerHTML={{ __html: topic.content }} />
    </Topic>
  );
  return <>{isLoading ? Loading : Loaded}</>;
}

const NoContent = styled.div`
  margin: 2rem 0;
  text-align: center;
`;
const WrapDescription = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  text-decoration: underline;
  margin-right: 1rem;
`;
const LoaderWrap = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Container = styled.div`
  min-height: 90vh;
  display: flex;
  flex-flow: row nowrap;
  background-color: #f0f0f0;
`;

const TopicWrap = styled.div`
  display: flex;
  width: 20%;
  flex-flow: column nowrap;
  position: sticky;
  background-color: #d0d0d0;
  right: 0px;
`;

const Title = styled.div`
  padding: 1.5rem 0.75vw;
  font-weight: 500;
  word-wrap: break-word;
  font-size: 1.15rem;
  cursor: pointer;
  background: linear-gradient(to left, #d0d0d0 50%, #f0f0f0 50%) right;
  background-size: 200%;
  transition: 0.471s ease-out;
  &:hover {
    background-color: #f0f0f0;
    color: black;
    background-position: left;
  }
  &.active {
    background-color: #f0f0f0;
    background-position: 0 0;
    color: #fff;
  }
`;

const Topic = styled.div`
  padding: 2rem;
`;

const Content = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  background-color: #f0f0f0;
  display: flex;
  flex-flow: column nowrap;
  gap: 4vh;
`;

const ShowQuizButton = styled.button`
  border: 0.5px solid black;
  margin: 0 auto;
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
`;

const QuizWrap = styled.div`
  background-color: #f0f0f0;
  width: 70%;
  padding: 2rem;
`;
const QuizSection = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  border-top: 5px solid green;
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
  gap: 10px;
  width: 100%;
  padding: 0 2vw;
  justify-content: space-around;
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
  justify-content: space-around;
`;

export default CourseContent;