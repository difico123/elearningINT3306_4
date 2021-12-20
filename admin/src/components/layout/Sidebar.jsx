import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { LockIcon, PersonIcon, EditIcon } from "../common/icons";
import AdminService from "../../service/AdminService";
function Sidebar({ user }) {

  const handleLogout = () => {
    AdminService.logout().then(() => {
      window.location = '/admin/auth'
    })
  }

  return (
    <SideBar>
      <Avt>
        <img src={user.info.imageUrl} alt="" />
        <p>ADMIN</p>
      </Avt>
      <NavLink to="/users" activeClassName="active">
        <Wrap>
          <PersonIcon />
          <p>Người dùng</p>
        </Wrap>
      </NavLink>
      <NavLink to="/courses" activeClassName="active">
        <Wrap>
          <EditIcon />
          <p>Khoá học</p>
        </Wrap>
      </NavLink>
      <NavLink to="/admin/login" activeClassName="active" onClick={handleLogout}>
        <Wrap>
          <LockIcon />
          <p>Đăng xuất</p>
        </Wrap>
      </NavLink>
    </SideBar>
  );
}

const SideBar = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  a {
    padding: 10px 1.5rem;
    background: linear-gradient(to left, #FFF 50%, #039be5 50%) right;
    background: white;
    background-size: 200%;
    transition: 0.471s ease-out;
    color: black;
    text-decoration: none;
    p {
      font-size: 1.4rem;
    }
  }
  a:hover {
    cursor: pointer;
    background-color: #039be5;
    color: white;
    background-position: left;
  }
  a.active {
    background-color: #039be5;
    background-position: 0 0;
    color: #fff;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
`;
const Avt = styled.div`
  padding: 5px 1.5rem;
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
  height:3rem;
  font-size: 1.5rem;
  font-weight: 400;
  img{
    height:100%;
    border-radius:100%;
  }
  p{
    font-weight: 600;
    padding: 0.3rem;
    border-radius: 5px;
  }
`;
export default Sidebar;