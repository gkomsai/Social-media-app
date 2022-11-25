import { Flex, Hide } from "@chakra-ui/react";
import React, { Suspense } from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
const FollowersCard = React.lazy(() =>
  import("../FollowersCard/FollowersCard")
);
const Leftside = () => {
  return (
    <Flex direction={"column"} gap="2rem" alignItems={"center"} overflow="auto">
      <ProfileCard location="homePage" />
      <Suspense fallback={<div>Loading...</div>}>
        <Hide below="md">
          <FollowersCard />
        </Hide>
      </Suspense>
    </Flex>
  );
};

export default Leftside;
