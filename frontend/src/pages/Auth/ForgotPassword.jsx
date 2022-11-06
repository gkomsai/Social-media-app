import { Box, Button, Divider, Image, Input, Text, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { notify } from "../../utils/extraFunctions";
import logo from "../../assets/logo.png"

const Forgotpassword = () => {
  const toast = useToast();
const [email,setEmail] = useState("");



const handleEmailSubmit =(e) =>{
  e.preventDefault();
axios.post("/auth/forgotten_password",{email}).then((res)=>{
  console.log(res.data.message);
  alert(res.data.message);
  notify(toast, res.data.message, "success",);
}).catch((err)=>{
  console.log(err);
  notify(toast, err.response.data.message, 'error');
})

}


  return (
    <Box h={"100vh"}>
      <Image
        marginLeft="30%"
        marginTop="80px"
        src={logo}
        alt="logo"
      />

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
          Forgotten Password?
        </Text>

        <Divider width="96%" marginTop="20px" />

        <Box display="flex" alignItems="center" marginTop="25px" gap="7%">
          <Text>E-mail</Text>
          <Input
            type="email"
            focusBorderColor="#F9802D"
            width="80%"
            color="black"
            backgroundColor="#f8f8f8"
            fontSize="14px"
            height="35px"
            placeholder="Enter Your Email"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </Box>

        <Button
          fontSize="14px"
          marginTop="15px"
          marginLeft="16.5%"
          color="white"
          bg="var(--buttonBg)"
          padding="5px 35px 5px 35px"
          onClick={handleEmailSubmit}
        >
          Submit
        </Button>

        <Divider width="96%" marginTop="40px" />

        <Link to="/auth/login">
          <Text fontWeight="500"  color={"#F9802D"}  fontSize="14px" marginTop="20px">
            Return to Login
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default Forgotpassword;
