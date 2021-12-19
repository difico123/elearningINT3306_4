import { ProtectedRoute, ProtectedInstructorRoute, ProtectedUserRoute } from "./components/protected.route/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AuthContext from "./service/authUser";
import AuthRouter from "./routes/Auth";
import DashBoard from "./routes/Dashboard.jsx";
import AdminService from './service/AdminService'

function App() {
  const [user, setUser] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      await AdminService.getAdmin().then(user => {
        setUser({ ...user })
        setLoading(false)
      }).catch(error => {
        setLoading(false)
      });
    })()
  }, [])
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Router>
          <Routes>

            {!isLoading && <Route
              path="/*"
              element={
                <ProtectedRoute auth={user ? true : false}>
                  <DashBoard user={user} />
                </ProtectedRoute>
              }
            />}

            <Route
              path="/admin/*"
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
