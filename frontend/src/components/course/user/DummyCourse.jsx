import React, { useState } from "react";
import CourseEnroll from "../CourseEnroll";
import CourseContent from "../CourseContent";

function DummyCourse() {
  const [checkEnroll, setCheckEnroll] = useState(false);
  return checkEnroll ? <CourseContent /> : <CourseEnroll />;
}

export default DummyCourse;