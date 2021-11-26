import React from "react";
import Header from "./components/universal/Header";
import Homepage from "./components/Homepage";
import Footer from "./components/universal/Footer";
import Detail from "./components/Detail";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import Profile from "./components/Profile";
import CourseContent from "./components/CourseContent";

import {
  ProtectedRoute,
  ProtectedLoginRoute,
  ProtectedCourseRoute,
} from "./components/protected.route/ProtectedRoute";
import cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getTableSortLabelUtilityClass } from "@mui/material";
import AuthApi from "./service/authUser";
import auth from "./service/authService";
import UserService from "./service/userService";
import CategoryContent from "./components/auth/CategoryContent";
import CloneCategoryCourses from "./components/CloneCategoryCourses";

function App() {
  const [auth, setAuth] = React.useState(false);
  const [user, setUser] = React.useState({
    lastName: "",
    firstName: "",
    phoneNumber: "",
    city: "",
    address: "",
    role: "",
  });

  const getUser = () => {
    UserService.getUserInfo().then((res) => {
      let { error, info } = res.data;
      let success = !error;
      setAuth(success);
      setUser({ ...info });
    });
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <div className="App">
        <Router>
          <Header />
          <Routing user={user} />
          <Footer />
        </Router>
      </div>
    </AuthApi.Provider>
  );
}

const Routing = ({ user }) => {
  const Auth = React.useContext(AuthApi);
  return (
    <Routes>
      <Route path="/category/:id" element={<CloneCategoryCourses />} />
      <Route path="/recover" element={<ForgotPassword />} />
      <Route path="/tmp" element={<CategoryContent />} />
      <Route path="/" element={<Homepage />} />
      <Route
        path="/login"
        element={
          <ProtectedLoginRoute auth={Auth.auth}>
            <Login />
          </ProtectedLoginRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedLoginRoute auth={Auth.auth}>
            <Signup />
          </ProtectedLoginRoute>
        }
      />

      <Route
        path="/courses/clone/web-dev/:id"
        element={
          <ProtectedRoute auth={Auth.auth}>
            <CourseContent />
          </ProtectedRoute>
        }
      />
      <Route />

      <Route
        path="/home"
        element={
          <ProtectedRoute auth={Auth.auth}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route />

      <Route path="/profile" element={<Profile user={user} />} />
      <Route />
    </Routes>
  );
};

const Dashboard = () => {
  let Auth = React.useContext(AuthApi);
  const handleLogout = () => {
    cookies.remove("user");
    auth.logout().then((res) => {
      console.log(res.data);
    });
    Auth.setAuth(false);
  };

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default App;
