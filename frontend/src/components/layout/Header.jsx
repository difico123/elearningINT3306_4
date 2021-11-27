import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthApi from "../../service/authUser";
import AuthService from "../../service/authService";
import {SearchIcon,MenuIcon,AccountCircleIcon,AccountBoxIcon, PasswordIcon, LogoutIcon,SettingsIcon, ContactsIcon} from '../common/icons'

function Header({user}) {
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

  React.useEffect(() => {
    setInfo(user)
  }, [user]);

  let fakeData = {
    logoImg : `https://image.freepik.com/free-vector/course-e-learning-from-home-online-studying-logo-icon-sticker-vector-distant-education-e-books-online-education-distance-exam-banner-vector-isolated-background-eps-10_399089-1104.jpg`,
    instructorImg : `"https://cdn-icons-png.flaticon.com/512/65/65882.png"`
  }

  function menuToggle() {
    const toggleMenu = document.querySelector(".menu");
    toggleMenu.classList.toggle("active");
  }

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
    window.location.href = '/auth/login';
  };

  const person = (
    <Wrap onClick={menuToggle} >
      <div className="profile" >
      {!info.imageUrl? <AccountCircleIcon className="p-0 font-normal" />: <img src={`${info.imageUrl}`}></img> }
      </div>
      <div className="menu">
        <ul>
        <Link to={'/user/profile'} >
          <li>
              <AccountBoxIcon /> Profile
          </li>
          </Link>
          <Link to={`#`}>
          <li>
              <SettingsIcon  /> Setting
          </li>
          </Link>
          <li>
            <button onClick={handleLogout}>
              <LogoutIcon /> Logout
            </button>
          </li>
        </ul>
      </div>
    </Wrap>
  );
  return (
    <Nav>
      <Logo>
        <Link to={`/`}>
          <img src={fakeData.logoImg} />
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
      {!user.uuid? loginIcon:person}
    </Nav>
  );
  
}

export default Header;

const Nav = styled.div`
  z-index: 999;
  height: 85px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  flex-flow: row nowrap;
  justify-content: space-around;
  border-bottom: 0.5px solid black;
  position: sticky;
  top: 0;
  background-color: white;
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

const BecomeInstructor = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  height: 40px;
  font-weight: 600;
`;


const Wrap = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  justify-content: space-around;
  top: 20px;
  right: 30px;
  z-index: 99999;
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
    right: 3.5vw;
    background: #fff;
    width: 9rem;
    box-sizing: 0 5px 25px rgba(0, 0, 0, 0.1);
    border-radius: 15px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background-color: #f1f2f6;
    transition: 0.5s;
    display:none;
  }

  .menu li:hover{
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
    background:black;
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

const InstructorIcon = styled.img`
  height: 10px;
`;