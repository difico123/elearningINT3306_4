import { Button } from "@mui/material";
import React, { useState,useEffect } from "react";
import styled from "styled-components";

import PersonIcon from '@mui/icons-material/Person';

import UserService from "../../service/userService";

function ProfileForm({user}) {

  const [ userProfile, setUserProfile] = useState({
    lastName: "",
    firstName: "",
    email:"",
    phoneNumber: "",
    city: "",
    address: "",
    role: "",
    imageUrl: "",
  });

  let  { firstName, lastName, email, phoneNumber, city, address, role } = userProfile

  React.useEffect(() => {
      setUserProfile({...user})
  }, [user]);

  let userRole;
  if({role}.role == 0) {
    userRole = <div><label>Vai trò:</label> Học sinh</div>
  }
  if({role}.role == 1) {
    userRole = <div><label>Vai trò:</label> Giảng viên</div>
  }
  if({role}.role == 2) {
    userRole = <div><label>Vai trò:</label> Quản trị viên</div>
  }
  
    return (
      <>
        <Wrap>
          <Container>
            <Image>
              <Title>Thông tin cá nhân</Title>
                  {userProfile.imageUrl? <img className="" src={`${userProfile.imageUrl}`} alt="" />:<ProfileIcon></ProfileIcon> }
            </Image>
            <Form>
              <UserDetails>
                <div>
                   <div><label>Họ và tên:</label> {firstName} {lastName}</div>
                </div>
                <div>
                    <div><label>Email:</label> {email}</div>
                </div>
                <div>
                    <div><label>Số điện thoại:</label> {phoneNumber}</div>
                </div>
                <div>
                    {userRole}
                </div>
                <div>
                    <div><label>Nơi ở:</label> {address}</div>
                </div>
                <div>
                    <div><label>Thành phố:</label> {city}</div>
                </div>
              </UserDetails>
            </Form>
          </Container>
        </Wrap>
      </>
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
  width: 100%;
  background-color: #fff;
  padding: 25px 30px;
  border-radius: 5px;
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  div {
    margin: 0.5rem 0;
    a
  }
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
  div {
    width: 600px;
  }
  div label {
    float: left;
    width: 120px;
;
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
  z-index: 0;
`;

const Image = styled.div`
  margin: 0 auto;
  img {
    width: 100%;
    border-radius: 100%;
  }
`;

export default ProfileForm;