import { Box } from "@chakra-ui/react";
import React from "react";
import Posts from "../Posts/Posts";
import PostShare from "../PostShare/PostShare";

const MiddleSide = () => {
  return <Box>
    <PostShare/>
    <Posts />
  </Box>;
};

export default MiddleSide;
