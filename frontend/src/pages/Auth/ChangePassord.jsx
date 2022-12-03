import {
  Box,
  Divider,
  Flex,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/extraFunctions";
import logo from "../../assets/logo.png";
import { shallowEqual, useSelector } from "react-redux";
import CustomButton from "../../components/Button/CustomButton";

const ChangePassord = () => {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.AuthReducer, shallowEqual);
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password && confirmPassword) {
      const payload = { password, confirmPassword };

      axios
        .post(`/auth/change-password`, payload, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.message) {
            notify(toast, res.data.message, "success");
            navigate("/");
          }
        })
        .catch((err) => {
          notify(toast, err.response.data.message, "error");
        });
    } else {
      return notify(toast, "All fields are required", "success");
    }
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
          Change Password
        </Text>

        <Divider width="96%" marginTop="20px" />

        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="flex-start"
          justifyContent={"flex-start"}
          marginTop="25px"
          gap="7%"
        >
          <Text width={"32"}>New Password</Text>
          <Input
            type="password"
            focusBorderColor="#F9802D"
            w={{ base: "90%", md: "70%", lg: "70%" }}
            color="black"
            backgroundColor="#f8f8f8"
            fontSize="14px"
            height="35px"
            placeholder="Enter your New Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="flex-start"
          justifyContent={"flex-start"}
          marginTop="25px"
          gap="7%"
        >
          <Text width={"32"}>Confirm Password</Text>
          <Input
            type="password"
            focusBorderColor="#F9802D"
            w={{ base: "90%", md: "80%", lg: "60%" }}
            color="black"
            backgroundColor="#f8f8f8"
            fontSize="14px"
            height="35px"
            placeholder="confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Flex>
        <CustomButton onClick={handlePasswordSubmit} value={"Update"} />
      </Flex>
    </Box>
  );
};

export default ChangePassord;
