import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import AdminService from '../../service/AdminService'

function ViewCourses() {
    const [getCourses, setCourses] = useState([
        {
            name: '',
            instructorName: ''
        },
    ]);
    const [change, setChange] = useState(false);

    // const [page, setPage] = useState(1);
    // const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        (async () => {
            await AdminService.getCourseList(1).then((response) => {
                setCourses(response.courses);
            });
        })()
    }, [change]);

    console.log('abc', getCourses)
    const content = getCourses.length == 0 ? <p className='text-center mt-1'>Không có khóa học nào</p> : getCourses.map((courses, index) => (
        <Wrap key={index}>
            <div>{index + 1}</div>
            <div>{courses.name}</div>
            <div>{courses.instructorName}</div>
            <div></div>
        </Wrap>
    ))

    return (
        <>
            <Div>
                <div>STT</div>
                <div>Tên khóa học </div>
                <div>Tên giảng viên </div>
                <div></div>
            </Div>
            {content}
        </>
    )

}

export default ViewCourses;

const Div = styled.div`
    display: flex; 
    flex-nowrap: wrap;
    background: white;
    border: solid;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    div{
        padding: 1rem;
        font-weight: 700;
    }
    div:nth-child(1) {
        width: 10%;
    }
    div:nth-child(2) {
        width: 50%;
    }
    div:nth-child(3) {
        width: 30%;
    }
    div:nth-child(3) {
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
        width: 10%;
    }
    div:nth-child(2) {
        width: 50%;
        
    }
    div:nth-child(3) {
        width: 30%;
    }
    div:nth-child(3) {
        width: 10%;
    }
    
`
