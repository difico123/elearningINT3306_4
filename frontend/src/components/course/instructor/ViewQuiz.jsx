import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams, Navigate } from "react-router-dom";
import CourseService from "../../../service/courseService";
import QuizService from "../../../service/quizService";
import Loader from "../../common/loader";
import { MoreVertIcon, SearchIcon } from "../../common/icons";
import Popup from "../../common/popup";
import Toast from "../../common/toast";
import showToast from "../../../dummydata/toast";
import { ArrowBackIosIcon, ArrowForwardIosIcon } from "../../common/icons";
import dummyquizlist from "../../../dummydata/dummyquizlist.json";
import dummy from "../../../dummydata/dummy.json";

function ViewStudents() {
  let { id } = useParams();
  const [quizList, setQuizlist] = useState([]);
  const [topics,setTopics] = useState([{
      id: "",
      title: ""
  }])
  const [topicId, setTopicId] = useState(-1);
  const [change, setChange] = useState(false);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);


  const chooseTopic = topics.map((v, index) => (
    <option value={v.id} key={index}>
      {v.title}
    </option>
  ));

  const handleSelectTopic = (e) => {
    setTopicId(e.target.value)
    setChange(!change)
  }

  const selectTopic = (
    <Dropdown onChange={handleSelectTopic}>
      <option disabled selected={true} defaultValue={null}>
        Chọn topic
      </option>
      {chooseTopic}
    </Dropdown>
  );

    useEffect(() => {
        CourseService.getTopicNames(id).then((response) => {
        setTopics(response.topics);
    })
    },[])

  useEffect(() => {
      
    setLoading(true);
    let quiz = QuizService.getQuizNames(id, topicId).then((response) => {
        setQuizlist(response.quizes)
    }).catch((err) => {
        setLoading(false);
    })
    Promise.all([quiz]).then(() => {
        setLoading(false);
    })
  }, [change]);

  
  const handleDropDown = (e) => {
    let dropdown = e.target.nextElementSibling;
    if (dropdown) {
      if (dropdown.style.display === "none") {
        dropdown.style.display = "inline";
      } else {
        dropdown.style.display = "none";
      }
    } else {
      return;
    }
  };

  const handleKick = (e, userId) => {
    CourseService.kickUser(id, userId)
      .then(() => {
        setToastList([
          showToast("success", "Thông báo", "Bạn đã đuổi học sinh này!"),
        ]);
        setChange(!change);
        if (e.target.parentElement) {
          e.target.parentElement.style.display = "none";
        }
      })
      .catch(() => {
        setToastList([
          showToast("danger", "Thông báo", "Bạn chưa đuổi học sinh này!"),
        ]);
      });
  };

  const handleShowQuiz = (quizId) => {
    QuizService.activeQuiz(id,topicId, quizId).then(() => {
        setToastList([showToast("success", "Thông báo", "Active Quiz!"),...toastList]) 
        setChange(!change);
    }).catch((err) => {
        console.log(err.response)
    })
  }
  const handleHideQuiz = (quizId) => {
    QuizService.hideQuiz(id,topicId, quizId).then(() => {
        setToastList([showToast("success", "Thông báo", "Hide Quiz!"),...toastList]) 
        setChange(!change);
    }).catch((err) => {
        console.log(err.response)
    })
  }

  const content =
    quizList.length === 0 ? (
      <p className="text-center mt-1">Không có quiz nào</p>
    ) : (
        quizList.map((quiz, index) => (
        <Wrap key={index}>
          <div>{6 * (currentPage - 1) + (index + 1)}</div>
          <div>{quiz.title}</div>
          <div>{quiz.shown === 1 ? <StatusBtn className="bg-green-500" onClick={() =>{handleHideQuiz(quiz.id); quiz.shown = 0} }>Hiện</StatusBtn> :
           <StatusBtn className="bg-gray-500" onClick={() => handleShowQuiz(quiz.id)}>Ẩn</StatusBtn>}</div>
          <div>{quiz.total}</div>
          <div className="dropdown">
            <MoreVertIcon onClick={handleDropDown} />
            <span className="dropdown-content">
              <button>Xóa</button>
              <button>Chỉnh sửa</button>
            </span>
          </div>
        </Wrap>
      ))
    );

  const pageClick = async (e) => {
    setLoading(true);
    let page = Number(e.target.value);
    setCurrentPage(page);
    CourseService.getCourseUsers(id, page).then((response) => {
      setQuizlist(response.users);
      setLoading(false);
    });
  };

  const loading = (
    <div className="flex justify-center mt-12">
      {" "}
      <Loader />
    </div>
  );

  const handleToggleSearch = () => {
    setToggleSearch(!toggleSearch);
  };

  const [selectedUser, setSelectedUser] = useState("");
  const [toastList, setToastList] = useState([]);

  const handleAddSelectedUser = (e) => {
    if (!selectedUser) {
      e.target.previousElementSibling.innerHTML = "Bạn chưa chọn học sinh";
    } else {
      CourseService.inviteStudent(id, selectedUser)
        .then(() => {
          setToastList([
            showToast("success", "Thông báo", "Bạn đã thêm quiz mới!"),
          ]);
          setToggleSearch(false);
          setChange(!change);
        })
        .catch(() => {
          setToastList([
            showToast(
              "danger",
              "Thông báo",
              "Bạn chưa thêm được học sinh mới!"
            ),
          ]);
        });
    }
  };

  const bodyPopup = (
    <div>
      <SearchBar>
        <input type="text" placeholder="Tên quiz..." />
        <CustomSearch />
      </SearchBar>
      <UserList>
        {quizList.length === 0
          ? "Không có học sinh"
          : quizList.map((student, index) => (
              <Student
                key={index}
                className={student.id === selectedUser ? "bg-green-400" : ""}
                onClick={() => {
                  setSelectedUser(student.id);
                }}
              >
                {student.email}
              </Student>
            ))}
      </UserList>
    </div>
  );

  const footerPopup = (
    <div>
      <Wrapper>
        <p className="text-red-400"></p>
        <button onClick={handleAddSelectedUser}>Thêm</button>
      </Wrapper>
    </div>
  );

  return (
    <Container>
      <Content>
        <Wrapper>
          {selectTopic}
          <button onClick={handleToggleSearch}>Thêm quiz mới</button>
        </Wrapper>

        <Div>
          <div>STT</div>
          <div>Tên quiz</div>
          <div>Trạng thái</div>
          <div>Số câu hỏi</div>
          <div></div>
        </Div>
        {isLoading ? loading : content}

        <Page>
          <ArrowBackIosIcon
            className="page"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          />
          <button
            className={currentPage === page ? "bg-blue-300" : ""}
            value={page}
            onClick={pageClick}
          >
            {page}
          </button>
          <button
            className={currentPage === page + 1 ? "bg-blue-300" : ""}
            value={page + 1}
            onClick={pageClick}
          >
            {page + 1}
          </button>
          <button
            className={currentPage === page + 2 ? "bg-blue-300" : ""}
            value={page + 2}
            onClick={pageClick}
          >
            {page + 2}
          </button>
          <button
            className={currentPage === page + 3 ? "bg-blue-300" : ""}
            value={page + 3}
            onClick={pageClick}
          >
            {page + 3}
          </button>
          <button
            className={currentPage === page + 4 ? "bg-blue-300" : ""}
            value={page + 4}
            onClick={pageClick}
          >
            {page + 4}
          </button>
          <ArrowForwardIosIcon
            className="page"
            onClick={() => {
              setPage(page + 1);
            }}
          />
        </Page>
      </Content>
      <Popup
        toggle={toggleSearch}
        setToggle={setToggleSearch}
        header={<h2>Thêm quiz mới</h2>}
        body={bodyPopup}
        footer={footerPopup}
      />
      <Toast toastList={toastList} />
    </Container>
  );
}

export default ViewStudents;
const StatusBtn = styled.button `
color: white;
border-radius: 0.25rem;
padding: 0.25rem;
width: 4rem;
`
const Wrapper = styled.div`
  margin: 2vh 0;
  button {
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
      rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
    background-color: #22cb5c;
    color: white;
    font-weight: 600;
    padding: 0.5rem 1rem;
  }
  button:hover {
    background-color: #6ec72d;
  }
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const Container = styled.div`
  z-index: 0;
  height: 90vh;
  width: 85vw;
  overflow: auto;
`;

const Content = styled.div`
  position: relative;
  height: 90vh;
  width: 100%;
  padding: 30px;
  background: transparent;
  margin-top: -2px;
`;

const FullScreen = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Div = styled.div`
  display: flex;
  flex-nowrap: wrap;
  background: white;
  border: solid;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  div {
    padding: 1rem;
    font-weight: 700;
  }
  div:nth-child(1) {
    width: 5%;
  }
  div:nth-child(2) {
    width: 70%;
  }
  div:nth-child(3) {
    text-align: center;
    width: 10%;
  }
  div:nth-child(4) {
    text-align: center;
    width: 10%;
  }
  div:nth-child(5) {
    width: 5%;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-flow: row nowrap;
  background: white;
  border-bottom: solid;
  border-left: solid;
  border-right: solid;
  div {
    padding: 1rem;
  }
  div:nth-child(1) {
    width: 5%;
  }
  div:nth-child(2) {
    width: 75%;
  }
  div:nth-child(3) {
    text-align: center;
    width: 10%;
  }
  div:nth-child(4) {
    text-align: center;
    width: 10%;
  }
  div:nth-child(5) {
    width: 5%;
  }
  .dropdown {
    position: relative;
    display: inline-block;
    svg {
      cursor: pointer;
    }
  }
  .dropdown-content {
    position: absolute;
    display: none;
    top: 50%;
    text-align: center;
    padding: 1rem;
    background-color: red;
    color: white;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    z-index: 0;
  }
`;

const Page = styled.div`
  display: flex;
  position: absolute;
  bottom: 10px;
  margin: 4rem 0;
  left: calc(50% - 53px);
  button {
    width: 40px;
    text-align: center;
    margin: 0.1rem;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
  }
  & button:hover {
    background: #7fffd4;
  }
  .page {
    margin-top: 0.9rem;
    cursor: pointer;
  }
  .page:active {
    background-color: lightblue;
  }
`;

const Headers = styled.div`
  display: flex;
  justify-content: space-between;
  height: 45px;
`;

const SearchBar = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 500px;
  border: 2px solid black;
  cursor: pointer;
  padding: 8px 0.5rem;
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
  svg {
    right: 0;
  }
`;
const UserList = styled.div`
  height: 15rem;
  width: 100%;
  margin-top: 1rem;
`;

const Student = styled.div`
  padding: 0.7rem 0.5rem;
  cursor: pointer;
  font-weight: 500;
`;

const CustomSearch = styled(SearchIcon)``;

const Dropdown = styled.select`
  cursor: pointer;
  padding: 0.45rem 1vw 0.35rem 1vw;
  height: 45px;
  width: 25%;
  autocomplete: off;
  background-image: none;
  font-size: 18px;
  font-weight: lighter;
  background-color: #f9f9f9;
  outline: none;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  option {
    cursor: pointer;
  }
`;