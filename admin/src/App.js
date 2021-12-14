import { ProtectedRoute, ProtectedInstructorRoute, ProtectedUserRoute } from "./components/protected.route/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Footer from "./components/layout/Footer";
import React, { useState } from "react";
// import Header from "./components/layout/Header";
import AuthContext from "./service/authUser";
import AuthRouter from "./routes/Auth";

function App() {
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

  const [loading, setLoading] = useState(true)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/auth/*"
              element={
                <AuthRouter />
              }
            />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider >
  );
}

export default App;
