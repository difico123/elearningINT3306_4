import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthService from "../../service/authService";
import {
  LockIcon,
  PersonIcon,
  EmailIcon,
  LocationCityIcon,
  HomeIcon,
  LocalPhoneIcon,
} from "../common/icons";

function SignUpForm() {
  const [userReg, setUserReg] = useState({
    email: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
    city: "",
    address: "",
    password: "",
  });

  const { email, lastName, firstName, phoneNumber, city, address, password } =
    userReg;

  const [message, setMessage] = useState([]);
  var [successMsg, setSuccessMsg] = useState("");
  var [isError, setIsError] = useState(false);

  const onChange = (e) =>
    setUserReg({ ...userReg, [e.target.name]: e.target.value });

  const register = () => {
    AuthService.register(userReg)
      .then((response) => {
        setSuccessMsg(response.msg[0]);
        setIsError(response.error);
        console.log(response);
      })
      .catch((error) => {
        setIsError(error.response.data.error);
        setMessage(error.response.data.msg);
      });
  };

  const errors = message.map((abc) => (
    <div>
      <label className="text-red-300">{abc}</label>
    </div>
  ));
  const success = <div className="text-green-400">{successMsg}</div>;

  return (
    <Wrap>
      <Container>
        <Title>Gia nhập với chúng tôi!</Title>

        <Form>
          <Field>
            <MailIcon className="Icon"></MailIcon>
            <input
              value={email}
              type="email"
              placeholder="Địa chỉ Email..."
              name="email"
              onChange={onChange}
            ></input>
            <div></div>
          </Field>

          <Field>
            <UserIcon className="Icon"></UserIcon>
            <input
              value={lastName}
              type="text"
              placeholder="Họ..."
              name="lastName"
              onChange={onChange}
            ></input>
          </Field>

          <Field>
            <UserIcon className="Icon"></UserIcon>
            <input
              value={firstName}
              type="text"
              placeholder="Tên..."
              name="firstName"
              onChange={onChange}
            ></input>
          </Field>

          <Field>
            <PhoneIcon className="Icon"></PhoneIcon>
            <input
              value={phoneNumber}
              type="number"
              placeholder="Số điện thoại..."
              name="phoneNumber"
              onChange={onChange}
            ></input>
          </Field>

          <Field>
            <CityIcon className="Icon"></CityIcon>
            <input
              value={city}
              type="text"
              placeholder="Thành phố"
              name="city"
              onChange={onChange}
            ></input>
          </Field>

          <Field>
            <AddressIcon className="Icon"></AddressIcon>
            <input
              value={address}
              type="text"
              placeholder="Địa chỉ"
              name="address"
              onChange={onChange}
            ></input>
          </Field>

          <Field>
            <PasswordIcon className="Icon"></PasswordIcon>
            <input
              value={password}
              type="password"
              placeholder="Mật khẩu..."
              name="password"
              onChange={onChange}
            ></input>
          </Field>
          {isError ? errors : success}
          <SubmitButton onClick={register}>Đăng kí tài khoản</SubmitButton>
        </Form>
        <RedirectLogIn>
          Đã có tài khoản?
          <Link to="/auth/login">
            <span> Đăng nhập</span>
          </Link>
        </RedirectLogIn>
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .Icon {
    margin: 7px 5px 7px;
  }
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

const RedirectLogIn = styled.div`
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

const UserIcon = styled(PersonIcon)``;
const PasswordIcon = styled(LockIcon)``;
const MailIcon = styled(EmailIcon)``;
const CityIcon = styled(LocationCityIcon)``;
const AddressIcon = styled(HomeIcon)``;
const PhoneIcon = styled(LocalPhoneIcon)``;

export default SignUpForm;
