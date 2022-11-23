import React, { useEffect } from "react";
import "./FollowersCard.css";
import User from "../User/User";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/user/action";
import { Box, Text, useToast } from "@chakra-ui/react";

const FollowersCard = ({ location }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { user,allUser } = useSelector((store) => store.AuthReducer, shallowEqual);





  useEffect(() => {
    if (allUser.length === 0) {
      dispatch(getAllUser(toast));
    }
  }, [allUser.length]);

  return (
    <Box className="FollowersCard">
      <Text fontWeight={"bold"}>Who is folllowing you</Text>
      {allUser?.map((el) => (
        <Box key={el._id}>
          {el._id !== user._id ? <User location={location} person={el} /> : ""}
        </Box>
      ))}
    </Box>
  );
};

export default FollowersCard;
