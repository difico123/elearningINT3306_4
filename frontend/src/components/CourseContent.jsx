import React from "react";
import styled from "styled-components";
import { useParams } from "react-router";

function CourseContent() {
  const { id } = useParams();
  console.log(id);
  return <div>abc</div>;
}

export default CourseContent;
