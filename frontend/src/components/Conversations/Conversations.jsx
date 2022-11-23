import React from "react";
import { Avatar, Box, Text } from "@chakra-ui/react";
import StatusIndicator from "./StatusIndicator";


const Conversation = ({ userData, online }) => {


  return (
    <>
      <Box className="follower conversation">
        <Box>
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
        </Box>
      </Box>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default React.memo(Conversation);
