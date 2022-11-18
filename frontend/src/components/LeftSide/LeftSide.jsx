import { Box, Hide } from "@chakra-ui/react";
import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import ProfileCard from "../ProfileCard/ProfileCard";
import "./Leftside.css";


const Leftside = () => {
  return (
    <Box className="leftside">
      <ProfileCard location="homePage" />
      <Hide below="md">
        <FollowersCard />
      </Hide>
   
    </Box>
  );
};

export default Leftside;
