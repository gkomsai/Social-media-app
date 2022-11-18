import { Grid, Hide } from "@chakra-ui/react";
import React from "react";
import Leftside from "../../components/LeftSide/LeftSide";
import MiddleSide from "../../components/MiddleSide/MiddleSide";
import RightSide from "../../components/RightSide/RightSide";

const Home = () => {
  return (
    <>
      <Grid
        p="0rem  1.5rem"
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
