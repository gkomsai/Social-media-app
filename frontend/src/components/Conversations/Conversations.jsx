import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../redux/user/action";
import { Avatar, Box, Text } from "@chakra-ui/react";
import StatusIndicator from "./StatusIndicator";
import { useCallback } from "react";

const Conversation = ({ singleChatMemberData, currentUser, online }) => {
  const [userData, setUserData] = useState(null);

  const userId = singleChatMemberData?.members.find((id) => id !== currentUser); // finding the 2nd member userId

  const getUserData = useCallback(() => {
    getUser(userId)
      .then((res) => {
        // console.log("getuser triggered inside conversation")
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    if (singleChatMemberData) {
      getUserData();
    }
  }, [userId]);

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
