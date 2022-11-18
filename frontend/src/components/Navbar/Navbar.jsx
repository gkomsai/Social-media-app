import React from "react";
import { RiNotification2Fill } from "react-icons/ri";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Hide,
  HStack,
  IconButton,
  Text,
  useColorMode,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import Searchbar from "../Searchbar/Searchbar";
import { MdPeopleAlt, MdManageAccounts } from "react-icons/md";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutFun } from "../../redux/auth/action";
import { notify } from "../../utils/extraFunctions";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.AuthReducer);

  const handleLogOut = () => {
    dispatch(logoutFun());
    notify(toast, "Logout Successfully", "success");
  };



  return (
    <Grid
      p="1.5rem 2rem"
      w="100%"
      templateColumns={{
        base: "1",
        md: "auto",
        lg: "43vw 50vw",
        xl: "22rem auto 28vw",
      }}
      mb="1rem"
      position={"sticky"}
      alignItems={"center"}
      top="0"
      left="0"
      zIndex={"50"}
      color={colorMode === "light" ? "F97430" : "white"}
      bg={colorMode === "light" ? "white" : "#1A202C"}
    >
      <Hide below="lg">
        <Searchbar />
      </Hide>
      <Hide below="xl">
        <Box></Box>
      </Hide>

      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
      >
        <Link to="/">
          <AiFillHome color="#F97430" size={"25px"} title="home" />
        </Link>
        <Link to="/users">
          <MdPeopleAlt size={"28px"} />
        </Link>
        <Link to="/chats">
          <BsFillChatDotsFill color="#F97430" size={"25px"} title="chats" />
        </Link>

        <Menu>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: "none" }}
          >
            <HStack>
              <Avatar
                size={"sm"}
                name={user?.firstName}
                src={user?.profilePicture}
                alt="profile"
              />

              <Box display={{ base: "none", md: "flex" }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue("white", "gray.900")}
            borderColor={useColorModeValue("gray.200", "gray.700")}
          >
            <MenuItem>Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </MenuList>
        </Menu>

        <Box cursor={"pointer"} onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Box>
      </Box>
    </Grid>
  );
};

export default Navbar;
