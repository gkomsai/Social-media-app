import { Avatar, Box, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findAllchatingUser } from "../../redux/chats/action";
import { followUser, unfollowUser } from "../../redux/user/action";
import "./User.css"


const User = ({ person, location }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.AuthReducer);
  const { token } = useSelector((state) => state.AuthReducer);
  const { chatUsers } = useSelector((store) => store.ChatReducer);
// console.log(chatUsers)

  const [alreadyCreatedChat, setAlreadyCreatedChat] = useState(chatUsers?.some(el=>el.members.includes(person._id)));
  // console.log({alreadyCreatedChat})
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  
// useEffect(() => {
//   if (chatUsers.length === 0) {
//     dispatch(findAllchatingUser(user._id,token,toast))
//   }

// }, [chatUsers.length])




  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id,token, toast))
      : dispatch(followUser(person._id, token, toast));
    setFollowing((prev) => !prev);
  };

  const handleChatRequest = () => {
    following
      ? dispatch(unfollowUser(person._id,token, toast))
      : dispatch(followUser(person._id, token, toast));
    setFollowing((prev) => !prev);
  };

  
  return (
    <Box className={location==="usersPage"?"userFollwer":"follower" } >
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
      {location==="usersPage"&& ( <button
        className={
          alreadyCreatedChat ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleChatRequest}
      >
        {alreadyCreatedChat ? "Chat Created" : "Create Chat"}
      </button>) }
    </Box>
  );
};

export default User;
