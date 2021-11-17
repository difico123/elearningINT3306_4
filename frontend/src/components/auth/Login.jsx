import React, { useState } from "react";
import styled from "styled-components";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
function LoginForm() {
  return (
    <Wrap>
      <Container>
        <Title>Tham gia vào những khóa học dành riêng cho bạn!</Title>

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

          <SubmitButton type="submit">Đăng nhập</SubmitButton>
          <RedirectForgotPassword>
            <a href="./recover">Quên mật khẩu?</a>
          </RedirectForgotPassword>
          <RedirectSignUp>
            Không có tài khoản? Tạo mới <a href="./signup">ở đây</a>
          </RedirectSignUp>
        </Form>
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 435px);
`;

const Container = styled.div`
  width: 500px;
  padding: 50px 50px;
  margin: 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column wrap;
  background-color: #f9f9f9;
  gap: 40px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 15px;
  display: flex;
  align-self: flex-start;
  justify-content: space-between;
`;

const Form = styled.form`
  border-top: 1px solid #878787;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: flex-start;
  textarea:focus,
  input:focus {
    outline: none;
  }
`;

const Field = styled.div`
  border: 0.5px solid black;
  margin-bottom: 10px;
  gap: 5px;
  min-width: 350px;
  height: 40px;
  display: flex;

  input {
    border: none;
    width: 75%;
    autocomplete: off;
    background-image: none;
    font-size: 15px;
    font-weight: lighter;
    background-color: #f9f9f9;
    textarea:focus,
    input:focus {
      outline: none;
    }
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
  height: 40px;
  font-weight: bold;
  color: white;
  transition: 0.3s ease 0s;
  &:hover {
    border: transparent;
    color: white;
    background-color: #04aa6d;
  }
`;

const RedirectForgotPassword = styled.div`
  text-align: center;
  padding: 15px 0;
  color: #4caf50;
  transition: 0.3s ease 0.3s;
  font-weight: bold;
  a:hover {
    color: #04aa6d;
  }
`;

const RedirectSignUp = styled.div`
  text-align: center;
  padding: 15px 0;
  font-size: 16px;
  color: #4caf50;
  a {
    font-weight: bold;
    color: #4caf50;
    text-decoration: underline;
  }
  a:hover {
    color: #04aa6d;
  }
`;

export default LoginForm;
