import React, { useState } from "react";
import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import Detail from "./components/Detail";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword";
import { ProtectedRoute } from "./components/protected.route/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AuthContext from "./service/authUser";
import AuthSerVice from "./service/authService";
import UserService from "./service/userService";
import CategoryContent from "./components/auth/CategoryContent";
import FindUsers from "./components/course/findUsers";
import UserRouter from "./routes/User";
import EditPassword from "./components/user/EditPwForm";
import AuthRouter from "./routes/Auth";
import SideBar from './components/layout/sidebar'
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
    dateAdded: "",
    lastUpdated: "",
    auth: false,
  });

  React.useEffect(() => {
    UserService.getUserInfo()
      .then((data) => {
        let { info } = data;
        setUser({ ...info, auth: true });
        setAuth(true);
      })
      .catch((error) => {
        setAuth(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <div className="App">
        <Router> 
          <Header user={user}/>

          <Routes>
            <Route
              path="/user/*"
              element={
                <ProtectedRoute auth={auth}>
                  <UserRouter user={user}/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth/*"
              element={
                <AuthRouter/>
              }
            />
            <Route path="/auth/login" element={ <Login />} />
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute auth={auth}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
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
    AuthSerVice.logout()
    window.location.href ='/login'
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
