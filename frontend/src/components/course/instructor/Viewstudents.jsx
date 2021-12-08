import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams, Navigate } from "react-router-dom";
import CourseService from "../../../service/courseService";
import Loader from "../../common/loader";
import { MoreVertIcon, SearchIcon } from "../../common/icons";
import Popup from "../../common/popup";

function ViewStudents() {

    let { id } = useParams();

    const [getUsers, setUsers] = useState([
        {
            studentName: '',
            marks: '',
            email: '',
            phoneNumber: '',
            address: ''
        },
    ]);
    const [change, setChange] = useState(false);

    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setLoading] = useState(true);

    const [toggleSearch, setToggleSearch] = useState(false);


    useEffect(() => {
        CourseService.getCourseUsers(id, page).then((response) => {
            setUsers(response.users);
            setLoading(false)
        });
    }, [change]);


    const content = getUsers.length == 0 ? <p className='text-center mt-1'>Không có học viên nào</p> : getUsers.map((course, index) => (
        <Wrap key={index}>
            <div>{index + 1}</div>
            <div>{course.studentName}</div>
            <div>{course.email}</div>
            <div>{course.phoneNumber}</div>
            <div>{course.address}</div>
            <div>{course.marks}</div>
            <div className="dropdown">
                <MoreVertIcon />
                <span className="dropdown-content">
                    <button>Kick</button>
                </span>
            </div>
        </Wrap>
    ))

    const pageClick = async (e) => {
        let page = Number(e.target.value)
        setCurrentPage(page);
        CourseService.getCourseUsers(id, page).then((response) => {
            setUsers(response.users);
        });
    }


    const loading = <div className="flex justify-center mt-12"> <Loader/></div>

    const handleToggleSearch = () => {
        setToggleSearch(!toggleSearch);
    }

    const [studentList, setStudentList] = useState([{
        id: null,
        email: "",
        fullName: ""
    }]);

    const handleSearchStudent = async (e) => {
        await CourseService.findUsers(id,e.target.value).then((users) => {
            setStudentList(users.students)
        })
    }

    console.log(studentList.length === 0);

    const bodyPopup = <div>
        <SearchBar>
            <input type="text" placeholder="Tìm kiếm học sinh..." onChange={handleSearchStudent}/>
            <CustomSearch />
        </SearchBar>
        <UserList>
            {studentList.length === 0?  "Không có học sinh" : studentList.map((student, index) => (<Student key={index}>{student.email}</Student>))}
        </UserList>
    </div>

    const footerPopup = <div>
        <Wrapper>
            <button>Thêm</button>
        </Wrapper>
    </div>

    return (
        <Container>
            <Content>
                <Wrapper>
                    <button onClick={handleToggleSearch}>Thêm học sinh mới</button>
                </Wrapper>
               
                <Div>
                    <div>STT</div>
                    <div>Tên học viên </div>
                    <div>Email liên lạc</div>
                    <div>Số điện thoại</div>
                    <div>Địa chỉ hiện tại</div>
                    <div>Điểm</div>
                    <div></div>
                </Div>
                {isLoading? loading : content}

                <Page>
                    <button className={currentPage === page ? "bg-blue-300" : ""} value={page} onClick={pageClick}>{page}</button>
                    <button className={currentPage === page + 1 ? "bg-blue-300" : ""} value={page + 1} onClick={pageClick}>{page + 1}</button>
                    <button className={currentPage === page + 2 ? "bg-blue-300" : ""} value={page + 2} onClick={pageClick}>{page + 2}</button>
                    <button className={currentPage === page + 3 ? "bg-blue-300" : ""} value={page + 3} onClick={pageClick}>{page + 3}</button>
                    <button className={currentPage === page + 4 ? "bg-blue-300" : ""} value={page + 4} onClick={pageClick}>{page + 4}</button>
                </Page>
            </Content>
            <Popup toggle={toggleSearch} setToggle={setToggleSearch} header={<h2>Thêm học sinh mới</h2>} body={bodyPopup}  footer={footerPopup}/>
        </Container>
    );
}


export default ViewStudents;
const Wrapper = styled.div`
    margin: 1rem;
  
    button {
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
        background-color: #22CB5C;
        color:white;
        font-weight: 600;
        padding: 0.5rem 1rem;
    }

    button:hover{
        background-color: #6EC72D;
    }
`

const Container = styled.div`
  height: 90vh;
  width: 85vw;
  overflow: auto;
`;


const Content = styled.div`
    position: relative;
    height: 90vh;
    width: 100%;
    padding: 30px;
    background: skyblue;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    border: solid;
    margin-top: -2px;
`

const Div = styled.div`
    display: flex; 
    flex-nowrap: wrap;
    background: white;
    border: solid;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    div{
        padding: 1rem;
    }
    div:nth-child(1) {
        width: 5%;
    }
    div:nth-child(2) {
        width: 15%;
    }
    div:nth-child(3) {
        width: 15%;
    }
    div:nth-child(4) {
        width: 15%;
    }
    div:nth-child(5) {
        width: 30%;
    }
    div:nth-child(6) {
        width: 10%;
    }
`

const Wrap = styled.div`
    display: flex; 
    flex-nowrap: wrap;
    background: white;
    border-bottom: solid;
    border-left: solid;
    border-right: solid;
    div{
        padding: 1rem;
    }
    div:nth-child(1) {
        width: 5%;
    }
    div:nth-child(2) {
        width: 15%;
    }
    div:nth-child(3) {
        width: 15%;
    }
    div:nth-child(4) {
        width: 15%;
    }
    div:nth-child(5) {
        width: 30%;
    }
    div:nth-child(6) {
        width: 10%;
    }
    div:nth-child(7) {
        width: 10%;
    }
    .dropdown {
        position: relative;
        display: inline-block;
    }
      
    .dropdown-content {
        position: absolute;
        top: 50%;
        text-align: center;
        padding: 0.5rem;
        background-color: red;
        color: white;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        border-radius: 5px;
        z-index: 0;
    }

`

const Page = styled.div`
    display: flex;
    position: absolute;
    bottom: 10px;
    margin: 4rem 0;
    left: calc(50% - 53px);
    button {
        width: 40px;
        padding: 10px;
        background: white;
        border-radius: 3px;
        border: solid 0.5px;
        margin: 1px;
    }
    & button:hover {
        background: #7fffd4;
      }
      div svg {
        cursor: pointer;
      }
      div svg:active {
        background-color: lightblue;
      }
`
const Headers = styled.div`
    display: flex;
    justify-content: space-between;
    height: 45px;
`

const SearchBar = styled.div`
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
  svg{
      right: 0;
  }
`;
const UserList = styled.div`
  height: 20rem;
  width: 100%;

`
const Student = styled.div`
  margin: 1rem 0;
`


const CustomSearch = styled(SearchIcon)``;