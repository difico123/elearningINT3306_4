import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Course from '../components/course/instructor/Course'
import EditCourse from '../components/course/instructor/EditCourse'

function InstructorRouter() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<Course/>} />
        <Route exact path="/create" element={<div>create</div>} />
        <Route exact path="/edit/:id" element={<EditCourse/>} />
      </Routes>
    </React.Fragment>
  );
}

export default InstructorRouter;