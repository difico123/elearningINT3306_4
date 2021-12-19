import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams, Navigate } from "react-router-dom";
import CourseService from "../../../service/courseService";
import QuizService from "../../../service/quizService";
import Loader from "../../common/loader";
import Popup from "../../common/popup";
import Toast from "../../common/toast";
import showToast from "../../../dummydata/toast";
import {MoreVertIcon, SearchIcon , ArrowBackIosIcon, ArrowForwardIosIcon,EditIcon, ClearIcon,Warning } from "../../common/icons";

function ViewStudents() {
  let { id } = useParams();
  const [quizList, setQuizlist] = useState([]);
  const [topics,setTopics] = useState([{
      id: "",
      title: ""
  }])
  const [topicId, setTopicId] = useState(null);
  const [change, setChange] = useState(false);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [toggleAddQuiz, setToggleAddQuiz] = useState(false);
  const [toggleDelQuiz, setToggleDelQuiz] = useState(false);
  const [toggleEditQuiz, setToggleEditQuiz] = useState(false);
  const [quizIdSelection, setQuizIdSelection] = useState(-1);

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
    let quiz = QuizService.getQuizNames(id, topicId,currentPage).then((response) => {
        setQuizlist(response.quizes)
    }).catch((err) => {
        setLoading(false);
    })
    Promise.all([quiz]).then(() => {
        setLoading(false);
    })
  }, [change]);


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

  const handleEditQuizPopup = (e,title, quizId) => {
    e.stopPropagation();
    setToggleEditQuiz(true)
    setTitleString(title)
    setQuizIdSelection(quizId)
  }
  
  const handleDeleteQuizPopup = (e,quizId) => {
    e.stopPropagation();
    setToggleDelQuiz(true);
    setQuizIdSelection(quizId)
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

        <WrapDrop>
          <EditTopicBtn onClick={(e)=> handleEditQuizPopup(e, quiz.title, quiz.id)}></EditTopicBtn>
          <DelTopicBtn onClick={(e)=> handleDeleteQuizPopup(e, quiz.id)}></DelTopicBtn>
        </WrapDrop>
        </Wrap>
      ))
    );

  const pageClick = async (e) => {
    setLoading(true);
    let page = Number(e.target.value);
    setCurrentPage(page);
    setChange(!change)
  };

  const loading = (
    <div className="flex justify-center mt-12">
      {" "}
      <Loader />
    </div>
  );

  const handleToggleAddQuiz = () => {
    setToggleAddQuiz(!toggleAddQuiz);
    setTitleString('');
  };

  const [toastList, setToastList] = useState([]);

  const [titleString, setTitleString] = useState('');
  const handleChangeQuizString = (e) => {
    setTitleString(e.target.value)
  };

  
  const handleAddQuiz = (e) => {
    if(titleString.length < 10) {
      e.target.previousElementSibling.innerHTML = "Tên chủ đề phải ít nhất 10 kí tự"
      setToastList([...toastList, showToast('danger', 'Thông báo!', 'Tên chủ đề phải ít nhất 10 kí tự')]);
    } else {
      e.target.previousElementSibling.innerHTML = ""
      QuizService.createQuiz(id, topicId, {title: titleString}).then((res) => {
        setToastList([...toastList,showToast('success', 'Thông báo!', 'Tạo quiz thành công')]);
        setChange(!change);
      }).catch((err) => {
        console.log(err.response.data);
      })
    }
  };
  const handleEditQuiz = (e) => {
    if(titleString.length < 10) {
      e.target.previousElementSibling.innerHTML = "Tên chủ đề phải ít nhất 10 kí tự"
      setToastList([...toastList, showToast('danger', 'Thông báo!', 'Tên chủ đề phải ít nhất 10 kí tự')]);
      
    } else {
      QuizService.editQuiz(id, topicId, quizIdSelection, {title: titleString}).then((res) => {
        setToastList([...toastList,showToast('success', 'Thông báo!', 'sửa quiz thành công')]);
        setToggleEditQuiz(false);
        setChange(!change);
      }).catch((err) => {
        console.log(err.response.data);
      })
    }
  };

  const handleDeleteQuiz = () => {
    QuizService.delQuiz(id, topicId, quizIdSelection).then((res) => {
      setToastList([...toastList,showToast('success', 'Thông báo!', 'Xoá quiz thành công!')]);
      setToggleDelQuiz(false);
      setChange(!change);
    }).catch((err) => {
      console.log(err.response.data);
    })
  }
  const bodyAddPopup = (
    <div>
      <SearchBar>
        <input type="text" placeholder="Tên quiz..." onChange={handleChangeQuizString} />
        <EditIcon />
      </SearchBar>
    </div>
  );
  const bodyDelPopup = (
    <div>
        Bạn có chắc chắn muốn xoá quiz này không?
    </div>
  );
  const bodyEditPopup = (
    <div>
      <SearchBar>
        <input type="text" placeholder="Tên quiz..." value={titleString} onChange={handleChangeQuizString} />
        <EditIcon />
      </SearchBar>
    </div>
  );

  const footerAddPopup = (
    <div>
      <Wrapper>
        <p className="text-red-400"></p>
        <Btn onClick={handleAddQuiz}>Thêm</Btn>
      </Wrapper>
    </div>
  );
  const footerDelPopup = (
    <DeleteButton onClick={handleDeleteQuiz}>Tôi muốn xóa!</DeleteButton>
  );

  const footerEditPopup = (
    <div>
      <Wrapper>
        <p className="text-red-400"></p>
        <Btn onClick={handleEditQuiz}>Sửa</Btn>
      </Wrapper>
    </div>
  );

  return (
    <Container>
      <Content>
        <Wrapper>
          {selectTopic}
          {topicId&& <button onClick={handleToggleAddQuiz}  title='Chọn topic trước khi thêm'>Thêm quiz mới</button>}
        </Wrapper>
        <Div>
          <div>STT</div>
          <div>Tên quiz</div>
          <div>Trạng thái</div>
          <div>Số câu hỏi</div>
          <div></div>
        </Div>
        {/* {isLoading ? loading : content} */}
        {content}
        
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
        toggle={toggleAddQuiz}
        setToggle={setToggleAddQuiz}
        header={<h2>Thêm quiz mới</h2>}
        body={bodyAddPopup}
        footer={footerAddPopup}
      />
      <Popup
        toggle={toggleDelQuiz}
        setToggle={setToggleDelQuiz}
        header={<HeaderDelPopup><img src={Warning} alt="" /><span>Cảnh báo!</span></HeaderDelPopup>}
        body={bodyDelPopup}
        footer={footerDelPopup}
      />
      <Popup
        toggle={toggleEditQuiz}
        setToggle={setToggleEditQuiz}
        header={<h2>Sửa quiz</h2>}
        body={bodyEditPopup}
        footer={footerEditPopup}
      />
      <Toast toastList={toastList} />
    </Container>
  );
}

export default ViewStudents;

const HeaderDelPopup = styled.div`
  text-align:center;
  img{
    width: 2rem;
    background-color: red;
    border-radius: 5px;
  }
  display: flex;
  justify-content: start;
  gap:1rem;
  align-items: center;
`
const DeleteButton = styled.div`
text-align:center;
bottom: 0.5rem;
background-color: white;
color: black;
font-weight: 600;
padding: 1rem 2rem;
font-size: 15px;
width: 100%;
transition: 0.5s ease 0s;
cursor:pointer;
&:hover {
  color: white;
  background-color: crimson;
}

`
const DelTopicBtn = styled(ClearIcon)`
  position:relative;
  cursor: pointer;
  z-index: 99;
  &:hover {
    color: red;
    background-color: #CAD5E2;
    border-radius: 3px;
    transition: all 0.5s ease;
  }
`
const EditTopicBtn = styled(EditIcon)`
  position:relative;
  z-index: 99;
  cursor: pointer;
  &:hover {
    color: #120E43;
    background-color: #CAD5E2;
    border-radius: 3px;
    transition: all 0.5s ease;
  }
`
const WrapDrop = styled.div`
  position:relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`
const OverLay = styled.div`
  background-color: gray;
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
`
const StatusBtn = styled.button `
color: white;
border-radius: 0.25rem;
padding: 0.25rem;
width: 4rem;
`
const Btn = styled.button `
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  background-color: #22cb5c;
  color: white;
  font-weight: 600;
  padding: 0.5rem 1rem;
&:hover {
  background-color: #6ec72d;
}
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
    font-size: 1rem;
    font-weight: 500;
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