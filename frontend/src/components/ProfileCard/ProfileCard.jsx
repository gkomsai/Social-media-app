import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cover from "../../assets/cover.jpg";
import defaultProfile from "../../assets/defaultProfile.png";
import "./profileCard.css";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((store) => store.AuthReducer);
  // console.log({user});
  const { posts } = useSelector((store) => store.PostReducer);
  if (!user) {
    return <h1>user doesn't exist</h1>;
  }
  return (
    <div className="profileCard">
      <div className="profileImages">
        <img src={user?.coverPicture ? user.coverPicture : cover} alt="" />
        <img
          src={user?.profilePicture ? user.profilePicture : defaultProfile}
          alt=""
        />
      </div>
      <div className="profileName">
        <span>
          {user?.firstName} {user?.lastName}
        </span>
        <span>{user?.worksAt ? user?.worksAt : "Write about yourself"}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user?.followers?.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"> </div>

          <div className="follow">
            <span>{user?.following?.length}</span>
            <span>Following</span>
          </div>

          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts?.filter((post) => post.userId === user?._id).length}
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};
export default ProfileCard;
