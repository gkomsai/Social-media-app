import { Flex, Grid, Hide, Show } from "@chakra-ui/react";
import React from "react";
import MiddleSide from "../../components/MiddleSide/MiddleSide";
import NavIcons from "../../components/NavIcons/Navicons";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import ProfileLeft from "../../components/ProfilePageLeft/ProfileLeft";
import RightSide from "../../components/RightSide/RightSide";

const Profile = () => {
  return (
    <>
      <Show w="80%" m="auto" below="xl">
        <NavIcons />
      </Show>

      <Grid
        templateColumns={{
          base: "1",
          md: "45vw 50vw",
          lg: "35vw 50vw",
          xl: "22rem auto 24rem",
        }}
        position={"relative"}
        gap={6}
        justifyContent={{
          base: "center",
          md: "space-evenly",
          lg: "space-around",
        }}
        mt={{ base: "2.5rem", xl: "0px" }}
      >
        <ProfileLeft />
        <Flex direction={"column"} gap="4rem">
          <ProfileCard location="profilePage" />
          <MiddleSide />
        </Flex>
        <Hide below="xl">
          <RightSide />
        </Hide>
      </Grid>
    </>
  );
};

export default Profile;
