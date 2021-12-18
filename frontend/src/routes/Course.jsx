import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Course from "../components/course/Course";
import {ProtectedCourseRoute, ProtectedEnrollCourseRoute} from "../components/protected.route/ProtectedRoute";
import Footer from "../components/layout/Footer";
function CourseRouter({user}) {
  
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<Course />} />
        <Route exact path="/course/:id" element={
          <ProtectedCourseRoute user={user}/>
        } />
      </Routes>
      <Footer/>
    </React.Fragment>
  );
}

export default CourseRouter;