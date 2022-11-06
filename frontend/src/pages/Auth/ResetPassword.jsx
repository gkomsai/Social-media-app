import {
  Box,
  Button,
  Divider,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { notify } from "../../utils/extraFunctions";
import logo from "../../assets/logo.png";
const ResetPassword = () => {
  const navigate = useNavigate();
  const { id, token } = useParams();
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password && confirmPassword) {
      const payload = { password, confirmPassword };

      axios
        .post(`/auth/reset-password/${id}/${token}`, payload)
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message) {
            notify(toast, res.data.message, "success");
            navigate("/auth/login");
          }
        })
        .catch((err) => {
          console.log(err);
          notify(toast, err.response.data.message, "error");
        });
    }
  };

  return (
    <Box h="100vh">
      <Image marginLeft="30%" marginTop="80px" src={logo} alt="logo" />

      <Box
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
          Reset Password
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
        <Button
          mt={15}
          fontSize="14px"
        
          marginTop="15px"
          color="white"
          bg="var(--buttonBg)"
          padding="5px 35px 5px 35px"
          onClick={handlePasswordSubmit}
        >
          Save Settings
        </Button>

        <Divider width="96%" marginTop="40px" />

        <Link to="/auth/login">
          <Text
            fontWeight="500"
            fontSize="14px"
            color="#F9802D"
            marginTop="20px"
          >
            Return to Login
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default ResetPassword;
