import { useState } from "react";
import styled from "styled-components";
import AuthService from "../../service/authService";
import {Link} from 'react-router-dom'
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
        <WrapContainer>
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
              Không có tài khoản? Tạo mới 
              <Link to="/auth/signup"> Đăng Ký</Link>
            </Redirect>
            <Redirect>
              Đã có tài khoản? 
              <Link to="/auth/login"> Đăng nhập</Link>
            </Redirect>
          </Form>
        </Container>
      </WrapContainer>
    </Wrap>
  );
}

export default ForgotPassword;

const Wrap = styled.div`
  min-height: calc(100vh - 94px);
  padding: 5vh 35vw;
  background-image: url("https://scontent.fhan5-10.fna.fbcdn.net/v/t1.15752-9/263406913_1269721300171380_2651181040426319644_n.png?_nc_cat=101&ccb=1-5&_nc_sid=ae9488&_nc_ohc=LAxFfuZjmogAX_0-U6C&_nc_ht=scontent.fhan5-10.fna&oh=03_AVLMZ0OkMryY6gA6LdG8ajpih8DuclSzSoUXx8xuu6-RVA&oe=61E469D3");
  background-repeat: no-repeat;
  background-size:100vw 90vh ;
`;

const Container = styled.div`
  width: 100%;
  padding: 5vh 3vw;
  display: flex;
  width: 30rem;
  align-items: center;
  flex-flow: column wrap;
  gap: 2.5vh;
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
    rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  border-radius: 18px;
  background-color:white;
`;

const WrapContainer = styled.div`
  height:100%;
  margin: 1rem 0 0 -10rem;
`

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

