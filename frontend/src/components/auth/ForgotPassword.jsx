import { useState } from "react";
import styled from "styled-components";
import AuthService from "../../service/authService";
import Loader from "../common/loader"
import {EmailIcon} from "../common/icons"

function ForgotPassword() {
  const [emailForgot, setEmailForgot] = useState("");
  const [successMsg, setSuccessMsg] = useState([]);
  var [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);
  const [loading,setLoading] = useState(false);

  const submit = async () => {
    setLoading(true)
   await AuthService.forgotPassword({ email: emailForgot })
      .then((response) => {
        setIsError(false)
        setSuccessMsg(response.message);
      })
      .catch((error) => {
        setIsError(true)
        setErrorMsg(error.response.data.msg);
      });
      setLoading(false)
  };
  const success = <div className="text-green-400">{successMsg}</div>;
  
  const errors = errorMsg.map((err,index) => (
    <div className="flex mb-2" key={index}>
      <label className="text-red-300">{err}</label>
    </div>
  ));

 const renderMsg = isError ? errors : success;
 
 const loader = (
   <div className="flex justify-center text-green-400 h-12">
      <Loader/>
   </div>
 )

 const renderLoaderMsg = loading ? loader : renderMsg;
 const renderButton = loading? '':<SubmitButton className="border-4"onClick={submit}>Lấy lại mật khẩu</SubmitButton>;

  return (
    <Wrap>
      <Container>
        <Title>Khôi phục lại mật khẩu</Title>
        <Form>
          <Field>
            <MailIcon></MailIcon>
            <input
              type="email"
              id="email"
              name="emailForgot"
              placeholder="Địa chỉ Email...."
              onChange={(e) => {
                setEmailForgot(e.target.value);
              }}
            ></input>
          </Field>
          {renderLoaderMsg}
          {renderButton}
          <Redirect>
            Không có tài khoản? Tạo mới <a href="./signup">ở đây</a>
          </Redirect>
          <Redirect>
            Đã có tài khoản? <a href="./login"> Đăng nhập </a>
          </Redirect>
        </Form>
      </Container>
    </Wrap>
  );
}

export default ForgotPassword;

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
  gap: 20px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 15px;
  display: flex;
  align-self: flex-start;
  justify-content: space-between;
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

const MailIcon = styled(EmailIcon)`
  margin: auto 6px;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  height: 40px;
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
const Redirect = styled.div`
  text-align: center;
  padding-top: 15px;
  font-size: 16px;
  color: #4caf50;
  a {
    font-weight: bold;
    color: #4caf50;
    text-decoration: none;
  }
  a:hover {
    color: #04aa6d;
  }
`;

