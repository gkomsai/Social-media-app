import { Avatar, Box, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createNewChat} from "../../redux/chats/action";
import { followUser, unfollowUser } from "../../redux/user/action";
import { truncate } from "../../utils/extraFunctions";
import CustomButton from "../Button/CustomButton";
import "./User.css";

const User = ({ person, location,chatUsers }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user,token } = useSelector((state) => state.AuthReducer,shallowEqual);

  const [alreadyCreatedChat, setAlreadyCreatedChat] = useState(null);
  const [following, setFollowing] = useState(person?.followers.includes(user._id));
 


  useEffect(() => {
    let isCancelled = false
    if (chatUsers.length > 0 && !isCancelled) {
      setAlreadyCreatedChat(chatUsers?.some((el) => el.members.includes(person._id)))
    }
    return () => {
      isCancelled = true;
    }
  }, [chatUsers, person._id]);


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
          <Text
              fontWeight={"bold"}
              _hover={{ color: "green", textDecoration: "underline" }}
            >
              {person.firstName}  {person.lastName}
            </Text>
            <Text fontSize={"12px"} >{truncate(person.workStatus, 25)  }</Text>
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

export default React.memo(User);
