import {
  ProtectedRoute,
  ProtectedInstructorRoute,
} from "./components/protected.route/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Footer from "./components/layout/Footer";
import React, { useState } from "react";
import Header from "./components/layout/Header";
import AuthContext from "./service/authUser";
import AuthSerVice from "./service/authService";
import UserService from "./service/userService";
import Categories from "./components/course/Category";
import UserRouter from "./routes/User";
import AuthRouter from "./routes/Auth";
import CourseRouter from "./routes/Course";
import Course from "./components/course/Course";
import InstructorRouter from "./routes/Instructor";

function App() {
  const [auth, setAuth] = useState(() => {
    let data = UserService.getCurrentUser();
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
    dateAdded: "",
    lastUpdated: "",
    auth: false,
  });

  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function loadApi() {
      await UserService.getUserInfo()
        .then((data) => {
          let { info } = data;
          setUser({ ...info, auth: true });
          setAuth(true);
        })
        .catch((error) => {
          setAuth(false);
        });
      setLoading(false);
    }
    loadApi();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Router>
          <Header user={user} />

          <Routes>
            <Route exact path="/" element={<Categories />} />
            <Route exact path="/category/:id" element={<Course />} />
            <Route path="/category/:id/*" element={<CourseRouter />} />

            {!loading && (
              <Route
                path="/instructorcourses/*"
                element={
                  <ProtectedInstructorRoute role={user.role}>
                    <InstructorRouter />
                  </ProtectedInstructorRoute>
                }
              />
            )}

            <Route
              path="/user/*"
              element={
                <ProtectedRoute auth={auth}>
                  <UserRouter user={user} />
                </ProtectedRoute>
              }
            />
            <Route path="/auth/*" element={<AuthRouter />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

const Routing = ({ user }) => {
  const Auth = React.useContext(AuthContext);
  console.log("aabc", Auth.auth);

  return (
    <Routes>
      {/* <Route path="/recover" element={<ForgotPassword />} />
      <Route path="/tmp" element={<CategoryContent />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/user" element={<UserPage user={user} />}></Route>
      <Route path="/home" element={<Dashboard user={user} />} />
      <Route path="/course/:courseId" element={<FindUsers />} /> */}
    </Routes>
  );
};

const Dashboard = ({ user }) => {
  const [role, setRole] = useState(null);

  const handleLogout = () => {
    AuthSerVice.logout();
    window.location.href = "/login";
  };

  // React.useEffect(() => {
  //   switch (user.role) {
  //     case 1:
  //       setRole("Giáo viên");
  //       break;
  //     case 2:
  //       setRole("Admin");
  //       break;
  //     default:
  //       setRole("Học sinh");
  //   }
  // }, [user]);

  return (
    <div>
      <h1>Hello,{user}</h1>
      <h1>Bạn đang là {role}</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default App;
