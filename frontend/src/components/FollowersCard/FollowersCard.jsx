import React, { useEffect, useMemo } from "react";
import "./FollowersCard.css";
import User from "../User/User";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/user/action";
import { Box, Text, useToast } from "@chakra-ui/react";
import { findAllchatingUser } from "../../redux/chats/action";

const FollowersCard = ({ location }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  let { user,allUser,token } = useSelector((store) => store.AuthReducer, shallowEqual);

  const { chatUsers } = useSelector((store) => store.ChatReducer, shallowEqual);

  useEffect(() => {
    if (chatUsers.length === 0 && location === "usersPage") {
      dispatch(findAllchatingUser(user._id,token,toast))
    }
  }, [chatUsers.length, location, user._id])


  useEffect(() => {
    if (allUser.length === 0) {
      dispatch(getAllUser(toast));
    }
  }, [allUser.length]);

  if (allUser.length>0) {
    allUser = allUser.filter((el) => el._id !== user._id);
  }

  return (
    <Box className="FollowersCard">
      <Text fontWeight={"bold"}>Who is folllowing you</Text>
      {allUser?.map((el) => (
        <Box key={el._id}>
          <User chatUsers={chatUsers}  location={location} person={el} />
        </Box>
      ))}
    </Box>
  );
};

export default React.memo(FollowersCard);
