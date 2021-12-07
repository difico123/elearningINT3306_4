import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import data from "../../../dummydata/courseuser.json";
import { Link, useParams, Navigate } from "react-router-dom";
import CourseService from "../../../service/courseService";
import Loader from "../../common/loader";
import { MoreVertIcon, SearchIcon } from "../../common/icons";

function CourseList() {

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

    useEffect(() => {
        CourseService.getCourseUser(id, page).then((response) => {
            setUsers(response.users);
            console.log(response.users)
        });

    }, [change]);


    const content = getUsers.length == 0 ? <p className='text-center mt-1'>Không có học viên nào</p> : getUsers.map((course, index) => (
        <Wrap key={index}>
            <div className="STT">{index + 1}</div>
            <div>{course.studentName}</div>
            <div>{course.email}</div>
            <div>{course.phoneNumber}</div>
            <div>{course.address}</div>
            <div className="mark">{course.marks}</div>
            <div className="dropdown">
                <MoreVertIcon />
                <div className="dropdown-content">
                    <button>Kick</button>
                </div>
            </div>
        </Wrap>
    ))

    const pageClick = async (e) => {
        let page = Number(e.target.value)
        setCurrentPage(page);
        CourseService.getCourseUser(id, page).then((response) => {
            setUsers(response.users);
        });
    }

    return (
        <Container>
            <Headers>
                <Title>Danh sách học viên</Title>
                <SearchBar>
                    <input
                        type="text"
                        placeholder="Tìm kiếm học viên..."
                    />
                    <button type="submit">
                        <CustomSearch />
                    </button>
                </SearchBar>
            </Headers>
            <Content>
                <Div>
                    <div className="STT">STT</div>
                    <div>Tên học viên </div>
                    <div>Địa chỉ liên lạc</div>
                    <div>Số điện thoại</div>
                    <div>Địa chỉ hiện tại</div>
                    <div>Điểm</div>
                    <div className="dropdown"></div>
                </Div>
                {content}
                <Page>
                    <button className={currentPage === page ? "bg-blue-300" : ""} value={page} onClick={pageClick}>{page}</button>
                    <button className={currentPage === page + 1 ? "bg-blue-300" : ""} value={page + 1} onClick={pageClick}>{page + 1}</button>
                    <button className={currentPage === page + 2 ? "bg-blue-300" : ""} value={page + 2} onClick={pageClick}>{page + 2}</button>
                    <button className={currentPage === page + 3 ? "bg-blue-300" : ""} value={page + 3} onClick={pageClick}>{page + 3}</button>
                    <button className={currentPage === page + 4 ? "bg-blue-300" : ""} value={page + 4} onClick={pageClick}>{page + 4}</button>
                </Page>
            </Content>
        </Container>
    );
}

export default CourseList;

const Container = styled.div`
  padding: 5vh 5vw;
  min-height: calc(100vh - 425px);
`;

const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
  background: skyblue;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border-top: solid;
  border-left: solid;
  border-right: solid;
  padding: 10px 10px 30px 10px;
  margin-bottom: 10px;
`;


const Content = styled.div`
    position: relative;
    width: 100%;
    height: 750px;
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
    div {
        margin-top: 10px;
        width: 325px;
        height: 40px;
    }
    div.STT {
        width: 200px;
        text-align: center;
    }
    .dropdown {
        width: 100px;
    }
`

const Wrap = styled.div`
    display: flex; 
    flex-nowrap: wrap;
    background: white;
    border-bottom: solid;
    border-left: solid;
    border-right: solid;
    div {
        width: 325px;
        height: 30px;
    }
    div.STT {
        width: 200px;
        text-align: center;
    }
    div.mark {
        font-size: 15px;
    }
    button {
        margin-left: 2rem;
    }
    .dropdown {
        width: 100px;
        position: relative;
        display: inline-block;
    }
      
    .dropdown-content {
        width:150px;
        height:30px;
        display: none;
        position: absolute;
        background-color: lightyellow;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        border-radius: 5px;
        z-index: 1;
    }
      
    .dropdown:hover .dropdown-content {
        display: block;
    }
`

const Page = styled.div`
    display: flex;
    position: absolute;
    bottom: 10px;
    left: calc(50% - 53px);
    button {
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 3px;
        border: solid 0.5px;
        margin: 1px;
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
  width: 50vw;
  height: 40px;
  border: 2px solid black;
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

const CustomSearch = styled(SearchIcon)``;