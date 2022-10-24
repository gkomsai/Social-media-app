import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cover from "../../assets/cover.jpg";
import defaultProfile from "../../assets/defaultProfile.png";
import "./profileCard.css";

const ProfileCard = () => {
  const profilePage = false;
  const { user } = useSelector((store) => store.AuthReducer);

  return (
    <div className="profileCard">
      <div className="profileImages">
        <img src={user.coverPicture ? user.coverPicture : cover} alt="" />
        <img src={user.profilePicture ? user.profilePicture : defaultProfile} alt="" />
      </div>
      <div className="profileName">
      <span>{user.firstName} {user.lastName}</span>
        <span>{user.worksAt? user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
          <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"> </div>

          <div className="follow">
          <span>{user.following.length}</span>
            <span>Following</span>
          </div>

          {profilePage && (
            <>
              {" "}
              <div className="vl"></div>
              <div className="follow">
                <span>3</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {profilePage ? "" :  <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>}
    </div>
  );
};
export default ProfileCard;
