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

const Chat = () => {
  const { user,token } = useSelector((store) => store.AuthReducer,shallowEqual);
  const { chatUsers } = useSelector((store) => store.ChatReducer,shallowEqual);

  const socket = useRef(); // creating the socket globally
  const dispatch = useDispatch();
  const toast = useToast();

  const [currentChatMemberChatSchema, setCurrentChatMemberChatSchema] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const findChatUser = useCallback(() => {
    if (chatUsers.length === 0) {
      // console.log("All ChatingUser inside the Chat page triggered")
      dispatch(findAllchatingUser(user._id,token,toast))
    }
  },[user._id]) 

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

  const checkOnlineStatus = (chatSchema) => {
  const secondChatMemberId = chatSchema.members.find((id) => id !== user._id); //  since our members array only include only two members so finding the other member excluding the current user
    const online = onlineUsers.some((el) => el.userId === secondChatMemberId); // now checking if the otherUser is online or not
    return online ? true : false;
  };

  return (
    <Box>
      <Box className="Chat" mt={{ base: "40px", lg: "0px" }}>
        <Box className="Left-side-chat">
          <Box className="Chat-container">
            <Text fontWeight={"bold"}>Chats</Text>
            <Box className="chatMembers-list">
              {chatUsers?.map((chatSchema) => (
                <Box
                  key={Date.now() + user._id + Math.random()}
                  onClick={() => {
                    setCurrentChatMemberChatSchema(chatSchema);
                  }}
                >
                  <Conversation
                    singleChatMemberData={chatSchema}
                    online={checkOnlineStatus(chatSchema)}
                    currentUser={user._id}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="Right-side-chat">
          <ChatBox
            currentChatMemberChatSchema={currentChatMemberChatSchema}
            currentUserId={user._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Chat);
