import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserCourses from "../components/course/user/UserCourses";

function InstructorRouter() {

  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<UserCourses />} />
      </Routes>
    </React.Fragment>
  );
}


export default InstructorRouter;