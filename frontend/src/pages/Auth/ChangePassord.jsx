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
import { useNavigate } from "react-router-dom";
import { notify } from "../../utils/extraFunctions";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import CustomButton from "../../components/Button/CustomButton";

const ChangePassord = () => {
  const navigate = useNavigate();
  const { token } = useSelector((store) => store.AuthReducer);
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
          console.log(err);
          notify(toast, err.response.data.message, "error");
        });
    } else {
      return notify(toast, "All fields are required", "success");
    }
  };

  return (
    <Box h="100vh">
      <Image marginLeft="30%" marginTop="80px" src={logo} alt="logo" />

      <Flex
        direction={"column"}
        gap="8px"
        width="41%"
        boxShadow="lg"
        marginTop="10px"
        marginLeft="30%"
        border="1px solid silver"
        borderRadius="10px"
        paddingLeft="2%"
        paddingBottom="20px"
      >
        <Text fontWeight="700" fontSize="18px" marginTop="30px">
          Change Password
        </Text>

        <Divider width="96%" marginTop="20px" />

        <Box display="flex" alignItems="center" marginTop="25px" gap="7%">
          <Text width={"32"}>New Password</Text>
          <Input
            type="password"
            focusBorderColor="#F9802D"
            width="60%"
            color="black"
            backgroundColor="#f8f8f8"
            fontSize="14px"
            height="35px"
            placeholder="Enter your New Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box display="flex" alignItems="center" marginTop="25px" gap="7%">
          <Text width={"32"}>Confirm Password</Text>
          <Input
            type="password"
            focusBorderColor="#F9802D"
            width="60%"
            color="black"
            backgroundColor="#f8f8f8"
            fontSize="14px"
            height="35px"
            placeholder="confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>
        <CustomButton onClick={handlePasswordSubmit} value={"Update"} />
      </Flex>
    </Box>
  );
};

export default ChangePassord;
