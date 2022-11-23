import { Flex, Hide } from "@chakra-ui/react";
import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import ProfileCard from "../ProfileCard/ProfileCard";

const Leftside = () => {
  return (
    <Flex direction={"column"} gap="2rem" alignItems={"center"} overflow="auto">
      <ProfileCard location="homePage" />
      <Hide below="md">
        <FollowersCard />
      </Hide>
    </Flex>
  );
};

export default Leftside;
