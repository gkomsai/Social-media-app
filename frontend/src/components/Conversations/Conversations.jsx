import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../redux/user/action";
import defaultProfile from "../../assets/defaultProfile.png";
import { Box, Image } from "@chakra-ui/react";

const Conversation = ({ singleChatMemberData, currentUser, online }) => {
  const [userData, setUserData] = useState(null);
  // const dispatch = useDispatch();

  const userId = singleChatMemberData?.members.find((id) => id !== currentUser); // finding the 2nd member userId
  // console.log({ userId });

  const getUserData = async () => {
    try {
      getUser(userId).then((res) => {
        setUserData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  return (
    <>
      <Box className="follower conversation">
        <Box>
          {online && <Box className="online-dot"></Box>}
          <Image
            src={
              userData?.profilePicture
                ? userData.profilePicture
                : defaultProfile
            }
            alt="Profile"
            className="followerImage"
            w="52px" h="52px"
            
          />
          <Box className="name" fontSize={".9rem"}>
            <span>
              {userData?.firstName} {userData?.lastName}
            </span>
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </Box>
        </Box>
      </Box>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
