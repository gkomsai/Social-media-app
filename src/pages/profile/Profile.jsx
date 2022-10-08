import React from "react";
import MiddleSide from "../../components/MiddleSide/MiddleSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfilePageLeft/ProfileLeft";
import "./profile.css";

const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="profile-centre">
        <ProfileCard/>
        <MiddleSide/>
      </div>
    </div>
  );
};

export default Profile;
