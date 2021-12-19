import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import Course from "../components/course/instructor/Course";
import CourseInfos from "../components/course/instructor/CourseInfos";
import CreateCourse from "../components/course/instructor/CreateCourse";
import EditCourse from "../components/course/instructor/EditCourse";
import CreateTopic from "../components/course/instructor/CreateTopic";
import ViewStudents from "../components/course/instructor/Viewstudents";
import CreateQuestion from "../components/course/instructor/CreateQuestion";
import LeftNav from "../components/course/instructor/LeftNav";
import courseService from "../service/courseService";
import Loader from "../components/common/loader";
import ViewQuiz from "../components/course/instructor/ViewQuiz";

function InstructorRouter() {
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/" element={<Course />} />
        <Route exact path="/create" element={<CreateCourse />} />
        <Route exact path="/:id/*" element={<CourseRouter />} />
      </Routes>
    </React.Fragment>
  );
}

function CourseRouter() {
  let { id } = useParams();
  const [course, setCourse] = useState({});
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    courseService.getInstructorCourseDetails(id).then((response) => {
      setCourse(response.course);
      setTopics(response.topics);
      setIsLoading(false);
    });
  }, []);

  const loading = (
    <Mid>
      <Loader />
    </Mid>
  );

  return (
    <React.Fragment>
      {!isLoading ? (
        <Flexin>
          <div className="relative">
            <Routes>
              <Route
                exact
                path="/infos"
                element={
                  <CourseInfos courseParam={course} topicsParam={topics} />
                }
              />
              )
              <Route
                exact
                path="/edit"
                element={<EditCourse courseParam={course} />}
              />
              <Route exact path="/students" element={<ViewStudents />} />
              <Route exact path="/createTopic" element={<CreateTopic />} />
              <Route
                exact
                path="/createquestion"
                element={<CreateQuestion />}
              />
              <Route exact path="/viewquiz" element={<ViewQuiz />} />
            </Routes>
          </div>
          <div className="relative">
            <LeftNav />
          </div>
        </Flexin>
      ) : (
        loading
      )}
    </React.Fragment>
  );
}

const Flexin = styled.div`
  display: flex;
  flex-flow: row nowrap;
  flex-direction: row-reverse;
  gap: 0;
  overflow: hidden;
  width: 100vw;
`;

const Mid = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default InstructorRouter;