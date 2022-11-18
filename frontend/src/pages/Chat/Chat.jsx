import React, { useRef, useState } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import Conversation from "../../components/Conversations/Conversations";

import { useEffect } from "react";
import { findAllchatingUser } from "../../redux/chats/action";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { Box, Text, useToast } from "@chakra-ui/react";

const Chat = () => {
  const { user } = useSelector((store) => store.AuthReducer);
  const { token } = useSelector((store) => store.AuthReducer);
  const { chatUsers } = useSelector((store) => store.ChatReducer);
 
  const dispatch = useDispatch();
  const toast = useToast();

  const [currentChatData, setCurrentChatData] = useState(null);

  const [onlineUsers, setOnlineUsers] = useState([]);
  console.log({ onlineUsers });
  const socket = useRef(); // creating the socket globally
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    if (chatUsers.length === 0) {
      dispatch(findAllchatingUser(user._id,token,toast))
    }
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    // socket.current = io("ws://localhost:8090");
    socket.current = io(
      "https://indian-social-media-app-chatting-backend.onrender.com/"
    );
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
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
      console.log("receivedMessage from the socket.io", data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id); //  since our members array only include only two members so finding the other member excluding the current user
    const online = onlineUsers.find((user) => user.userId === chatMember); // now checking  those users whose are online
    return online ? true : false;
  };

  return (
    <Box>
      <Box className="Chat" mt={{ base: "40px", lg: "0px" }}>
        <Box className="Left-side-chat">
          <Box className="Chat-container">
            <Text>Chats</Text>
            <Box className="chatMembers-list">
              {chatUsers?.map((chatMember) => (
                <Box
                  key={Date.now() + user._id + Math.random()}
                  onClick={() => {
                    setCurrentChatData(chatMember);
                  }}
                >
                  <Conversation
                    singleChatMemberData={chatMember}
                    online={checkOnlineStatus(chatMember)}
                    currentUser={user._id}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="Right-side-chat">
          <ChatBox
            currentChatData={currentChatData}
            currentUser={user._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Chat;
