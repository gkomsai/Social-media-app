import React, { Suspense } from "react";
import Loading from "../Loading/Loading";
import { Box } from "@chakra-ui/react";
import PostShare from "../PostShare/PostShare";
const Posts = React.lazy(() => import("../Posts/Posts"));


const MiddleSide = () => {
  return (
    <Box>
      <PostShare location={"middleside"} />
      <Suspense
        fallback={
          <div>
            <Loading />
          </div>
        }
      >
        <Posts />
      </Suspense>
    </Box>
  );
};

export default MiddleSide;
