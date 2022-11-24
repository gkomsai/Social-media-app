import { Box } from "@chakra-ui/react";
import React, { Suspense } from "react";
import PostShare from "../PostShare/PostShare";
const Posts = React.lazy(() => import("../Posts/Posts"));
const MiddleSide = () => {
  
  return (
    <Box>
      <PostShare />
      <Suspense fallback={<div>Loading...</div>}>
        <Posts />
      </Suspense>
    </Box>
  );
};

export default MiddleSide;
