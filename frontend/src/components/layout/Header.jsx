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
  BooksIcon,
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
        <MyCourses>
            {/* <BooksIcon /> */}
            <BookImg src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/2x/external-book-back-to-school-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"/>
             Khóa học của tôi
          </MyCourses>
        </Link>
      </Buttons>
    </React.Fragment>
  );

  const showUserCourses = (
    <React.Fragment>
      <Buttons>
        <Link to={`/usercourses`}>
          <MyCourses>
            {/* <BooksIcon /> */}
            <BookImg src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/2x/external-book-back-to-school-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png"/>
             Khóa học của tôi
          </MyCourses>
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
      <BellImg src="https://img.icons8.com/cotton/2x/appointment-reminders.png" onClick={showNotification} />
      <Wrapper style={{ display: !toggleNotification ? "none" : "block" }}>
        <h2>Thông báo</h2>
        <OverLay
          onClick={() => {
            setToggleNotification(false);
          }}
        ></OverLay>
        <NotificationItems>
          {!notifications
            ? "Không có thông báo"
            : notifications.map((v, index) => {
                let title = "";
                switch (v.type) {
                  case 0:
                    title = "Đăng kí khoá học";
                    break;
                  case 1:
                    title = "Thông báo khoá học";
                    break;
                  default:
                }
                return (
                  <NotifiItem key={index}>
                    <Title>{title}</Title>
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
                              setNotificationList([
                                showToast(
                                  "success",
                                  "Thông báo",
                                  "Từ chối học sinh"
                                ),
                              ]);
                              const dataDelete = [...notifications];
                              const index = notifications.findIndex(n => n.id === v.id);
                              dataDelete.splice(index, 1);
                              setNotifications([...dataDelete]);
                            })
                            .catch((error) => {
                              console.log(error.response.data);
                              setNotificationList([
                                showToast(
                                  "danger",
                                  "Thông báo",
                                  "Thất bại"
                                ),
                              ]);
                            });
                        }}
                      >
                        Từ Chối
                      </button>
                    </Btns>
                  </NotifiItem>
                );
              })}
        </NotificationItems>
      </Wrapper>
    </BellWrap>
  );

  return (
    <Nav>
      <Home>
        <Link to={`/`}>
        <Bgheader></Bgheader>
          <div>Academix</div>
        </Link>
      </Home>
      <Right>
        {loading ? "" : userRole()}
        {user.uuid && renderNotify}
        {!user.uuid ? loginIcon : person}
      </Right>
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
  border: 1px solid black;
  border-radius:5px;
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
  position: relative;
  height: 25rem;
  width: 20rem;
  overflow-y: auto;
  padding: 0 1rem 1rem 1rem;
  z-index: 99999999;
`;
const OverLay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
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
const BellImg = styled.img`
  font-size: 3rem !important;
  width: 4rem;
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
  padding: 0 3vw;
  flex-flow: row nowrap;
  justify-content: space-between;
  position: sticky;
  top: 0;
  // background-image: url("https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/vp933-audi-41_1_3.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=71e74d1507e7b8637b84e9fb9601ecbd");
  background-color: white;
  // background-color: #82ccdd;
  background-size: 22rem 15rem;
  background-repeat: repeat;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
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
const Bgheader = styled.div`
  height: 3rem;
  width: 3rem;
  background-image: url('https://library.kissclipart.com/20180930/zxe/kissclipart-icons-for-e-learning-clipart-computer-icons-educat-a2d7eebed7940575.png');
  background-position: center; 
  background-repeat: no-repeat;
  background-size: cover;

`
const Home = styled.div`
background-color: white;
  display:flex;
  gap: 2px;
  align-items: center;
  a {
    display: flex;
    flex-flow: row nowrap;
    padding: 0.1rem 0.5rem;
    border-radius: 3px;
    gap: 10px;
    align-items: center;
    transition: 0.25s ease;
  }
  a:hover {
    transform: scale(1.03);
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
  a{
    background-color: white;
    border-radius: 5px;
  }
`;
const SigninButton = styled.button`
  border: 0.5px solid black;
  color: black;
  font-weight: 600;
  padding: 14px 20px;
  font-size: 15px;
  transition: 0.5s ease 0s;
  border-radius: 5px;
  background-color: transparent;
  &:hover {
    transform: scale(1.02);
  }
`;

const MyCourses = styled(SigninButton)`
  min-width: 10vw;
  gap: 5px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;

`;
const BookImg = styled.img`
  width: 2rem;
`;

const SignupButton = styled.button`
  color: white;
  background-color: rgb(126,165,190);
  font-weight: 600;
  padding: 5px 20px;
  cursor: pointer;
  font-size: 15px;
  width: 120px;
  height: 50px;
  transition: 0.3s ease 0s;
  border-radius: 5px;
  &:hover {
    border: transparent;
    color: white;
    background-color: #04aa6d;
  }
`;

const Right = styled.div`
  width: 30%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
`;