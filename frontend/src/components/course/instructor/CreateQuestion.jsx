import React, { useRef, useState } from "react";
import styled from "styled-components";
import dummy from "../../../dummydata/dummy.json";

function CreateQuestion() {
  const index = useRef(1);
  const [textBox, setTextBox] = useState([{}]);
  const chooseTopic = dummy.map((v, index) => (
    <option value={v.id} key={index}>
      {v.title}
    </option>
  ));

  const selectCategory = (
    <Dropdown onChange={(e) => {}}>
      <option disabled selected={true} defaultValue="">
        Chọn topic
      </option>
      {chooseTopic}
    </Dropdown>
  );

  const handleAddAnswer = (e) => {
    e.preventDefault();
    setTextBox([...textBox, {}]);
  };

  const quiz = textBox.map((v, index) => {
    return index > 5 ? (
      ""
    ) : (
      <QuizWrap>
        <FormTitle>
          <span>Câu trả lời {index + 1}</span>
        </FormTitle>
        <input type="text" name="name"></input>
      </QuizWrap>
    );
  });

  return (
    <Container>
      <Title>Tạo quiz mới</Title>
      <CreateQuestionForm>
        <CategoryWrap>
          <FormTitle>Lựa chọn topic</FormTitle>
          {selectCategory}
        </CategoryWrap>
        <QuizWrap>
          <FormTitle>Tên câu hỏi</FormTitle>
          <textarea name="name"></textarea>
        </QuizWrap>
        {quiz}
        <AddAnswerButton onClick={handleAddAnswer}>
          <span>+</span>
        </AddAnswerButton>
        <Confirm type="submit" value="Thêm câu hỏi"></Confirm>
      </CreateQuestionForm>
    </Container>
  );
}

export default CreateQuestion;

const Container = styled.div`
  padding: 5vh 5vw;
  position: relative;
  width: 85vw;
  overflow: auto;
  height: 90vh;
`;

const Title = styled.div`
  font-size: 1.75rem;
  font-weight: bold;
`;

const CreateQuestionForm = styled.form`
  margin: 2rem auto;
  padding: 2rem 0 5rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  width: 70vw;
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.2);
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 0 3vw;
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
  width: 25%;
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
  margin: 0 5vw -3vh 0;
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
  padding: 0.2rem 3vw;
  input,
  textarea {
    padding: 0.35rem 0.1rem 0.35rem 1rem;
    height: 45px;
    width: 75%;
    autocomplete: off;
    background-image: none;
    font-size: 18px;
    font-weight: lighter;
    background-color: #f9f9f9;
    outline: none;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  textarea {
    height: 6rem;
  }
  display: flex;
  flex-flow: row nowrap;
`;

const AddAnswerButton = styled.button`
  margin: 0 auto;
  background-color: grey;
  height: 45px;
  width: 10%;
  font-weight: bold;
  color: white;
  transition: 0.3s ease 0s;
  cursor: pointer;
  &:hover {
    border: transparent;
    color: black;
    background-color: lightgrey;
  }
`;