import React, { useEffect, useState } from "react";
import UserPage from "../pages/UserPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SideBar from '../components/layout/sidebar'
import ProfileForm from "../components/user/ProfileForm";
import EditProfileForm from "../components/user/EditProfileForm";
import EditPwForm from "../components/user/EditPwForm";
import styled from "styled-components";


function UserRouter({ user }) {
  return (
    <React.Fragment>
      <div className="relative">
        <LSideBar />
      </div>

      <Routes>
        <Route path="/profile" element={<ProfileForm user={user}/>}/>
        <Route path="/editprofile" element={<EditProfileForm user={user}/>}/>
        <Route path="/editpw" element={<EditPwForm user={user}/>}/>
      </Routes>
    </React.Fragment>
  );
}
const LSideBar = styled(SideBar)`
  text-align: center;
width: 30px;
  height: 30px;
`
export default UserRouter;
