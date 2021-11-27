import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Sidebar() {
  const setStyle = (e) => {
    let styles = e.target.parentElement.parentElement.querySelectorAll(
      ".bg-blue-400.text-white"
    );
    for (let i = 0; i < styles.length; i++) {
      styles[i].classList.remove("bg-blue-400", "text-white");
    }
    e.target.classList.add("bg-blue-400", "text-white");
  };

  return (
    <SideBar>
      <Link to="/user/profile">
        <div
          onClick={setStyle}
          className="bg-blue-400 text-white"
          value="info"
          readOnly
        >
          Thông tin cá nhân
        </div>
      </Link>
      <Link to="/user/editprofile">
        <div onClick={setStyle} value="editInfo" readOnly>
          Sửa thông tin cá nhân
        </div>
      </Link>
      <Link to="/user/editpw">
        <div onClick={setStyle} value="editPw" readOnly>
          Thay đổi mật khẩu
        </div>
      </Link>
    </SideBar>
  );
}
const SideBar = styled.div`
  position: absolute;
  min-width: 12rem;
  top: 4rem;
  left: 2rem;
  background-color: white;
  border-radius: 5px;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  div {
    margin: 10px;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
      rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    border-radius: 2px;
  }
  div:hover {
    cursor: pointer;
    background-color: #758283;
    color: white;
  }
  .active {
    background-color: yellow;
  }
`;
export default Sidebar;
