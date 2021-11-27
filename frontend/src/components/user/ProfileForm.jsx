import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AccountBoxIcon, PersonIcon,EmailIcon,LocalPhoneIcon,LocationCityIcon,HomeIcon } from '../common/icons'

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
    userRole = <div><PersonIcon/> <label>Vai trò:</label> Học sinh</div>
  }else if({role}.role == 1) {
    userRole = <div><PersonIcon/> <label>Vai trò:</label> Giảng viên</div>
  }else{
    userRole = <div><PersonIcon/> <label>Vai trò:</label> Quản trị viên</div>
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
                   <div> <AccountBoxIcon/> <label>Họ và tên:</label> {firstName} {lastName}</div>
                </div>
                <div>
                    <div><EmailIcon/> <label>Email:</label> {email}</div>
                </div>
                <div>
                    <div><LocalPhoneIcon/> <label>Số điện thoại:</label> {phoneNumber}</div>
                </div>
                <div>
                    {userRole}
                </div>
                <div>
                    <div><HomeIcon/> <label>Nơi ở:</label> {address}</div>
                </div>
                <div>
                    <div><LocationCityIcon/> <label>Thành phố:</label> {city}</div>
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
    position: relative;
    top: 2rem;
    width: 100%;
  }
  div {
    box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    padding: 0.3rem 0.5rem 0.5rem 0.5rem;
    border-radius: 5px;
  }
`;

export default ProfileForm;
