import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  GroupsIcon,
  EditIcon,
  BooksIcon,
  ErrorIcon,
  QuizIcon,
  AddIcon,
} from "../../common/icons";
import courseService from "../../../service/courseService";
import Popup from "../../common/popup";
import { useParams } from "react-router-dom";
import Toast from "../../common/toast";
import showToast from "../../../dummydata/toast";

function Sidebar() {
  const [toggleDelete, setToggleDelete] = useState(false);
  const [toastList, setToastList] = useState([]);
  let { id } = useParams();

  const handleDelete = async () => {
    await courseService
      .deleteCourse(id)
      .then((response) => {
        setToastList([showToast("success", "Thông báo", response.msg)]);
        window.location.href = "../";
      })
      .catch((error) => {
        setToastList([
          showToast("danger", "Thông báo", error.response.data.msg),
        ]);
      });
    setToggleDelete(false);
  };

  const bodyPopup = <div>Bạn có thực sự muốn xóa khóa học này không?</div>;
  const footerPopup = (
    <DeleteButton onClick={handleDelete}>Tôi muốn xóa!</DeleteButton>
  );
  return (
    <React.Fragment>
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
        <NavLink to="./viewquiz" activeClassName="active">
          <Wrap>
            <QuizIcon />
            <p>Xem danh sách quiz</p>
          </Wrap>
        </NavLink>
        <NavLink to="./createquestion" activeClassName="active">
          <Wrap>
            <AddIcon />
            <p>Tạo câu hỏi mới</p>
          </Wrap>
        </NavLink>

        <DeleteButton
          className="popup-delete"
          onClick={() => {
            setToggleDelete(true);
          }}
        >
          <Wrap>
            <ErrorIcon />
            <p>Xóa khóa học</p>
          </Wrap>
        </DeleteButton>
      </SideBar>
      <Popup
        toggle={toggleDelete}
        setToggle={setToggleDelete}
        header={<h2 className="text-red-400">Cảnh báo!</h2>}
        body={bodyPopup}
        footer={footerPopup}
      />
      <Toast toastList={toastList} />
    </React.Fragment>
  );
}

const SideBar = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  background-color: #969eaa;
  height: 90vh;
  box-shadow: 0px 0px 10px #232931;
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
  .popup-delete {
    position: absolute;
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
  bottom: 0.5rem;
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