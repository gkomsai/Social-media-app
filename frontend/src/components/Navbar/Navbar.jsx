import React from "react";
import { RiNotification2Fill } from "react-icons/ri";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Box, Grid, Hide, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Searchbar from "../Searchbar/Searchbar";
import { MdPeopleAlt } from "react-icons/md";
const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Grid
      p="1.5rem 2rem"
      w="100%"
      templateColumns={{
        base: "1",
        md: "auto",
        lg: "43vw 50vw",
        xl: "22rem auto 28vw",
      }}
      mb="1rem"
      position={"sticky"}
      alignItems={"center"}
      top="0"
      left="0"
      zIndex={"50"}
      color={colorMode === "light" ? "F97430" : "white"}
      bg={colorMode === "light" ? "white" : "#1A202C"}
    >
      <Hide below="lg">
        <Searchbar />
      </Hide>
      <Hide below="xl">
        <Box></Box>
      </Hide>

      <Box display={"flex"} justifyContent="space-between">
        <Link to="/">
          <AiFillHome color="#F97430" size={"25px"} title="home" />
        </Link>
        <Link to="/users">
          <MdPeopleAlt size={"28px"} />
          </Link>
        <RiNotification2Fill size={"25px"} />
        <Link to="/chats">
          <BsFillChatDotsFill color="#F97430" size={"25px"} title="chats" />
        </Link>
        <Box cursor={"pointer"} onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Box>
      </Box>
    </Grid>
  );
};

export default Navbar;
