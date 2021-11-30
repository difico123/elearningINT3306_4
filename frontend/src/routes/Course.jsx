import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DummyCourse from "../components/course/DummyCourse";

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
