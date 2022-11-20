import { Avatar, Box,  useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat, findAllchatingUser } from "../../redux/chats/action";
import { followUser, unfollowUser } from "../../redux/user/action";
import CustomButton from "../Button/CustomButton";
import "./User.css";

const User = ({ person, location }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.AuthReducer);
  const { token } = useSelector((state) => state.AuthReducer);
  const { chatUsers } = useSelector((store) => store.ChatReducer);
  console.log("chatUsers triggered",chatUsers)

  const [alreadyCreatedChat, setAlreadyCreatedChat] = useState(null);
  // console.log({alreadyCreatedChat})
  const [following, setFollowing] = useState(person?.followers.includes(user._id));

  useEffect(() => {
   setAlreadyCreatedChat(chatUsers?.some((el) => el.members.includes(person._id)))
  }, [chatUsers.length])
 

  useEffect(() => {
    if (chatUsers.length === 0 && location === "usersPage") {
      dispatch(findAllchatingUser(user._id,token,toast))
    }
  }, [chatUsers.length])

  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, token, toast, user._id))
      : dispatch(followUser(person._id, token, toast, user._id));
    setFollowing((prev) => !prev);
  };

  const handleChatRequest = () => {
    if (!alreadyCreatedChat) {
      const payload = {
        senderId: user._id,
        receiverId: person._id,
      };
      dispatch(createNewChat(payload, token, toast));
      setAlreadyCreatedChat((prev) => !prev);
    } else {
      return;
    }
  };

  return (
    <Box className={location === "usersPage" ? "userPage" : "follower"}>
      <Box>
        <Avatar
          width={"50px"}
          height="50px"
          name={person?.firstName}
          src={person?.profilePicture}
          alt="profile"
        />
        <Box className="name">
          <span>{person?.firstName}</span>
          <span>{person?.email}</span>
        </Box>
      </Box>
      <CustomButton
        onClick={handleFollow}
        marginTop="0px"
        w="110px"
        className={following ? "alreadyfollowing" : "notfollowing"}
        value={following ? "Unfollow" : "Follow"}
      />

      {location === "usersPage" && (
        <CustomButton
          onClick={handleChatRequest}
          marginTop="0px"
          w="110px"
          className={alreadyCreatedChat ? "alreadyfollowing" : "notfollowing"}
          value={alreadyCreatedChat ? "Chat Created" : "Create Chat"}
        />
      )}
    </Box>
  );
};

export default User;
