import React, { useState } from "react";

import Logo from "../../assets/logo.png";

import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";

import styles from "./Auth.module.css";

import { Link } from "react-router-dom";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
      </div>
      <Box py={"10"}>
        <Box className={styles.signupdiv}>
          <Text className={styles.heading}>
            {isSignUp ? "Register" : "Login"}
          </Text>

          <VStack spacing={"6"} w="75%" m="auto">
            {isSignUp && (
              <>
                {" "}
                <Input
                  type="text"
                  name="firstName"
                  focusBorderColor="#F9802D"
                  placeholder="Enter First Name"
                  marginTop="15px"
                  fontWeight="lighter"
                  fontSize="14px"
                  onChange={handleChange}
                />
                <Input
                  type="text"
                  name="lastName"
                  focusBorderColor="#F9802D"
                  placeholder=" Enter lastName"
                  fontWeight="lighter"
                  fontSize="14px"
                  onChange={handleChange}
                />
              </>
            )}
            <Input
              type="text"
              name="username"
              focusBorderColor="#F9802D"
              placeholder="Enter username"
              marginTop="15px"
              fontWeight="lighter"
              fontSize="14px"
              onChange={handleChange}
            />

            <Input
              type="password"
              name="password"
              focusBorderColor="#F9802D"
              placeholder=" Enter password"
              marginTop="15px"
              fontWeight="lighter"
              fontSize="14px"
              onChange={handleChange}
            />
          </VStack>
          <Button
            backgroundColor="#F9802D"
            marginTop="40px"
            padding="25px 35px 25px 35px"
            borderRadius="25px"
            fontSize="15px"
            color="white"
            fontWeight="700"
            _hover={{ backgroundColor: "#25cf60" }}
          >
            {isSignUp ? " Sign up" : "Sign In"}
          </Button>

          <Text onClick={() => setIsSignUp(!isSignUp)} className={styles.note}>
            {isSignUp ? (
              <Link to="/auth/login">
                {" "}
                Already have an account{" "}
                <span style={{ color: "#F9802D" }}>Login</span>
              </Link>
            ) : (
              <Link to="/auth/signup">
                {" "}
                Don't have an account{" "}
                <span style={{ color: "#F9802D" }}>Sign up</span>{" "}
              </Link>
            )}
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default Auth;
