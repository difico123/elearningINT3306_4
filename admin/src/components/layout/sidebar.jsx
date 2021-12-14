import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { LockIcon, PersonIcon, EditIcon } from "../../common/icons";

function Sidebar() {
  return (
    <SideBar>
      <NavLink to="/user/profile" activeClassName="active">
        <Wrap>
          <PersonIcon />
          <p>Thông tin cá nhân</p>
        </Wrap>
      </NavLink>
      <NavLink to="/user/editprofile" activeClassName="active">
        <Wrap>
          <EditIcon />
          <p>Chỉnh sửa thông tin</p>
        </Wrap>
      </NavLink>
      <NavLink to="/user/editpw" activeClassName="active">
        <Wrap>
          <LockIcon />
          <p>Thay đổi mật khẩu</p>
        </Wrap>
      </NavLink>
    </SideBar>
  );
}
const SideBar = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background-color: #969eaa;
  height: 100%;
  a {
    width: 100%;
    padding: 10px 1.5rem;
    background: linear-gradient(to left, #969eaa 50%, #3a3e47 50%) right;
    background-size: 200%;
    transition: 0.471s ease-out;
  }
  a:hover {
    cursor: pointer;
    background-color: #3a3e47;
    color: white;
    background-position: left;
  }
  a.active {
    background-color: #3a3e47;
    background-position: 0 0;
    color: #fff;
  }
  @media only screen and (min-width: 1900px) {
    min-width: 15vw;
    p {
      font-size: 1.35rem;
      text-align: center;
    }
  }
  @media only screen and (max-width: 1900px) {
    width: 20px;
    min-width: 15vw;
    p {
      font-size: 1rem;
    }
  }
  @media only screen and (max-width: 1000px) {
    width: 100%;
    p {
      display: none;
    }
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
`;
export default Sidebar;