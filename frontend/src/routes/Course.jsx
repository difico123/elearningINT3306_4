import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Course from "../components/course/Course";
import CourseContent from "../components/course/CourseContent";

function CourseRouter() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/course/:id" element={<CourseContent />} />
      </Routes>
    </React.Fragment>
  );
}

export default CourseRouter;
