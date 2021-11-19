import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Detail from "./components/Detail";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import Profile from "./components/Profile";
import {
  ProtectedRoute,
  ProtectedLoginRoute,
} from "./components/protected.route/ProtectedRoute";
import cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { getTableSortLabelUtilityClass } from "@mui/material";
import AuthApi from "./service/authUser";
import auth from "./service/authService";
import user from "./service/userService";

function App() {
  const [auth, setAuth] = React.useState(false);

  const getUser = () => {
    user.getUserInfo().then((res) => {
      let { error, info } = res.data;
      let success = !error;
      console.log(info);
      setAuth(success);
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
          <Routing />
          <Footer />
        </Router>
      </div>
    </AuthApi.Provider>
  );
}

const Routing = () => {
  const Auth = React.useContext(AuthApi);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
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
        path="/home"
        element={
          <ProtectedRoute auth={Auth.auth}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
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
