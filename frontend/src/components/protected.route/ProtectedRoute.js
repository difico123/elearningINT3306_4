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

const ProtectedEnrollCourseRoute = ({ role, children }) => {

  const { id } = useParams();
  const [isLoading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    userCourseService.checkInstructorEnroll(id).then(() => {
      setAuth(false)
      setLoading(false)
    }).catch((err) => {
      setAuth(true)
      setLoading(false)
    })
  },[])
  const renderLoader = (
    <WrapLoader>
    </WrapLoader>
  );
  return isLoading ? renderLoader : (auth ? children : <Navigate to="../" />);
};

const ProtectedCourseRoute = () => {
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
        checkEnroll.current = true;
      })
      .catch((err) => {
        checkEnroll.current = false;
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
      <CourseContent />
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
  ProtectedEnrollCourseRoute
};

const WrapLoader = styled.div`
  height: 90vh;
  width: 100vh;
  > div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;