import { Avatar, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultProfile from "../../assets/defaultProfile.png";
import { followUser, unfollowUser } from "../../redux/user/action";



const User = ({ person }) => {

  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.AuthReducer);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );



  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, toast))
      : dispatch(followUser(person._id, toast));
    setFollowing((prev) => !prev);
  };

  
  return (
    <div className="follower">
      <div>
        <Avatar
          width={"50px"}
          height="50px"
          name={person.firstName + person.lastName}
          src={person.profilePicture ? person.profilePicture : defaultProfile}
          alt="profile"
        />
        <div className="name">
          <span>{person.firstName}</span>
          <span>{person.email}</span>
        </div>
      </div>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
