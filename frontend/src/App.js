import { ProtectedRoute,ProtectedInstructorRoute,ProtectedUserRoute } from "./components/protected.route/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from "./components/layout/Footer";
import React, { useState } from "react";
import Header from "./components/layout/Header";
import AuthContext from "./service/authUser";
import UserService from "./service/userService";
import Categories from "./components/course/Category"
import UserRouter from "./routes/User";
import AuthRouter from "./routes/Auth";
import CourseRouter from "./routes/Course"
import UserCourseRouter from "./routes/UserCourse"
import InstructorRouter from "./routes/Instructor"

function App() {
  const [auth, setAuth] = useState(() => {
    let data = UserService.getCurrentUser()
    return !data ? false : true;
  });

  const [user, setUser] = useState({
    uuid: "",
    lastName: "",
    firstName: "",
    phoneNumber: "",
    email: "",
    city: "",
    address: "",
    imageUrl: "",
    role: "",
  });

  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    async function loadApi()  {
      await UserService.getUserInfo()
      .then((data) => {
        let { info } = data;
        setUser({ ...info});
        setAuth(true);  
      })
      .catch(() => {
        setAuth(false);
      });
      setLoading(false)
    } 
    loadApi()
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Router> 
          <Header user={user}/>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Categories />
                  <Footer/>
                  </>
              }
            />

            <Route
              path="/category/:id/*"
              element={
                  <CourseRouter user={user} /> 
              }
            />
            
            {!loading && 
            <Route
              path="/instructorcourses/*"
              element={
                <ProtectedInstructorRoute role={user.role}>
                  <InstructorRouter />
                </ProtectedInstructorRoute>
              }
            />}

            {!loading && 
            <Route
              path="/userCourses/*"
              element={
                <ProtectedUserRoute role={user.role}>
                  <UserCourseRouter user={user} />
                </ProtectedUserRoute>
              }
            />}

            {!loading &&
            <Route
              path="/user/*"
              element={
                <ProtectedRoute auth={auth}>
                  <UserRouter user={user}/>
                </ProtectedRoute>
              }
            />}
            
            <Route
              path="/auth/*"
              element={
                <AuthRouter/>
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;