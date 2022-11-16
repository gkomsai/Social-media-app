import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import InfoCard from "../InfoCard/InfoCard";
import Searchbar from "../Searchbar/Searchbar";
import "../LeftSide/Leftside.css";
import "../FollowersCard/FollowersCard.css";
import { Box } from "@chakra-ui/react";

const ProfileLeft = () => {
  return (
    <Box className="leftside">
      <Searchbar />
      <InfoCard />
      <FollowersCard />
    </Box>
  );
};

export default ProfileLeft;
