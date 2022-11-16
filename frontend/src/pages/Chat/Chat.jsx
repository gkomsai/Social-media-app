import React, { useRef, useState } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import Searchbar from "../../components/Searchbar/Searchbar";
import Conversation from "../../components/Conversations/Conversations";
import NavIcons from "../../components/NavIcons/Navicons";
import { useEffect } from "react";
import { findAllchatingUser } from "../../redux/chats/action";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { Box, Hide, Show, Text } from "@chakra-ui/react";
const Chat = () => {
  const { user } = useSelector((store) => store.AuthReducer);
  const { token } = useSelector((store) => store.AuthReducer);
  const [allChattingMembers, setaAllChattingMembers] = useState([]);
  // console.log({allChattingMembers})
  const [currentChatData, setCurrentChatData] = useState(null);
  // console.log({ currentChat });
  const [onlineUsers, setOnlineUsers] = useState([]);
  console.log({ onlineUsers });
  const socket = useRef(); // creating the socket globally
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const getChatMembers = async () => {
      try {
        findAllchatingUser(user._id, token).then((res) => {
          // console.log(res.data);
          setaAllChattingMembers(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getChatMembers();
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
      <Show below="lg">
        <NavIcons />
      </Show>

      <Box className="Chat" mt={{ base: "40px", lg: "0px" }}>
       
        <Box className="Left-side-chat">
          <Hide below="lg">
            <Searchbar />
          </Hide>

          <Box className="Chat-container">
            <Text>Chats</Text>
            <Box className="chatMembers-list">
              {allChattingMembers?.map((chatMember) => (
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
          <Show above="lg"> 
          <Box w={{lg:"40rem",xl:"55rem"}} alignSelf={'flex-end'}>
          <NavIcons />
        </Box>
        </Show>

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
