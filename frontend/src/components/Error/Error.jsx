import React from "react";
import { Box, Button, Center, Heading, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <Center>
        <Box mt={"4rem"}>
          <Image
            width="55rem"
            src="https://st.depositphotos.com/1020482/3088/i/950/depositphotos_30884685-stock-photo-404-error-page-not-found.jpg"
            alt=""
          />
        </Box>
      </Center>
      <Heading color="red">Sorry, Page not found</Heading>
      <br />
      <Button onClick={() => navigate("/")}>
        Go Back To HOME
      </Button>
    </>
  );
};

export default Error;
