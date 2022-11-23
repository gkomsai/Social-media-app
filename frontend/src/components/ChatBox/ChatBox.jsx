import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import { format } from "timeago.js";

import { addMessage, getMessages } from "../../api/messageApi";
import InputEmoji from "react-input-emoji";
import { shallowEqual, useSelector } from "react-redux";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import CustomButton from "../Button/CustomButton";

import axios from "axios";

const ChatBox = ({
  currentChatUser,
  setSendMessage,
  receivedMessage,
}) => {
  const [chatSchema, setChatSchema] = useState(null);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { token, user } = useSelector((state) => state.AuthReducer, shallowEqual);
  const scroll = useRef();

  const getchatSchema = async () => {
    try {
      let res =await axios.get(`/chats/find/${user._id}/${currentChatUser._id}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log("chatwala data",res.data);
      setChatSchema({...res.Data});

    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (currentChatUser) {
      getchatSchema();
   }
  
},[currentChatUser?._id])

 
 

  //for fetching messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(
          chatSchema?._id,
          token
        );
        // console.log("fetch messages data", data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chatSchema) {
      fetchMessages();
    }
  }, [chatSchema]);

  const handleSend = async () => {
    const message = {
      senderId: user._id,
      text: newMessage,
      chatId: chatSchema?._id,
    };
    const receiverId = currentChatUser._id;
    // sending message to socket server
    setSendMessage({ ...message, receiverId });

    // sending message to database
    try {
      const { data } = await addMessage(message, token);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  // Receiveing Message from parent component and will render as soon as our recevied message is changed so this code is enableling us the real-time chatting
  useEffect(() => {
    if (
      receivedMessage &&
      receivedMessage.chatId === chatSchema?._id
    ) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  //  whenever our message changes, then the below code will handle scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box className="ChatBox-container">
      {chatSchema ? (
        <>
          <Box className="chat-header">
            <Flex justify={"flex-start"} gap="5" alignItems={"center"}>
              <Avatar
                width={"52px"}
                height="52px"
                name={currentChatUser?.firstName}
                src={currentChatUser?.profilePicture}
                alt="profile"
              />
              <Box className="name" fontSize={"1rem"}>
                <span>
                  {currentChatUser?.firstName} {currentChatUser?.lastName}
                </span>
              </Box>
            </Flex>
            <hr
              style={{
                width: "95%",
                border: "0.1px solid #ececec",
                marginTop: "20px",
              }}
            />
          </Box>
          <Box className="chat-body">
            {messages?.map((message, i) => (
              <Box
                key={i}
                ref={scroll}
                className={
                  message.senderId ===  user._id ? "message own" : "message"
                }
              >
                <span>{message.text}</span>{" "}
                <span>{format(message.createdAt)}</span>
              </Box>
            ))}
          </Box>
          <Box className="chat-sender">
            <Box>
              <Text color={"black"}>+</Text>
            </Box>
            <InputEmoji
              value={newMessage}
              onChange={setNewMessage}
              onEnter={handleSend}
            />
            <CustomButton
              onClick={handleSend}
              marginTop="-10px"
              value="  Send"
            />
          </Box>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )}
    </Box>
  );
};

export default React.memo(ChatBox);
