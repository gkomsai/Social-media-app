import React from "react";
import { UilSetting } from "@iconscout/react-unicons";
import { GrNotification } from "react-icons/gr";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const NavIcons = () => {
  return (
    <Box className="navIcons">
      <Link to="/">
        <AiFillHome color="#F97430" size={'25px'} title="home"/>
      </Link>
      <UilSetting />
      <GrNotification size={'25px'}  />
      <Link to="/chats">
        <BsFillChatDotsFill color="#F97430" size={'25px'} title="chats"/>
      </Link>
    </Box>
  );
};

export default NavIcons;
