import React from "react";
import logo from "../../assets/logo.png";
import { BiSearch } from "react-icons/bi";
import "./searchbar.css";
import { Box, Flex, Image, Input } from "@chakra-ui/react";

const Searchbar = () => {

  
  return (
    <Flex gap=".1rem">
      <Image w="50px" src={logo} alt="" />
      <Box className="Search">
        <Input
          w="150px"
          focusBorderColor="none"
          type="text"
          placeholder="#Explore"
        />
        <Box className="s-icon">
          <BiSearch size="20px" />
        </Box>
      </Box>
    </Flex>
  );
};

export default Searchbar;
