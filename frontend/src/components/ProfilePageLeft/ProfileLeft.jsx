import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import InfoCard from "../InfoCard/InfoCard";

import "../FollowersCard/FollowersCard.css";
import { Flex, Hide } from "@chakra-ui/react";

const ProfileLeft = () => {
  return (
    <Flex direction={"column"} gap="2rem" alignItems={"center"} overflow="auto">
      <InfoCard />
      <Hide below="md">
        <FollowersCard />
      </Hide>
    </Flex>
  );
};

export default ProfileLeft;
