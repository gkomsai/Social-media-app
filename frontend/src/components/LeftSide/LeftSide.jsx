import { Box } from "@chakra-ui/react";
import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./Leftside.css";


const Leftside = () => {
  return (
    <Box className="leftside">
      <ProfileCard location="homePage" />
      <FollowersCard />
    </Box>
  );
};

export default Leftside;
