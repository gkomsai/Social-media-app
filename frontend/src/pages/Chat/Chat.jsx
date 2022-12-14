import React, { useRef, useState } from "react";
import "./Chat.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ChatUsersList from "../../components/ChatUsersList/ChatUsersList";
import { useEffect } from "react";
import { findAllchatingUser } from "../../redux/chats/action";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
import { Box, Text, useToast } from "@chakra-ui/react";
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



  useEffect(() => {
    let isCancelled = false;
    if (allUser.length === 0 && location === "chatPage") {
      if (!isCancelled) {
      dispatch(getAllUser(toast));
    }     
  }
  return () => {
    isCancelled=true;
  }
  }, [allUser.length]);

 

  useEffect(() => {
    let isCancelled = false;
    if (chatUsers.length === 0 && location === "chatPage") {
      if (!isCancelled) {
        dispatch(findAllchatingUser(user._id, token, toast));
      }     
    }
    return () => {
      isCancelled=true;
    }
  }, [user._id]);


  // Connecting to the Socket.io
  useEffect(() => {
    socket.current = io(
      "https://indian-social-media-app-chatting-backend.onrender.com/"
    );

    socket.current.emit("add-new-user", user._id);
    socket.current.on("all-currently-online-users", (users) => {
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
    <>
      <Box className="Chat-Parent" mt={{ base: "40px", lg: "0px" }}>
          <Box className="Left-side-chat" >
            <Text ml="15px" fontWeight={"bold"}>Chats</Text>
            <Box className="chatMembers-list">
              {finalChatUserData?.map((el) => (
                <Box
                  key={el._id}
                  onClick={() => {
                    setCurrentChatUser(el);
                  }}
                >
                  <ChatUsersList userData={el} online={checkOnlineStatus(el)} />
                </Box>
              ))}
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
    </>
  );
};

export default React.memo(Chat);
