import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import auth from "../../service/AdminService";
import { LockIcon, EmailIcon } from '../common/icons'
import Loader from "../common/loader"

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const loading = <WrapLoader><Loader/></WrapLoader>

  const signin = async(e) => {
    e.preventDefault();
    let user = {
      email,
      password,
    };
    setLoading(true)
    await auth
      .login(user)
      .then((data) => {
        setIsError(data.error);
        console.log(data)
        window.location = '/users'
      })
      .catch((err) => {
        console.log(err.response)
        setIsError(err.response.data.error);
        setErrorMsg(err.response.data.msg);
      });
      setLoading(false)
  };

  const renderErrors = errorMsg.map((value, index) => (
    <ErrorMgs key={index}>
      <label>{value}</label>
    </ErrorMgs>
  ));
  return (
    <Wrap>
      <Container>
        <Title>ĐĂNG NHẬP ADMIN!</Title>
        <Form>
          <Field>
            <MailIcon></MailIcon>
            <input
              value={email}
              type="email"
              placeholder="Địa chỉ email..."
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </Field>
          <Field>
            <PasswordIcon></PasswordIcon>
            <input
              value={password}
              type="password"
              placeholder="Mật khẩu..."
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </Field>
          <SubmitButton onClick={signin}>Đăng nhập</SubmitButton>
          {isLoading? loading : (isError ? renderErrors : "")}
        </Form>
      </Container>
    </Wrap>
  );
}
const WrapLoader = styled.div`
  display: flex;
  justify-content: center;
`
const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 435px);
`;
const ErrorMgs = styled.div`
  color: red;
  margin-top: 2rem;
`
const Container = styled.div`
  width: 500px;
  min-height: 50vh;
  padding: 50px 50px;
  margin: 70px 0;
  display: flex;
  align-items: center;
  flex-flow: column wrap;
  background-color: #f9f9f9;
  gap: 40px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1rem;
  display: flex;
  justify-content: center;

`;

const Form = styled.div`
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
    width: 85%;
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

const MailIcon = styled(EmailIcon)`
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
  span {
    font-weight: bold;
    color: #4caf50;
    cursor: pointer;
  }
  span:hover {
    color: #04aa6d;
  }
`;

export default LoginForm;
