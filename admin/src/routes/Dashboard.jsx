import React,{useEffect} from 'react'
import Sidebar from "../components/layout/Sidebar.jsx"
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ViewStudents from "../components/dashboard/ViewStudents"
import ViewInstructor from "../components/dashboard/ViewInstructor"
import ViewCourses from "../components/dashboard/ViewCourses"

function Dashboard({user}) {

  useEffect(() => {
  
  },[user])
  console.log(user)
    return (
        <Flexin>
          <LeftSide>
          <Sidebar user={user} />
        </LeftSide>
        <RightSide>
            <Routes>
            <Route exact path="/students" element={<ViewStudents/>} />
            <Route path="/instructors" element={<ViewInstructor/>} />
            <Route path="/courses" element={<ViewCourses/>} />
            </Routes>
        </RightSide>
      </Flexin>
    )
}

const Flexin = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 0;
  height:100vh;
`;
const LeftSide = styled.div`
  position:relative;
  flex:1;
  width: 15vw;
`;
const RightSide = styled.div`
  position:relative;
  flex:8;
  border:1px solid black;
  width: 85vw;
`;

export default Dashboard
