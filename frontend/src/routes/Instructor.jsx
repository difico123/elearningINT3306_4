import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import Course from "../components/course/instructor/Course";
import CourseInfos from "../components/course/instructor/CourseInfos";
import CreateCourse from "../components/course/instructor/CreateCourse";
import EditCourse from "../components/course/instructor/EditCourse";
import CreateTopic from "../components/course/instructor/CreateTopic";
import ViewStudents from "../components/course/instructor/Viewstudents";
import LeftNav from "../components/course/instructor/LeftNav";

function InstructorRouter() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<Course />} />
        <Route exact path="/create" element={<CreateCourse />} />
        <Route exact path="/:id/*" element={<CourseRouter />} />
      </Routes>
    </React.Fragment>
  );
}

function CourseRouter() {
  return (
    <Flexin>

      <div className="relative">
        <Routes>
          <Route exact path="/infos" element={<CourseInfos />} />
          <Route exact path="/edit" element={<EditCourse />} />
          <Route exact path="/students" element={<ViewStudents />} />
          <Route exact path="/createTopic" element={<CreateTopic />} />
        </Routes>
      </div>
      <div className="relative">
        <LeftNav />
      </div>
    </Flexin>
  );
}

export default InstructorRouter;

const Flexin = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex-direction: row-reverse;
  gap: 0;
  overflow: hidden;
`;