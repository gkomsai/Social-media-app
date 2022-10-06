import React from "react";

import cover from "../../assets/cover.jpg";
import profile from "../../assets/profileImg.jpg";
const ProfileCard = () => {
  return (
    <div className="profileCard">
      <div className="profileImages">
        <img src={cover} alt="" />
        <img src={profile} alt="" />
      </div>
    </div>
  );
};

export default ProfileCard;
