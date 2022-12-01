import React from "react";
import { BsFillChatDotsFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Hide,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import Searchbar from "../Searchbar/Searchbar";
import { MdPeopleAlt } from "react-icons/md";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { logoutFun } from "../../redux/auth/action";
import { notify } from "../../utils/extraFunctions";
import { CgDanger } from "react-icons/cg";
import { deleteUser } from "../../redux/user/action";
import CustomButton from "../Button/CustomButton";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.AuthReducer,shallowEqual);

  const handleLogOut = () => {
    dispatch(logoutFun());
    notify(toast, "Logout Successfully", "success");
  };

  const handleDeleteAccount = () => {
    dispatch(deleteUser(user._id, token, toast));
    return;
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
          <MdPeopleAlt size={"28px"} title="Users" />
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
            <MenuItem onClick={() => navigate(`/profile/${user._id}`)}>
              Profile
            </MenuItem>
            <MenuItem onClick={() => navigate(`/changePassord/${user._id}`)}>
              Change Password
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
            <MenuDivider />

            <MenuItem onClick={onOpen}> Delete Your Account </MenuItem>
            <Modal  isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <Flex alignItems={"center"} gap="5px">
                    <CgDanger color="red" />
                    <Text as="span"> Alert!</Text>
                  </Flex>{" "}
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                  <VStack align={"flex-start"} spacing={4}>
                    <Text fontWeight={"bold"} fontSize="18px">
                      Hey {user?.firstName}, we’re sorry to see you go
                    </Text>
                    <Text>
                      Just a quick reminder, Deleting your account means you’ll
                      lose all of your Data like your followers, posts and
                      everything
                    </Text>
                    <Text fontWeight={"bold"}>
                      Still want to delete, then click on Delete Button
                    </Text>
                  </VStack>
                </ModalBody>

                <ModalFooter>
                  <CustomButton
                    onClick={() => {
                      handleDeleteAccount();
                      onClose();
                    }}
                    bg="red"
                    value="Delete"
                  />
                </ModalFooter>
              </ModalContent>
            </Modal>

            <MenuItem>
              <Text as="span" color={"red"}>
                {" "}
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>

        <Box cursor={"pointer"} onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Box>
      </Box>
    </Grid>
  );
};

export default React.memo(Navbar);
