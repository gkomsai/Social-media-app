import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { Box, Button, Input, Text, useToast, VStack } from "@chakra-ui/react";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginFun } from "../../redux/auth/action";

const Login = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginFun(user, toast, navigate));
  };

  return (
    <div>
      <Box ml="2rem" className={styles.birdLogo}>
        <img src={Logo} alt="" />
      </Box>
      <Box py={"10"} h="100vh">
        <Box className={styles.signupdiv}>
          <Text className={styles.heading}>Login</Text>

          <VStack spacing={"6"} w="75%" m="auto">
            <Input
              type="text"
              name="email"
              focusBorderColor="#F9802D"
              placeholder="Enter email"
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
            onClick={handleSubmit}
          >
            Sign In
          </Button>

          <Text className={styles.note}>
            <Link to="/auth/signup">
              {" "}
              Don't have an account{" "}
              <span style={{ color: "#F9802D" }}>Sign up</span>{" "}
            </Link>
          </Text>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
