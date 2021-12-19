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
      <Container>
        <Wrap>
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
        </Wrap>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  background-image: url("https://enbaca.com/web/assets/image-resources/poly-bg/poly-bg-8.jpg");
  background-repeat: no-repeat;
  background-size: cover;
`;

const Wrap = styled.div`
  margin: 15vh auto;
  display: flex;
  justify-content: center;
  gap: 10vw;
  height: 50vh;
  width: 50vw;
  div {
    margin: 0.5rem 0;
  }
  padding: 4vh 0;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
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