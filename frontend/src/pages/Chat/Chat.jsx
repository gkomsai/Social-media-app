import React, { useRef, useState } from "react";
import "./Chat.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Conversation from "../../components/Conversations/Conversations";
import { useEffect } from "react";
import { findAllchatingUser } from "../../redux/chats/action";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { Box, Text, useToast } from "@chakra-ui/react";
import { useCallback } from "react";
import { getAllUser } from "../../redux/user/action";

const Chat = () => {

  const socket = useRef(); // creating the socket globally
  const dispatch = useDispatch();
  const toast = useToast();

  const [currentChatUser, setCurrentChatUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const { user, allUser, token } = useSelector(
    (store) => store.AuthReducer,
    shallowEqual
  );
  const { chatUsers } = useSelector((store) => store.ChatReducer, shallowEqual);
 
  let location = "chatPage";

  let arr = allUser.filter((elem) =>
    chatUsers.some((el) => el.members.includes(elem._id))
  );
  let finalChatUserData = arr.filter((el) => el._id !== user._id);
  // console.log({ finalChatUserData });



  useEffect(() => {
    if (allUser.length === 0 && location==="chatPage") {
      dispatch(getAllUser(toast));
    }
  }, [allUser.length]);

  const findChatUser = useCallback(() => {
    if (chatUsers.length === 0 && location==="chatPage") {
      // console.log("All ChatingUser inside the Chat page triggered")
      dispatch(findAllchatingUser(user._id, token, toast));
    }
  }, [user._id]);


  useEffect(() => {
    findChatUser();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    // socket.current = io("ws://localhost:8800");
    socket.current = io(
      "https://indian-social-media-app-chatting-backend.onrender.com/"
    );
    socket.current.emit("add-new-user", user._id);
    socket.current.on("all-currently-online-users", (users) => {
      // here we are getting the informaiton about the online users from the socket.io
      setOnlineUsers(users);
    });
  }, [user]);

  // Sending Message to the socket server
  useEffect(() => {
    if (sendMessage) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Geting the message from the socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chatUser) => {
    const online = onlineUsers.some((el) => el.userId === chatUser._id); 
    return online ? true : false;
  };

  return (
    <Box>
      <Box className="Chat" mt={{ base: "40px", lg: "0px" }}>
        <Box className="Left-side-chat">
          <Box className="Chat-container">
            <Text fontWeight={"bold"}>Chats</Text>
            <Box className="chatMembers-list">
              {finalChatUserData?.map((el) => (
                <Box
                  key={el._id}
                  onClick={() => {
                    setCurrentChatUser(el);
                  }}
                >
                  <Conversation userData={el} online={checkOnlineStatus(el)} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="Right-side-chat">
          <ChatBox
            currentChatUser={currentChatUser}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Chat);
