import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../redux/user/action";
import "./ChatBox.css";
import { format } from "timeago.js";

import { addMessage, getMessages } from "../../api/messageApi";
import InputEmoji from "react-input-emoji";
import { shallowEqual, useSelector } from "react-redux";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import CustomButton from "../Button/CustomButton";
import { useCallback } from "react";

const ChatBox = ({
  currentChatMemberChatSchema,
  currentUserId,
  setSendMessage,
  receivedMessage,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const { token } = useSelector((state) => state.AuthReducer, shallowEqual);
  const scroll = useRef();

  const userId = currentChatMemberChatSchema?.members.find(
    (id) => id !== currentUserId
  );

  const getUserData = useCallback(() => {
    getUser(userId)
      .then((res) => {
        // console.log("getuser triggered")
        setUserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  useEffect(() => {
    if (currentChatMemberChatSchema) {
      getUserData();
    }
  }, [userId]);

  //for fetching messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(
          currentChatMemberChatSchema?._id,
          token
        );
        // console.log("fetch messages data", data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentChatMemberChatSchema) {
      fetchMessages();
    }
  }, [currentChatMemberChatSchema]);

  const handleSend = async () => {
    const message = {
      senderId: currentUserId,
      text: newMessage,
      chatId: currentChatMemberChatSchema?._id,
    };
    const receiverId = currentChatMemberChatSchema?.members.find(
      (id) => id !== currentUserId
    );
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
      receivedMessage.chatId === currentChatMemberChatSchema?._id
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
      {currentChatMemberChatSchema ? (
        <>
          <Box className="chat-header">
            <Flex justify={"flex-start"} gap="5" alignItems={"center"}>
              <Avatar
                width={"52px"}
                height="52px"
                name={userData?.firstName}
                src={userData?.profilePicture}
                alt="profile"
              />
              <Box className="name" fontSize={"1rem"}>
                <span>
                  {userData?.firstName} {userData?.lastName}
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
                  message.senderId === currentUserId ? "message own" : "message"
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
