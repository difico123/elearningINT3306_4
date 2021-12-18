import React, { useState, useEffect, useRef } from "react";
import { Navigate, useParams } from "react-router-dom";
import CourseEnroll from "../course/CourseEnroll";
import CourseContent from "../course/CourseContent";
import userCourseService from "../../service/userCourseService";
import Loader from "../common/loader";
import styled from "styled-components";

const ProtectedRoute = ({ auth, children }) => {
  return auth ? children : <Navigate to="/auth/login" />;
};

const ProtectedInstructorRoute = ({ role, children }) => {
  return role === 1 ? children : <Navigate to="/" />;
};

const ProtectedUserRoute = ({ role, children }) => {
  return role === 0 ? children : <Navigate to="/" />;
};


const ProtectedCourseRoute = ({user}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const checkCourseEntry = useRef(false);
  const checkEnroll = useRef(false);

  useEffect(() => {
    let checkCourse = userCourseService
      .checkCourse(id)
      .then(() => {
        checkCourseEntry.current = true;
      })
      .catch((err) => {
        checkCourseEntry.current = false;
      });

    let checkErrorCourse = userCourseService
      .checkEnrollCourse(id)
      .then(() => {
        checkEnroll.current = 200;
      })
      .catch((err) => {
        checkEnroll.current = err.response.status;
      });

    Promise.all([checkCourse, checkErrorCourse]).then(() => {
      setLoading(false);
    });
  }, []);

  const renderLoader = (
    <WrapLoader>
      <Loader />
    </WrapLoader>
  );

  const loaded =
    checkCourseEntry.current && !loading ? (
      <CourseContent user={user}/>
    ) : (
      <CourseEnroll checkEnroll={checkEnroll.current} />
    );
  return loading ? renderLoader : loaded;
};

export {
  ProtectedRoute,
  ProtectedInstructorRoute,
  ProtectedUserRoute,
  ProtectedCourseRoute,
};

const WrapLoader = styled.div`
  width: 99vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;