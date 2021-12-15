import React, { useEffect } from 'react'
import Sidebar from "../components/layout/Sidebar.jsx"
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ViewUsers from "../components/dashboard/ViewUsers"
import ViewAll from "../components/dashboard/ViewAll"
import ViewCourses from "../components/dashboard/ViewCourses"

function Dashboard({ user }) {

  useEffect(() => {

  }, [user])
  console.log(user)
  return (
    <Flexin>
      <LeftSide>
        <Sidebar user={user} />
      </LeftSide>
      <RightSide>
        <Routes>
          <Route path="/all" element={<ViewAll />} />
          <Route exact path="/users" element={<ViewUsers />} />
          <Route path="/courses" element={<ViewCourses />} />
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
