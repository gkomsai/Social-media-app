import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import InfoCard from "../InfoCard/InfoCard";

import "../FollowersCard/FollowersCard.css";
import { Flex, Hide } from "@chakra-ui/react";

const ProfileLeft = () => {
  return (
    <Flex
      className="leftside"
      direction={"column"}
      gap="2rem"
      alignItems={"center"}
      position={{ base: "static", md: "sticky" }}
      top="7rem"
      height={"calc(100vh - 7rem)"}
      overflowY="scroll"
    >
      <InfoCard />
      <Hide below="md">
        <FollowersCard />
      </Hide>
    </Flex>
  );
};

export default ProfileLeft;
