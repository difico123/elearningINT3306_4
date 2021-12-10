import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SideBar from "../components/layout/sidebar";
import ProfileForm from "../components/user/ProfileForm";
import EditProfileForm from "../components/user/EditProfileForm";
import EditPwForm from "../components/user/EditPwForm";
import styled from "styled-components";

function UserRouter({ user }) {
  return (
    <Flexin>
      <div className="relative">
        <LSideBar />
      </div>
      <Routes>
        <Route path="/profile" element={<ProfileForm user={user} />} />
        <Route path="/editprofile" element={<EditProfileForm user={user} />} />
        <Route path="/editpw" element={<EditPwForm user={user} />} />
      </Routes>
    </Flexin>
  );
}
const LSideBar = styled(SideBar)``;

const Flexin = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 0;
`;
export default UserRouter;