import React, { Fragment } from "react";
import ProfileForm from "../components/user/ProfileForm";
import EditProfileForm from "../components/user/EditProfileForm";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Profile({ user }) {
  return (
    <Fragment>
      <Wrap>
        <LeftSideBar>
          <div className="flex justify-center mt-6 ">
            <Link to={`/editprofile`}>
              <div>editProfile</div>
            </Link>
            <Link to={`/profile`}>
              <div>profile</div>
            </Link>
          </div>
        </LeftSideBar>

        <ProfileForm user={user} />
        <EditProfileForm user={user} />
      </Wrap>
    </Fragment>
  );
}

const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;
const LeftSideBar = styled.div`
  position: relative;
  grid-column: 1/2;
`;
const ProfileCenter = styled(ProfileForm)`
  grid-column: 2/5;
`;

export default Profile;
