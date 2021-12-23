import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import auth from "../../service/authService";
import AuthApi from "../../service/authUser";
import { LockIcon, EmailIcon } from "../common/icons";

function LoginForm() {
  let Auth = React.useContext(AuthApi);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState([]);
  const [isError, setIsError] = useState("");

  const signin = (e) => {
    e.preventDefault();
    let user = {
      email,
      password,
    };
    auth
      .login(user)
      .then((data) => {
        setIsError(data.error);
        window.location = "/";
      })
      .catch((err) => {
        setIsError(err.response.data.error);
        setErrorMsg(err.response.data.msg);
      });
  };

  const renderErrors = errorMsg.length>0&&errorMsg.map((value, index) => (
    <div key={index}>
      <label className="text-red-300">{value}</label>
    </div>
  ));
  return (
    <Wrap>
      <WrapContainer>
      <Container>
      <Title>Gia nhập với chúng tôi!</Title>
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
          {isError ? renderErrors : ""}
          <SubmitButton onClick={signin}>Đăng nhập</SubmitButton>
        </Form>
        {/* <RedirectForgotPassword>
          <Link to="/auth/recover">Quên mật khẩu?</Link>
        </RedirectForgotPassword> */}
        <RedirectSignUp>
          Không có tài khoản? Tạo mới{" "}
          <Link to="/auth/signup">
            <span>ở đây</span>
          </Link>
        </RedirectSignUp>
      </Container>

      </WrapContainer>
    </Wrap>
  );
}

const Wrap = styled.div`
  min-height: calc(100vh - 94px);
  padding: 5vh 25vw;

  background-image: url("https://scontent.fhan5-10.fna.fbcdn.net/v/t1.15752-9/263406913_1269721300171380_2651181040426319644_n.png?_nc_cat=101&ccb=1-5&_nc_sid=ae9488&_nc_ohc=LAxFfuZjmogAX_0-U6C&_nc_ht=scontent.fhan5-10.fna&oh=03_AVLMZ0OkMryY6gA6LdG8ajpih8DuclSzSoUXx8xuu6-RVA&oe=61E469D3");
  background-repeat: no-repeat;
  background-size:100vw 90vh ;
`;

const WrapContainer = styled.div`
  height:100%;
  margin: 1rem 0 0 -10rem;
`
const Container = styled.div`
  width: 100%;
  padding: 5vh 3vw;
  width: 30rem;
  display: flex;
  align-items: center;
  flex-flow: column wrap;
  gap: 2.5vh;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  border-radius: 18px;
  background-color:white;
  
`;

const Title = styled.div`
  font-weight: bold;
  width: 100%;
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  align-self: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #878787;
  padding-bottom: 4vh;
`;


const Form = styled.div`
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
    width: 100%;
    autocomplete: off;
    background-image: none;
    font-size: 15px;
    font-weight: lighter;
    background-color: transparent;
    textarea:focus,
    input:focus {
      outline: none;
    }
  }
  input::-webkit-input-placeholder {
    color: black;
    font-weight: 300;
  }
`;

const MailIcon = styled(EmailIcon)`
  margin: auto 6px;
`;

const PasswordIcon = styled(LockIcon)`
  margin: auto 6px;
`;

const SubmitButton = styled.button`
background-color: rgb(126,165,190);
  height: 40px;
  font-weight: bold;
  color: white;
  transition: 0.3s ease 0s;
  &:hover {
    border: transparent;
    color: white;
    background-color: rgba(126,165,190,0.9);
  }
`;

const RedirectForgotPassword = styled.div`
  text-align: center;
  padding: 15px 0;
  color: rgb(126,165,190);
  transition: 0.3s ease 0.3s;
  font-weight: bold;
  a:hover {
    color: rgba(126,165,190,0.9);
  }
`;

const RedirectSignUp = styled.div`
  text-align: center;
  padding: 15px 0;
  font-size: 16px;
  color: rgb(126,165,190);
  span {
    font-weight: bold;
    color: rgb(126,165,190);
    cursor: pointer;
  }
  span:hover {
    color:rgba(126,165,190,0.9);
  }
`;

export default LoginForm;