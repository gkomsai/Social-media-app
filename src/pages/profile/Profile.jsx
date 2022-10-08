import React from "react";
import MiddleSide from "../../components/MiddleSide/MiddleSide";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfilePageLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";
import "./profile.css";

const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="profile-centre">
        <ProfileCard />
        <MiddleSide />
      </div>
      <RightSide />
    </div>
  );
};

export default Profile;
