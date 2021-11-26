import { Button } from "@mui/material";
import React, { useState,useEffect } from "react";
import styled from "styled-components";

import PersonIcon from '@mui/icons-material/Person';

import UserService from "../../service/userService";

function EditProfile({user}) {

  const [message, setMessage] = useState([]);
  var [successMsg, setSuccessMsg] = useState("");
  var [isError, setIsError] = useState(false);

  const [ userProfile, setUserProfile] = useState({
    lastName: "",
    firstName: "",
    phoneNumber: "",
    city: "",
    address: "",
  });

  let  { firstName, lastName, phoneNumber, city, address } = userProfile

  React.useEffect(() => {
      setUserProfile({...user})
  }, [user]);

  const onChange = (e) => {
    setUserProfile({...userProfile,[e.target.name]:e.target.value})
  }

  const editInfo = (e) => {
    e.preventDefault();
    UserService.editUser({firstName, lastName, phoneNumber, city, address})
    .then((response) => {
      setSuccessMsg(response.msg);
      window.location.href ='./profile'
    })
    .catch((error) => {
      setIsError(error.response.data.error);
      setMessage(error.response.data.msg);
    });
  };

  const errors = message.map((err,index) => (
    <div key={index}>
      <label className="text-red-500">{err}</label>
    </div>
  ));

  const success = <div className="text-green-400">{successMsg}</div>;

    return (

        <Wrap>
          <Container>
            <Title>Chỉnh sửa thông tin cá nhân</Title>
            <Form>
              <FullName>
                <Name>
                    <span>Họ của bạn</span>
                    <input
                    value={firstName}
                    type="text"
                    name="firstName"
                    placeholder="Enter your name"
                    onChange={onChange}
                    />
                </Name>
                <Name>
                    <span>Tên của bạn</span>
                    <input
                    value={lastName}
                    type="text"
                    name="lastName"
                    placeholder="Enter your name"
                    onChange={onChange}
                    ></input>
                </Name>
              </FullName>
              <Image>
                  <label for="avatar">Ảnh đại diện</label>
                  <ProfileIcon></ProfileIcon>
                  <input 
                    type="file"
                    name="avatar"
                    accept="image/png, image/jpeg"
                  ></input>
              </Image>
              <UserDetails>
                <InputBox>
                  <Span>Số điện thoại</Span>
                  <input
                  value={phoneNumber}
                  type="text"
                  name="phoneNumber"
                  placeholder="Enter your name"
                  onChange={onChange}
                  ></input>
                </InputBox>
                <InputBox>
                  <Span>Địa chỉ</Span>
                  <input
                  value={address}
                  type="text"
                  name="address"
                  placeholder="Enter your name"
                  onChange={onChange}
                  ></input>
                </InputBox>
                <InputBox>
                  <Span>Thành phố</Span>
                  <input
                  value={city}
                  type="text"
                  name="city"
                  placeholder="Enter your name"
                  onChange={onChange}
                  ></input>
                </InputBox>
                {isError ? errors : success}
                <Confirm>
                <input
                  type="Submit"
                  value="Confirm"
                  onClick={editInfo}
                  ></input>
                </Confirm>
              </UserDetails>
            </Form>
          </Container>
        </Wrap>
    );
}

const Wrap = styled.div`
  min-height: calc(100vh - 435px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;
const Container = styled.div`
  max-width: 60%;
  border: 1px solid black;
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
`;
const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
`;
const Form = styled.form``;
const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InputBox = styled.div`
  margin: 20px 0 12px 0;
  input {
   height: 45px;
   width: 100%;
   outline: none;
   border-radius: 5px;
   border: 1px solid #ccc;
   padding-left: 15px;
   font-size: 16px;
  }
`;

const Span = styled.div`
  display: block;
  font-weight: 500;
  margin-bottom: 5px;
`;

const Confirm = styled.button`
  height: 45px;
  margin: 45px 0;
  input {
   height: 100%;
   width: 100%;
   outline: none;
   color: #fff;
   border:none;
   font-size: 18px;
   font-weight: 500;
   border-radius: 5px;
   letter-spacing: 1px;
   background: linear-gradient(135deg, #71b7e6, #9b59b6)
  }
`;

const FullName = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Name = styled.div`
  span {
    float: left;
  }
  input {
   height: 45px;
   width: 100%;
   outline: none;
   border-radius: 5px;
   border: 1px solid #ccc;
   padding-left: 15px;
   font-size: 16px;
  }
`;

const Image = styled.div`
  margin: 20px 0 12px 0;
  label {
    display: block;
    font: 1rem 'Fira Sans', sans-serif;
  }

  input,
  label {
    margin: .4rem 0;
  }

  input {
    margin-left: 40px;
  }
`;
const ProfileIcon = styled(PersonIcon)`
  height: 100%;
  width: 100%;
  border: 1px solid skyblue;
  margin: 50px 40px 30px;
  color: white;
  background: skyblue;
  transform: scale(4);
`;

export default EditProfile;
