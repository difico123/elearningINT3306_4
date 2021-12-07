import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Course from '../components/course/instructor/Course'
import CourseUser from '../components/course/instructor/CourseUser'
import CreateCourse from "../components/course/instructor/CreateCourse";

function InstructorRouter() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<Course />} />
        <Route exact path="/create" element={<CreateCourse />} />
        <Route exact path="/getuser/:id" element={<CourseUser />} />
      </Routes>
    </React.Fragment>
  );
}

export default InstructorRouter;