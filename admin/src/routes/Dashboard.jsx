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
  return (
    <Container>
      <Flexin>
        <LeftSide>
          <Sidebar user={user} />
        </LeftSide>
        <RightSide>
          <Routes>
            <Route path="/all" element={<ViewAll />} />
            <Route path="/users" element={<ViewUsers />} />
            <Route path="/courses" element={<ViewCourses />} />
          </Routes>
        </RightSide>
      </Flexin>
    </Container>
  )
}

const Flexin = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 0;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 97vh;
  border-radius: 5px;
  background-color: white;
  overflow-x: hidden;
  padding-right:1rem;

`;
const LeftSide = styled.div`
  position:relative;
  flex: 1.5;
  width: 15vw;
  height: 90vh;
`;
const RightSide = styled.div`
  position: relative;
  flex: 8.5;
  width: 85vw;
  background-color: white;
`;

export default Dashboard
