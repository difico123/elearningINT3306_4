import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserCourses from "../components/course/user/UserCourses";
import CourseDetails from "../components/course/user/CourseDetails";
import styled from "styled-components";

function InstructorRouter({user}) {

  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<UserCourses />} />
        <Route exact path="/:id" element={<CourseWrap><CourseDetails user={user} /></CourseWrap>} />
      </Routes>
    </React.Fragment>
  );
}
const CourseWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
`

export default InstructorRouter;