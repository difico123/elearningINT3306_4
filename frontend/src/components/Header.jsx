import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AuthApi from "../service/authUser";
import auth from "../service/authService";

function Header() {
  let Auth = React.useContext(AuthApi);

  const loginIcon = (
    <React.Fragment>
      <Buttons>
        <Link to={`/login`}>
          <SigninButton>Đăng nhập</SigninButton>
        </Link>
        <Link to={`/register`}>
          <SignupButton>Đăng ký</SignupButton>
        </Link>
      </Buttons>
    </React.Fragment>
  );
  const handleLogout = () => {
    auth.logout().then((res) => {
      console.log(res.data);
    });
    Auth.setAuth(false);
  };

  const person = (
    <React.Fragment>
      <div className="bg-blue-200 border-light-blue-500 rounded-xl">
        {" "}
        <AccountCircleIcon className="p-0" />
      </div>
    </React.Fragment>
  );

  return (
    <Nav>
      <Logo>
        <Link to={`/`}>
          <img
            src="
    https://image.freepik.com/free-vector/course-e-learning-from-home-online-studying-logo-icon-sticker-vector-distant-education-e-books-online-education-distance-exam-banner-vector-isolated-background-eps-10_399089-1104.jpg"
          />
        </Link>
      </Logo>
      <Categories>
        <CustomMenu></CustomMenu>
        <p>Danh mục khóa học</p>
      </Categories>
      <SearchBar>
        <input type="text" placeholder="Tìm kiếm khóa học..." />
        <button type="submit">
          <CustomSearch style={{ fontSize: 30 }} />
        </button>
      </SearchBar>
      <BecomeInstructor>
        <InstructorIcon src="https://cdn-icons-png.flaticon.com/512/65/65882.png"></InstructorIcon>
        <p>Trở thành giảng viên</p>
      </BecomeInstructor>
      {Auth.auth ? person : loginIcon}
    </Nav>
  );
}

export default Header;
const Nav = styled.div`
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
  z-index: 100;
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
  height: 30px;
`;
