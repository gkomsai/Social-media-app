import { Grid, Hide, Show } from "@chakra-ui/react";
import React from "react";
import Leftside from "../../components/LeftSide/LeftSide";
import MiddleSide from "../../components/MiddleSide/MiddleSide";
import NavIcons from "../../components/NavIcons/Navicons";
import RightSide from "../../components/RightSide/RightSide";

const Home = () => {
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
        <Leftside />
        <MiddleSide />
        <Hide below="xl">
          <RightSide />
        </Hide>
      </Grid>
    </>
  );
};

export default Home;
