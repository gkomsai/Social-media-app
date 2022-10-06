import React from "react";
import cover from "../../assets/cover.jpg";
import profile from "../../assets/profileImg.jpg";
import "./profileCard.css";
// import "../LeftSide/LeftSide.css";

const ProfileCard = () => {
  return (
    <div className="profileCard">
      <div className="profileImages">
        <img src={cover} alt="" />
        <img src={profile} alt="" />
      </div>
      <div className="profileName">
        <span>Diya</span>
        <span>senior UI UX Designer</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>6,890</span>
            <span>Followers</span>
          </div>
          <div className="vl"> </div>
          <div className="follow">
            <span>2,084</span>
            <span>Following</span>
          </div>

          <div className="vl"></div>
          <div className="follow">
            <span>1,436</span>
            <span>Posts</span>
          </div>
        </div>
        <hr />
      </div>

      <span>My Profile</span>
    </div>
  );
};
export default ProfileCard;
