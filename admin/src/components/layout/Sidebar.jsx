import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { LockIcon, PersonIcon, EditIcon } from "../common/icons";
import AdminService from "../../service/AdminService";
function Sidebar({user}) {

  const handleLogout = () => {
    AdminService.logout().then(() => {
      window.location= '/admin/auth'
    })
  }

  return (
    <SideBar>
        <Avt>
          <img src={user.info.imageUrl} alt="" />
            <p>Admin</p>
        </Avt>
      <NavLink to="/students" activeClassName="active">
        <Wrap>
          <PersonIcon />
          <p>Người dùng</p>
        </Wrap>
      </NavLink>
      <NavLink to="/instructors" activeClassName="active">
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
  background-color: #969eaa;
  height: 100%;
  a {
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
`;

const Wrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
`;
const Avt = styled.div`
  padding: 10px 1.5rem;
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
  height:3rem;
  font-size: 1.2rem;
  font-weight: 400;
  img{
    height:100%;
    border-radius:100%;
  }
  p{
    background: gray;
    padding: 0.3rem;
    border-radius: 5px;
  }
`;
export default Sidebar;