import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import AuthApi from "../../service/authUser";
import AuthService from "../../service/authService";
import NotificationService from "../../service/notificationService";
import CourseService from "../../service/courseService";
import {
  SearchIcon,
  MenuIcon,
  AccountCircleIcon,
  AccountBoxIcon,
  LogoutIcon,
  SettingsIcon,
  NotificationsIcon,
  HomeIcon,
} from "../common/icons";
import Toast from "../common/toast";
import showToast from "../../dummydata/toast";

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
  const [notifications, setNotifications] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notificationNum, setNotificationNum] = useState(0);
  const [toggleNotification, setToggleNotification] = useState(false);
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    (async () => {
      setInfo(user);
      await NotificationService.getNotSeenNotifications().then((data) => {
        setNotificationNum(data.num);
      });
      setLoading(false);
    })();
  }, [user]);

  let fakeData = {
    logoImg: `https://image.freepik.com/free-vector/course-e-learning-from-home-online-studying-logo-icon-sticker-vector-distant-education-e-books-online-education-distance-exam-banner-vector-isolated-background-eps-10_399089-1104.jpg`,
    instructorImg: `"https://cdn-icons-png.flaticon.com/512/65/65882.png"`,
  };

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
    window.location.href = "/auth/login";
  };

  const showInstructorCourses = (
    <React.Fragment>
      <Buttons>
        <Link to={`/instructorcourses`}>
          <MyCourses>Khóa học của tôi</MyCourses>
        </Link>
      </Buttons>
    </React.Fragment>
  );

  const showUserCourses = (
    <React.Fragment>
      <Buttons>
        <Link to={`/usercourses`}>
          <MyCourses>Khóa học của tôi</MyCourses>
        </Link>
      </Buttons>
    </React.Fragment>
  );

  const userRole = () => {
    if (user.role === 1) return showInstructorCourses;
    else if (user.role === 0) return showUserCourses;
    else if (user.role === 2) return showUserCourses;
    else return "";
  };

  const person = (
    <Wrap onClick={menuToggle}>
      <div className="wrap">
        <div className="profile">
          {!info.imageUrl ? (
            <AccountCircleIcon className="p-0 font-normal" />
          ) : (
            <img src={`${info.imageUrl}`}></img>
          )}
        </div>
        <div className="full-name">
          {info.firstName} {info.lastName}
          <div className="menu">
            <ul>
              <Link to={"/user/profile"}>
                <li>
                  <AccountBoxIcon /> Profile
                </li>
              </Link>
              <Link to={`#`}>
                <li>
                  <SettingsIcon /> Setting
                </li>
              </Link>
              <li>
                <button onClick={handleLogout}>
                  <LogoutIcon /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Wrap>
  );

  const showNotification = () => {
    NotificationService.getNotifications().then((data) => {
      setNotifications(data.notifications);
    });
    setNotificationNum(0);
    setToggleNotification(!toggleNotification);
  };

  const renderNotify = (
    <BellWrap>
      <div className="NotifiNum">{notificationNum}</div>

      <NotificationIcon onClick={showNotification} />
      <Wrapper style={{ display: !toggleNotification ? "none" : "block" }}>
        <h2>Thông báo</h2>
        <OverLay onClick={() => {
          setToggleNotification(false);
        }}></OverLay>
        <NotificationItems>
          {!notifications
            ? "Không có thông báo"
            : notifications.map((v, index) => (
                <NotifiItem key={index}>
                  <Title>{v.topic}</Title>

                  <Des>
                    <span>{v.details}</span> - <span>{v.name}</span>
                  </Des>
                  <Time>
                    <p>{v.sendAt}</p>
                  </Time>
                  <Btns className={v.isConfirmed == 1 ? "hidden" : "flex"}>
                    <button
                      value={v.courseId}
                      className="bg-green-500 text-white"
                      onClick={(e) => {
                        CourseService.inviteStudent(v.courseId, v.userId)
                          .then((data) => {
                            NotificationService.setConfirm(v.id)
                              .then(() => {
                                e.target.parentElement.style.display = "none";
                                setNotificationList([
                                  showToast(
                                    "success",
                                    "Thông báo",
                                    data.msg.toString()
                                  ),
                                ]);
                              })
                              .catch((error) => {
                                setNotificationList([
                                  showToast(
                                    "danger",
                                    "Thông báo",
                                    error.response.data.msg.toString()
                                  ),
                                ]);
                              });
                          })
                          .catch((error) => {
                            setNotificationList([
                              showToast(
                                "danger",
                                "Thông báo",
                                error.response.data.msg.toString()
                              ),
                            ]);
                          });
                      }}
                    >
                      Chấp nhận
                    </button>
                    <button
                      className="bg-gray-200"
                      onClick={(e) => {
                        NotificationService.delNotification(v.id)
                          .then((data) => {
                            e.target.parentElement.parentElement.remove();
                            setNotificationList([
                              showToast(
                                "success",
                                "Thông báo",
                                data.msg.toString()
                              ),
                            ]);
                          })
                          .catch((error) => {
                            setNotificationList([
                              showToast(
                                "danger",
                                "Thông báo",
                                error.response.data.msg.toString()
                              ),
                            ]);
                          });
                      }}
                    >
                      Từ Chối
                    </button>
                  </Btns>

                </NotifiItem>
              ))}
        </NotificationItems>
      </Wrapper>
    </BellWrap>
  );

  return (
    <Nav>
      <Home>
        <Link to={`/`}>
          <HomeIcon />
          <div>Trang chủ</div>
        </Link>
      </Home>
      {user.uuid && renderNotify}
      {loading ? "" : userRole()}
      {!user.uuid ? loginIcon : person}
      <Toast toastList={notificationList} />
    </Nav>
  );
}

export default Header;
const Wrapper = styled.div`
  display: none;
  position: absolute;
  top: 115%;
  right: -25%;
  border: 1px solid #38cc77;
  background: white;
  h2 {
    padding: 0.5rem;
    font-weight: 700;
  }
  &::before {
    content: "";
    position: absolute;
    top: -10px;
    right: 25px;
    width: 20px;
    height: 20px;
    background: black;
    transform: rotate(45deg);
    z-index: -100;
  }
`;

const NotificationItems = styled.div`
  position:relative;
  height: 25rem;
  width: 20rem;
  overflow-y: auto;
  padding: 0 1rem 1rem 1rem;
  z-index: 99999999;
`;
const OverLay = styled.div`
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  width:100vw;
  height:100vh;
`;
const NotifiItem = styled.div`
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  padding: 0.5rem;
  margin: 0.5rem 0;
`;

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
`;
const Des = styled.div``;
const Time = styled.div`
  text-align: end;
  font-size: 0.6rem;
`;
const Btns = styled.div`
  justify-content: space-around;
  margin: 0.2rem 0;
  button {
    box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
      rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
    padding: 0 0.5rem;
    transition: 0.5s ease 0s;
  }
`;
const NotificationIcon = styled(NotificationsIcon)`
  font-size: 3rem !important;
  cursor: pointer;
`;

const BellWrap = styled.div`
  position: relative;
  .NotifiNum {
    position: absolute;
    top: 0;
    right: 0;
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    background: red;
    color: white;
    border-radius: 50%;
  }
`;

const Nav = styled.div`
  z-index: 999;
  height: 10vh;
  display: flex;
  align-items: center;
  padding: 0 30px;
  flex-flow: row nowrap;
  justify-content: space-around;
  position: sticky;
  top: 0;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
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
  div.wrap {
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
    .full-name {
      position: relative;
      margin-left: 0.5rem;
      margin-right: 0.7rem;
      font-size: 1rem;
      padding: 2px;
      .menu {
        position: absolute;
        top: 200%;
        right: 0;
        background: #fff;
        width: 9rem;
        box-sizing: 0 5px 25px rgba(0, 0, 0, 0.1);
        border-radius: 15px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        background-color: #f1f2f6;
        transition: 0.5s;
        display: none;
      }
      .menu li:hover {
        background-color: #ced6e0;
        border-radius: 15px;
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
    }
  }
  & div.wrap {
    border-radius: 35px;
    background-color: rgba(236, 240, 241, 1);
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
  }
`;

const Home = styled.div`
  a {
    display: flex;
    flex-flow: row nowrap;
    padding: 1vh 1vw;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    gap: 10px;
    align-items: center;
    transition: 0.25s ease;
  }
  a:hover {
    background-color: grey;
    color: white;
  }
  div {
    font-weight: 500;
    font-size: 1.25rem;
    display: flex;
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

const MyCourses = styled(SigninButton)`
  width: 10vw;
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