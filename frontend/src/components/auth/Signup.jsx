import React, { useState } from "react";
import styled from "styled-components";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function SignUpForm() {
  return (
    <Wrap>
      <Container>
        <Title>Gia nhập với chúng tôi!</Title>
        <Form>
          <Field>
            <MailIcon className="Icon"></MailIcon>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Địa chỉ Email..."
            ></input>
          </Field>

          <Field>
            <UserIcon className="Icon"></UserIcon>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Họ..."
            ></input>
          </Field>

          <Field>
            <UserIcon className="Icon"></UserIcon>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Tên..."
            ></input>
          </Field>

          <Field>
            <PhoneIcon className="Icon"></PhoneIcon>
            <input
              type="number"
              id="phonenumber"
              name="phonenumber"
              placeholder="Số điện thoại..."
            ></input>
          </Field>

          <Field>
            <CityIcon className="Icon"></CityIcon>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Thành phố"
            ></input>
          </Field>

          <Field>
            <AddressIcon className="Icon"></AddressIcon>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Địa chỉ"
            ></input>
          </Field>

          <Field>
            <PasswordIcon className="Icon"></PasswordIcon>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mật khẩu..."
            ></input>
          </Field>

          <SubmitButton type="submit">Đăng kí tài khoản</SubmitButton>

          <RedirectLogIn>
            Đã có tài khoản? <a href="./login">Đăng nhập</a>
          </RedirectLogIn>
        </Form>
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
  a {
    font-weight: bold;
    color: #4caf50;
    text-decoration: underline;
  }
  a:hover {
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
