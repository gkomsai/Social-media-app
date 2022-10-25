import React, { useState } from "react";
import { useSelector, } from "react-redux";
import defaultProfile from "../../assets/defaultProfile.png";
const User = ({ person }) => {

    const { user } = useSelector((state) => state.AuthReducer);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  return (
    <div className="follower">
      <div>
        <img
          src={person.profilePicture ? person.profilePicture : defaultProfile}
          alt="profile"
          className="followerImage"
        />
        <div className="name">
          <span>{person.firstName}</span>
          <span>{person.lastName}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
