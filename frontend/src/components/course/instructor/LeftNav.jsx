import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { GroupsIcon, EditIcon, BooksIcon, ErrorIcon } from "../../common/icons";

function Sidebar() {
  return (
    <SideBar>
      <NavLink to="./infos" activeClassName="active">
        <Wrap>
          <BooksIcon />
          <p>Thông tin khóa học</p>
        </Wrap>
      </NavLink>
      <NavLink to="./edit" activeClassName="active">
        <Wrap>
          <EditIcon />
          <p>Chỉnh sửa nội dung</p>
        </Wrap>
      </NavLink>
      <NavLink to="./students" activeClassName="active">
        <Wrap>
          <GroupsIcon />
          <p>Danh sách học viên</p>
        </Wrap>
      </NavLink>

      <DeleteButton>
        <Wrap>
          <ErrorIcon />
          <p>Xóa khóa học</p>
        </Wrap>
      </DeleteButton>
    </SideBar>
  );
}

const SideBar = styled.div`
  display: flex;
  flex-flow: column nowrap;
  background-color: #969eaa;
  height: 90vh;
  a {
    width: 100%;
    padding: 10px 1rem;
    background: linear-gradient(to left, #969eaa 50%, #3a3e47 50%) right;
    background-size: 200%;
    transition: 0.471s ease-out;
    cursor: pointer;
  }
  a:hover {
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
      font-size: 1.4rem;
      text-align: center;
    }
  }
  @media only screen and (max-width: 1900px) {
    width: 20px;
    min-width: 15vw;
    p {
      font-size: 1.1rem;
      flex-flow: row nowrap;
    }
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
    p {
      display: none;
    }
  }
`;

const DeleteButton = styled.button`
  bottom: 0;
  background-color: white;
  color: black;
  font-weight: 600;
  padding: 1rem 2rem;
  font-size: 15px;
  width: 100%;
  transition: 0.5s ease 0s;
  &:hover {
    color: white;
    background-color: crimson;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
`;

export default Sidebar;