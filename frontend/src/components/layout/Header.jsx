import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthService from "../../service/authService";
import {
  SearchIcon,
  MenuIcon,
  AccountCircleIcon,
  AccountBoxIcon,
  LogoutIcon,
  SettingsIcon,
} from "../common/icons";

function Header({ user }) {
  const [info, setInfo] = useState({
    uuid: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
    email: "",
    city: "",
    address: "",
    imageUrl: "",
    role: "",
    dateAdded: "",
    lastUpdated: "",
    auth: false,
  });

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setInfo(user);
    setLoading(false);
  }, [user]);

  let fakeData = {
    logoImg: `https://image.freepik.com/free-vector/course-e-learning-from-home-online-studying-logo-icon-sticker-vector-distant-education-e-books-online-education-distance-exam-banner-vector-isolated-background-eps-10_399089-1104.jpg`,
    instructorImg: `"https://cdn-icons-png.flaticon.com/512/65/65882.png"`,
  };

  function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
  }

  const showInstructorCourses = (
    <React.Fragment>
      <Buttons>
        <Link to={`/instructorcourses`}>
          <SigninButton>Khóa học của tôi</SigninButton>
        </Link>
      </Buttons>
    </React.Fragment>
  );

  const showUserCourses = (
    <React.Fragment>
      <Buttons>
        <Link to={`/usercourses`}>
          <SigninButton>Khóa học của tôi</SigninButton>
        </Link>
      </Buttons>
    </React.Fragment>
  );

  const loginIcon = (
    <React.Fragment>
      <Buttons>
        <Link to={`/auth/login`}>
          <SigninButton>Đăng nhập</SigninButton>
        </Link>
        <Link to={`/auth/signup`}>
          <SignupButton>Đăng ký</SignupButton>
        </Link>
      </Buttons>
    </React.Fragment>
  );

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = "/auth/login";
  };

  const person = (
    <Wrap onClick={menuToggle}>
      <div className="profile">
        {!info.imageUrl ? (
          <AccountCircleIcon className="p-0 font-normal" />
        ) : (
          <img alt="" src={`${info.imageUrl}`}></img>
        )}
      </div>
      <div className="menu">
        <ul>
          <li>
            <Link to={"/user/profile"}>
              <AccountBoxIcon /> Profile
            </Link>
          </li>
          <li>
            <Link to={`#`}>
              <SettingsIcon /> Setting
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>
              <LogoutIcon /> Logout
            </button>
          </li>
        </ul>
      </div>
    </Wrap>
  );
  console.log(user);

  const userRole = () => {
    if (user.role === 1) return showInstructorCourses;
    else if (user.role === 0) return showUserCourses;
    else return "";
  };
  console.log(user.role);

  return (
    <Nav>
      <Logo>
        <Link to={`/`}>
          <img alt="" src={fakeData.logoImg} />
        </Link>
      </Logo>
      <Categories>
        <CustomMenu></CustomMenu>
        <p>Danh mục khóa học</p>
      </Categories>
      <SearchBar>
        <input type="text" placeholder="Tìm kiếm khóa học..." />
        <button type="submit">
          <CustomSearch />
        </button>
      </SearchBar>
      {loading ? "" : userRole()}
      {!user.uuid ? loginIcon : person}
    </Nav>
  );
}

export default Header;

const Nav = styled.div`
  height: 85px;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  padding: 0 5vw;
  flex-flow: row nowrap;
  justify-content: space-between;
  border-bottom: 0.5px solid black;
  background-color: white;
  z-index: 99999;
`;

const Logo = styled.div`
  img {
    height: 40px;
  }
`;

const Categories = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 900px;
  border: 2px solid black;
  border-radius: 100px;

  cursor: pointer;
  padding: 8px 25px;
  cursor: text;
  font-weight: lighter;

  input {
    padding-left: 10px;
    border: none;
    width: 90%;
    autocomplete: off;
    background-image: none;
    font-size: 15px;
    font-weight: lighter;
  }
  button {
    cursor: pointer;
    border: none;
    background: transparent;
  }
  textarea:focus,
  input:focus {
    outline: none;
  }
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-around;
  top: 20px;
  right: 30px;
  .profile {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }

  .profile img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .profile .p-0 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .menu {
    position: absolute;
    top: 5rem;
    right: 5.5vw;
    background: #fff;
    width: 7rem;
    box-sizing: 0 5px 25px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: #f1f2f6;
    transition: 0.5s;
    display: none;
  }

  .menu li:hover {
    background-color: #ced6e0;
  }

  & .menu.active {
    display: block;
  }

  & .menu::before {
    content: "";
    position: absolute;
    top: -5px;
    right: 28px;
    width: 20px;
    height: 20px;
    background: black;
    transform: rotate(45deg);
    z-index: -100;
  }

  .menu ul li {
    list-style: none;
    padding: 0.5rem 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    width: 100%;
  }

  & .menu ul li:hover {
    display: inline-block;
    text-decoration: none;
    color: #555;
    font-weight: 500;
    transition: 0.5s;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-flow; row nowrap;
  gap: 15px;
  align-items: center;
`;
const SigninButton = styled.button`
  border: 0.5px solid black;
  color: black;
  font-weight: 600;
  padding: 0 20px;
  font-size: 15px;
  width: 120px;
  height: 50px;
  transition: 0.5s ease 0s;
  background-color: transparent;
  &:hover {
    border: transparent;
    color: white;
    background-color: #04aa6d;
  }
`;
const SignupButton = styled.button`
  color: white;
  background-color: black;
  font-weight: 600;
  padding: 5px 20px;
  cursor: pointer;
  font-size: 15px;
  width: 120px;
  height: 50px;
  transition: 0.3s ease 0s;
  &:hover {
    border: transparent;
    color: white;
    background-color: #04aa6d;
  }
`;

const CustomSearch = styled(SearchIcon)``;

const CustomMenu = styled(MenuIcon)``;
