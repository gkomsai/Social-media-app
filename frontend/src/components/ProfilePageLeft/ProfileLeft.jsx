import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import InfoCard from "../InfoCard/InfoCard";

import "../LeftSide/Leftside.css";
import "../FollowersCard/FollowersCard.css";
import { Box, Hide } from "@chakra-ui/react";

const ProfileLeft = () => {
  return (
    <Box className="leftside">
      <InfoCard />
      <Hide below="md">
        <FollowersCard />
      </Hide>
    </Box>
  );
};

export default ProfileLeft;
