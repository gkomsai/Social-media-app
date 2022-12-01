import React from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import StatusIndicator from "./StatusIndicator";


const ChatUsersList = ({ userData, online }) => {


  return (
    <>
        <Flex className="singleChatUser">
          {online && (
            <Box className="online-Indicator">
              <StatusIndicator />{" "}
            </Box>
          )}
          <Avatar
            width={"50px"}
            height="50px"
            name={userData?.firstName}
            src={userData?.profilePicture}
            alt="profile"
          />

          <Box ml="1rem" className="ChatUserNameBox" fontSize={".9rem"}>
            <Text fontWeight={"bold"}>
              {userData?.firstName} {userData?.lastName}
            </Text>
            <Text color={online ? "#51e200" : ""}>
              {online ? "Online" : "Offline"}
            </Text>
          </Box>
        </Flex>
     
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default React.memo(ChatUsersList);
