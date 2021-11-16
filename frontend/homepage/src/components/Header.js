import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Header() {
  return (
    <Nav>
      <Logo
        src="
    https://image.freepik.com/free-vector/course-e-learning-from-home-online-studying-logo-icon-sticker-vector-distant-education-e-books-online-education-distance-exam-banner-vector-isolated-background-eps-10_399089-1104.jpg"
      ></Logo>
      <Categories>
        <CustomMenu style={{ fontSize: 30 }} />
        <p>Danh mục khóa học</p>
      </Categories>
      <SearchBar>
        <input type="text" placeholder="Tìm kiếm khóa học..." />

        <button type="submit">
          <CustomSearch style={{ fontSize: 30 }} />
        </button>
      </SearchBar>
      <Checkout>
        <Cart style={{ fontSize: 30 }} />
        <p>Thanh toán</p>
      </Checkout>
      <Buttons>
        <SigninButton>Đăng nhập</SigninButton>
        <SignupButton>Đăng ký</SignupButton>
      </Buttons>
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
`;

const Logo = styled.img`
  height: 40px;
`;

const Categories = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 5px;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1100px;
  border: 2px solid black;
  border-radius: 100px;
  opacity: 0.85;
  cursor: pointer;
  padding: 10px 25px;
  cursor: text;
  font-weight: lighter;

  input {
    border: none;
    width: 100%;
    autocomplete: off;
    background-image: none;
    font-size: 15px;
    font-weight: lighter;
  }

  button {
    cursor: pointer;
    border: none;
    background-image: none;
    background: transparent;
  }
  textarea:focus,
  input:focus {
    outline: none;
  }
`;

const Checkout = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex-gap: 10px;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  height: 40px;
`;

const Buttons = styled.div`
  display: flex;
  flex-flow; row nowrap;
  gap: 15px;
  align-items: center;
  cursor: pointer;
`;
const SigninButton = styled.div`
  border: 0.5px solid black;
  color: black;
  font-weight: 600;
  padding: 15px 20px;
`;
const SignupButton = styled.div`
  color: white;
  background-color: black;
  font-weight: 600;
  padding: 16px 30px;
`;

const CustomSearch = styled(SearchIcon)``;

const Cart = styled(ShoppingCartIcon)`
  cursor: pointer;
`;

const CustomMenu = styled(MenuIcon)``;
