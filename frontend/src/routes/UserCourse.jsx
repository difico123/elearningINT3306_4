import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserCourses from "../components/course/student/UserCourses";

function InstructorRouter() {
  const [trigger, setTrigger] = React.useState(false);

  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<UserCourses />} />
      </Routes>
    </React.Fragment>
  );
}

export default InstructorRouter;