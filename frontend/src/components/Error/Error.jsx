import { Container, Image } from "@chakra-ui/react";
import React from "react";
import error from "../../assets/error.gif"


const Error = () => {
  
  return (
    <Container maxW={"30%"} m="3rem auto">
      <Image src={error} alt="error" />
    </Container>
  );
};

export default Error;
