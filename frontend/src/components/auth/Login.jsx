import React, { useState } from "react";
import styled from "styled-components";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
function LoginForm() {
  return (
    <Wrap>
      <Container>
        <Title>Đăng nhập</Title>
        <Form>
          <Field>
            <UserIcon></UserIcon>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Tên đăng nhập..."
            ></input>
          </Field>
          <Field>
            <PasswordIcon></PasswordIcon>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mật khẩu..."
            ></input>
          </Field>
          <Field>
            <SubmitButton type="submit">Đăng nhập</SubmitButton>
          </Field>
        </Form>
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div`
  min-height: calc(100vh - 435px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: flex-start;
`;

const Field = styled.div`
  border: 0.5px solid black;
  margin: 5px 0;

  min-width: 350px;
  height: 40px;
  display: flex;

  input {
    border: none;
    width: 100%;
    autocomplete: off;
    background-image: none;
    font-size: 15px;
    font-weight: lighter;

    textarea:focus, input:focus{
      outline: none;
  }
  
`;

const UserIcon = styled(PersonIcon)`
  margin: auto 6px;
`;

const PasswordIcon = styled(LockIcon)`
  margin: auto 6px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
`;

export default LoginForm;
