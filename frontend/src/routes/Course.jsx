import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Course from "../components/course/Course";
import DummyCourse from "../components/course/user/DummyCourse";

function CourseRouter() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/course/:id" element={<DummyCourse />} />
      </Routes>
    </React.Fragment>
  );
}

export default CourseRouter;