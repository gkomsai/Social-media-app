import { CircularProgress, Container } from "@chakra-ui/react";
import React from "react";


const Loading = () => {
  
  return (
    <Container align="center" maxW={"30%"} m="2rem auto">
      <CircularProgress
        isIndeterminate
        color="green.300"
        value={50}
        size="120px"
      />
    </Container>
  );
};

export default Loading;
