import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useParams, Navigate, Route, Routes } from "react-router-dom";
import CourseService from "../../../service/courseService";
import TopicContent from "./TopicContent";
import {
  MoreVertIcon,
  EditIcon,
  ClearIcon,
  Warning,
  GroupsIcon,
  StarIcon,
  BooksIcon,
  AddIcon,
} from "../../common/icons";
import Popup from "../../common/popup";
import Toast from "../../common/toast";
import showToast from "../../../dummydata/toast";
import EditTopic from "./EditTopic";

function EditCourseInfos({ courseParam, topicsParam }) {
  let { id } = useParams();

  const [course, setCourse] = useState({
    id: id,
    name: "",
    description: "",
    instructorName: "",
    imageUrl: "",
    register: 0,
    rating: "",
    numTopic: "",
  });

  const [topicId, setTopicId] = useState();
  const [isLoading, setLoading] = useState(true);
  const [toastList, setToastList] = useState([]);
  const [toggle, setToggle] = useState(-1);
  let [modelToggle, setModelToggle] = useState(false);
  const [topics, setTopics] = useState([
    {
      id: "",
      title: "",
    },
  ]);

  useEffect(() => {
    setTopicId(topicsParam[0] ? topicsParam[0].id : null);
    setCourse({ ...courseParam });
    setTopics(topicsParam);
    setLoading(false);
  }, [courseParam, topicsParam]);

  const handleDropDown = (e, index) => {
    e.stopPropagation();
    setToggle(index);
  };

  const handleOverLayDropdown = (e) => {
    e.stopPropagation();
    setToggle(-1);
  };

  const handleDeletePopup = (e) => {
    e.stopPropagation();
    setModelToggle(true);
    // setToggle(-1);
  };

  const handleDelete = (e) => {
    (async () =>
      await CourseService.deleteTopic(id, toggle)
        .then(() => {
          setToastList([showToast("success", "Thông báo!", "Xoá thành công!")]);
          setToggle(-1);
          setModelToggle(false);
          setTopics(topics.filter((item) => item.id !== toggle));
          setTopicId(topics[0] ? topics[0].id : -1);
        })
        .catch(() => {
          setToastList([showToast("danger", "Thông báo!", "Xoá thất bại!")]);
        }))();
  };

  const [editToggle, setEditToggle] = useState(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditToggle(true);
    setToggle(-1);
  };

  const handleSelectedTopic = (id) => {
    setTopicId(id);
  };
  const renderTopics = topics.map((topic, index) => (
    <>
      <Title
        className={topicId === topic.id ? "active" : ""}
        key={index}
        onClick={() => handleSelectedTopic(topic.id)}
      >
        <span className="font-bold">Chủ đề {index + 1}:</span> {topic.title}
        <WrapDrop onClick={(e) => handleDropDown(e, topic.id)}>
          {toggle !== topic.id ? (
            <MoreVertIcon />
          ) : (
            <>
              <EditTopicBtn onClick={handleEdit}></EditTopicBtn>
              <DelTopicBtn onClick={handleDeletePopup}></DelTopicBtn>
            </>
          )}
          <div className={toggle !== topic.id ? "hidden" : ""}>
            <OverLay onClick={(e) => handleOverLayDropdown(e)}></OverLay>
          </div>
        </WrapDrop>
      </Title>
    </>
  ));

  const bodyPopup = <div>Bạn có thực sự muốn xóa topic này không?</div>;
  const headerPopup = (
    <HeaderPopupWapper>
      <img src={Warning} alt="" />
      <span>Cảnh báo!</span>
    </HeaderPopupWapper>
  );
  const footerPopup = (
    <DeleteButton onClick={handleDelete}>Tôi muốn xóa!</DeleteButton>
  );

  return (
    <Container>
      <Body>
        <CourseInfos>
          <InfoWrap>
            <CourseTitle>{course.name}</CourseTitle>
            <CourseDescription>{course.description}</CourseDescription>
            <ARWrap>
              <CourseAttendance>
                <span> Số học viên: {course.register}</span>
                <GroupsIcon />
              </CourseAttendance>
              <CourseRating>
                <span>Đánh giá: {course.rating ? course.rating : "0"} </span>
                <StarIcon />
              </CourseRating>
              <CourseAttendance>
                <span>Chủ đề: {course.numTopic ? course.numTopic : "0"} </span>
                <BooksIcon />
              </CourseAttendance>
            </ARWrap>
          </InfoWrap>
          <CourseCover>
            <BackgroundImage
              src={
                course.imageUrl
                  ? course.imageUrl
                  : "https://www.optionabroad.com/wp-content/uploads/2021/03/Study-in-USA.jpg"
              }
            ></BackgroundImage>
          </CourseCover>
        </CourseInfos>
        <Topic>
          <TopicNav>
            <NavTitle>
              <span>Nội dung khóa học</span>
              <Link to="../createTopic">
                <AddTopic>
                  <AddIcon />
                </AddTopic>
              </Link>
            </NavTitle>
            <TopicWrap>
              {!topics[0] ? (
                <NoContent>Chưa có chủ đề</NoContent>
              ) : (
                renderTopics
              )}
            </TopicWrap>
          </TopicNav>
          <ContentWrapper>
            {!isLoading &&
              (editToggle ? (
                <EditTopic
                  topicId={topicId}
                  setEditToggle={setEditToggle}
                  topics={topics}
                />
              ) : (
                <TopicContent
                  courseId={course.id}
                  topicId={topicId ? topicId : -1}
                />
              ))}
          </ContentWrapper>
        </Topic>
      </Body>
      <Popup
        toggle={modelToggle}
        setToggle={setModelToggle}
        header={headerPopup}
        body={bodyPopup}
        footer={footerPopup}
      />
      <Toast toastList={toastList} />
    </Container>
  );
}

export default EditCourseInfos;

const NoContent = styled.div`
  text-align: center;
  padding-top: 1rem;
  font-weight: bold;
`;
const ContentWrapper = styled.div`
  width: 85vw;
  overflow: auto;
`;
const HeaderPopupWapper = styled.div`
  text-align: center;
  img {
    width: 2rem;
    background-color: red;
    border-radius: 5px;
  }
  display: flex;
  justify-content: start;
  gap: 1rem;
  align-items: center;
`;

const DeleteButton = styled.div`
  text-align: center;
  bottom: 0.5rem;
  background-color: white;
  color: black;
  font-weight: 600;
  padding: 1rem 2rem;
  font-size: 15px;
  width: 100%;
  transition: 0.5s ease 0s;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: crimson;
  }
`;

const DelTopicBtn = styled(ClearIcon)`
  position: relative;
  z-index: 99;
  &:hover {
    color: red;
    background-color: #cad5e2;
    border-radius: 3px;
    transition: all 0.5s ease;
  }
`;
const EditTopicBtn = styled(EditIcon)`
  position: relative;
  z-index: 99;
  &:hover {
    color: #120e43;
    background-color: #cad5e2;
    border-radius: 3px;
    transition: all 0.5s ease;
  }
`;
const WrapDrop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
`;
const OverLay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw
  height: 100vh;
  z-index: 1;
  div {
    position: relative;
    top: 0;
    left: 0;
  }
`;
const Container = styled.div`
  height: 90vh;
  display: flex;
  width: 85vw;
  justify-content: flex-start;
  align-items: flex-start;
  flex-flow: row nowrap;
  overflow: auto;
`;

const Body = styled.div`
  background-color: #3a3e47;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
`;

const CourseInfos = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  gap: 1rem;
  padding: 4vh 2vw;
`;

const InfoWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 0 2vw;
`;

const CourseTitle = styled.div`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  padding-bottom: 0.5rem;
  inline-size: 35vw;
  overflow-wrap: break-word;
`;

const CourseDescription = styled.div`
  color: white;
  font-size: 1.2rem;
  padding-bottom: 1rem;
  inline-size: 35vw;
  overflow-wrap: break-word;
`;

const ARWrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 50px;
  padding-bottom: 20px;
`;

const CourseAttendance = styled.div`
  color: white;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  svg {
    color: #c7ecee;
  }
`;
const CourseRating = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  color: white;
  font-size: 1rem;
  svg {
    color: #f0932b;
  }
`;

const CourseCover = styled.div`
  padding: 0 2vw;
  margin: auto;
  width: 40%;
`;

const BackgroundImage = styled.img``;

const Topic = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  flex-flow: row nowrap;
  height: 90vh;
  gap: 0;
`;

const TopicNav = styled.div`
  position: sticky;
  top: 0;
  position: -webkit-sticky;
  height: 90vh;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px #232931;
`;

const NavTitle = styled.div`
  background-color: #e0e0e0;
  font-size: 1.2rem;
  padding: 0.5vh 0.5vw;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  border-left: 5px solid #3d4450;
  color: #1c1d1f;
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  width: 100%;
`;

const TopicWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  overflow-y: auto;
  overflow-x: hidden;
  right: 0px;
  width: 15vw;
`;

const Title = styled.div`
  position: relative;
  padding: 1.5rem 0.75vw;
  font-weight: 500;
  word-wrap: break-word;
  width: 100%;
  font-size: 1.15rem;
  cursor: pointer;
  transition: 0.471s ease-out;
  border-bottom: 1px solid #3a3e47;
  &:hover {
    background-color: #3a3e47;
    color: white;
    background-position: left;
  }
  &.active {
    background-color: #3a3e47;
    color: white;
  }
`;

const AddTopic = styled.div`
  background-color: #3a3e47;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  svg {
    font-size: 2rem !important;
    color: white;
  }
`;

const Content = styled.div``;