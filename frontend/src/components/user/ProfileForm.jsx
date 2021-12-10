import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  AccountBoxIcon,
  PersonIcon,
  EmailIcon,
  LocalPhoneIcon,
  LocationCityIcon,
  HomeIcon,
} from "../common/icons";

function ProfileForm({ user }) {
  const [userProfile, setUserProfile] = useState({
    lastName: "",
    firstName: "",
    email: "",
    phoneNumber: "",
    city: "",
    address: "",
    role: "",
    imageUrl: "",
  });

  let { firstName, lastName, email, phoneNumber, city, address, role } =
    userProfile;

  React.useEffect(() => {
    setUserProfile({ ...user });
  }, [user]);

  let userRole;
  if ({ role }.role == 0) {
    userRole = (
      <div>
        <PersonIcon /> <label>Vai trò:</label> Học sinh
      </div>
    );
  } else if ({ role }.role == 1) {
    userRole = (
      <div>
        <PersonIcon /> <label>Vai trò:</label> Giảng viên
      </div>
    );
  } else {
    userRole = (
      <div>
        <PersonIcon /> <label>Vai trò:</label> Quản trị viên
      </div>
    );
  }

  return (
    <>
      <Wrap>
        <Container>
          <Image>
            <Title>Thông tin cá nhân</Title>
            {userProfile.imageUrl ? (
              <img className="" src={`${userProfile.imageUrl}`} alt="" />
            ) : (
              <ProfileIcon></ProfileIcon>
            )}
          </Image>
          <Form>
            <UserDetails>
              <div>
                <div>
                  {" "}
                  <AccountBoxIcon /> <label>Họ và tên:</label> {firstName}{" "}
                  {lastName}
                </div>
              </div>
              <div>
                <div>
                  <EmailIcon /> <label>Email:</label> {email}
                </div>
              </div>
              <div>
                <div>
                  <LocalPhoneIcon /> <label>Số điện thoại:</label> {phoneNumber}
                </div>
              </div>
              <div>{userRole}</div>
              <div>
                <div>
                  <HomeIcon /> <label>Nơi ở:</label> {address}
                </div>
              </div>
              <div>
                <div>
                  <LocationCityIcon /> <label>Thành phố:</label> {city}
                </div>
              </div>
            </UserDetails>
          </Form>
        </Container>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  height: 90vh;
  display: flex;
  width: 100%;
`;
const Container = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 5vh 15vw;
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
  font-size: 1.2rem;
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
    border-radius: 5px;
  }
`;

export default ProfileForm;