import React, { useState } from "react";
import { Box, Input, Text, useToast, VStack } from "@chakra-ui/react";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signupFun } from "../../redux/auth/action";
import CustomButton from "../../components/Button/CustomButton";


const Signup = () => {

  const [user, setUser] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(signupFun(user, toast, navigate));
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  return (
    <Box>
      <Box py={"10"}>
        <Box className={styles.signupdiv}>
          <Text className={styles.heading}>Register</Text>

          <VStack spacing={"6"} w="75%" m="auto">
            <Input
              type="text"
              name="firstName"
              focusBorderColor="#F9802D"
              placeholder="Enter First Name"
              marginTop="15px"
              fontSize="14px"
              onChange={handleChange}
            />
            <Input
              type="text"
              name="lastName"
              focusBorderColor="#F9802D"
              placeholder=" Enter lastName"
              fontSize="14px"
              onChange={handleChange}
            />

            <Input
              type="text"
              name="email"
              focusBorderColor="#F9802D"
              placeholder="Enter email"
              marginTop="15px"
              fontSize="14px"
              onChange={handleChange}
            />

            <Input
              type="password"
              name="password"
              onKeyDown={handleEnter}
              focusBorderColor="#F9802D"
              placeholder=" Enter password"
              marginTop="15px"
              fontSize="14px"
              onChange={handleChange}
            />
          </VStack>
         <CustomButton onClick={handleSubmit} value="Signup" />

          <Text className={styles.note}>
            <Link to="/auth/login">
              {" "}
              Already have an account{" "}
              <span style={{ color: "#F9802D" }}>Login</span>
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;
