import React,{useState} from "react";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
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
import UserService from "./service/userService";
import CategoryContent from "./components/auth/CategoryContent";
import FindUsers from "./components/course/findUsers";

function App() {
  const [auth, setAuth] = React.useState(false);
  const [user, setUser] = React.useState({
    lastName: "",
    firstName: "",
    phoneNumber: "",
    city: "",
    address: "",
    role: "",
    imageUrl: ""
  });

  const getUser = () => {
    UserService.getUserInfo().then((res) => {
      let { error, info } = res.data;
      let success = !error;
      setAuth(success);
      setUser({ ...info });
      console.log(info)
    });
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <div className="App">
        <Router>
          <Header user={user}/>
          <Routing user={user} />
          <Footer />
        </Router>
      </div>
    </AuthApi.Provider>
  );
}

const Routing = ({ user }) => {
  console.log('bb',user)
  const Auth = React.useContext(AuthApi);
  return (
    <Routes>
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
        path="/home"
        element={
          <ProtectedRoute auth={Auth.auth} >
            <Dashboard user={user} />
          </ProtectedRoute>
        }
      />
      <Route />

      <Route path="/course/:courseId"
        element={
            <FindUsers />
        }
      />
      <Route />

      <Route path="/profile" element={<Profile user={user} />} />
      <Route />
    </Routes>
  );
};

const Dashboard = ({user}) => {
const [role,setRole] = useState(null)
  let Auth = React.useContext(AuthApi);
  const handleLogout = () => {
    cookies.remove("user");
    auth.logout().then((res) => {
      console.log(res.data);
    });
    Auth.setAuth(false);
  };

  React.useEffect(() => {
    switch (user.role) {
      case 1: setRole("Giáo viên"); break;
      case 2: setRole("Admin"); break;
      default: setRole("Học sinh")
    }
  }, [user]);
  return (
    <div>
      <h1>Hello,{user.lastName}</h1>
      <h1>Bạn đang là {role}</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default App;
