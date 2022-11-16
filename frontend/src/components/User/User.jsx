import { Avatar, Box, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/user/action";



const User = ({ person }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.AuthReducer);
  const { token } = useSelector((state) => state.AuthReducer);

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );



  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id,token, toast))
      : dispatch(followUser(person._id, token, toast));
    setFollowing((prev) => !prev);
  };

  
  return (
    <Box className="follower">
      <Box>
        <Avatar
          width={"50px"}
          height="50px"
          name={person?.firstName}
          src={ person?.profilePicture }
          alt="profile"
        />
        <Box className="name">
          <span>{person?.firstName}</span>
          <span>{person?.email}</span>
        </Box>
      </Box>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </Box>
  );
};

export default User;
