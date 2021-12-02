import React, { useState } from "react";
import CourseEnroll from "./User/CourseEnroll";
import CourseContent from "./CourseContent";

function DummyCourse() {
  const [checkEnroll, setCheckEnroll] = useState(true);
  return checkEnroll ? <CourseContent /> : <CourseEnroll />;
}

export default DummyCourse;
