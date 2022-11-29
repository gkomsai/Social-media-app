import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { notify } from "../../utils/extraFunctions";
import logo from "../../assets/logo.png";
import CustomButton from "../../components/Button/CustomButton";

const Forgotpassword = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/auth/forgotten_password", { email })
      .then((res) => {
        // console.log(res.data.message);
        // alert(res.data.message);
        notify(toast, res.data.message, "success");
      })
      .catch((err) => {
        console.log(err);
        // notify(toast, err.response.data.message, "error");
      });
  };

  return (
    <Box
      h="100vh"
      w={{ base: "90%", md: "80%", lg: "61%", xl: "45%" }}
      m="auto"
    >
      <Image marginTop="80px" src={logo} alt="logo" />

      <Flex
        direction={"column"}
        justifyContent="flex-start"
        gap="8px"
        boxShadow="lg"
        marginTop="10px"
        border="1px solid silver"
        borderRadius="10px"
        p="2rem"
      >
        <Text fontWeight="700" fontSize="18px" marginTop="30px">
          Forgotten Password?
        </Text>

        <Divider width="96%" marginTop="20px" />

        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="flex-start"
          justifyContent={"flex-start"}
          marginTop="25px"
          gap="7%"
        >
          <Text>E-mail</Text>
          <Input
            type="email"
            focusBorderColor="#F9802D"
            w={{ base: "90%", md: "70%", lg: "70%" }}
            color="black"
            backgroundColor="#f8f8f8"
            fontSize="14px"
            height="35px"
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Flex>
        <CustomButton onClick={handleEmailSubmit} value="Submit" />
        <Divider width="96%" marginTop="40px" />

        <Link to="/auth/login">
          <Text
            fontWeight="500"
            color={"#F9802D"}
            fontSize="14px"
            marginTop="20px"
          >
            Return to Login
          </Text>
        </Link>
      </Flex>
    </Box>
  );
};

export default Forgotpassword;
