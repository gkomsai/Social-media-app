import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../redux/user/action";
import defaultProfile from "../../assets/defaultProfile.png";
import "./ChatBox.css";
import { format } from 'timeago.js';


import { addMessage, getMessages } from "../../api/messageApi";
import InputEmoji from "react-input-emoji";
import { useSelector } from "react-redux";
import { Box, Image } from "@chakra-ui/react";

const ChatBox = ({
  currentChatData,
  currentUser,
  setSendMessage,
  receivedMessage,
}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  // console.log({ userData });
  const { token } = useSelector((state) => state.AuthReducer);




  const scroll = useRef();
  const userId = currentChatData?.members.find((id) => id !== currentUser);

  const getUserData = async () => {
    try {
      getUser(userId,token).then((res) => {
        // console.log("getUseres in chatBox", res.data);
        setUserData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentChatData) {
      getUserData();
    }
  }, [userId]);

  //for fetching messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(currentChatData._id, token);
        // console.log("fetch messages data", data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentChatData) {
      fetchMessages();
    }
  }, [currentChatData]);

  const handleSend = async () => {
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: currentChatData._id,
    };
    const receiverId = currentChatData.members.find((id) => id !== currentUser);
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
    // console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage && receivedMessage.chatId === currentChatData._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  //  whenever our message changes, then the below code will handle scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box className="ChatBox-container">
      {currentChatData ? (
        <>
          <Box className="chat-header">
            <Box className="follower">
              <Box>
                <Image
                  src={
                    userData?.profilePicture
                      ? userData.profilePicture
                      : defaultProfile
                  }
                  alt="Profile"
                  w="52px" h="52px"
                  className="followerImage"
                 
                />
                <Box className="name" fontSize={"1rem"}>
                  <span>
                    {userData?.firstName} {userData?.lastName}
                  </span>
                </Box>
              </Box>
            </Box>
            <hr
              style={{
                width: "95%",
                border: "0.1px solid #ececec",
                marginTop: "20px",
              }}
            />
          </Box>
          <Box className="chat-body">
            {messages.map((message, i) => (
              <Box
                key={i}
                ref={scroll}
                className={
                  message.senderId === currentUser ? "message own" : "message"
                }
              >
                <span>{message.text}</span>{" "}
                <span>{format(message.createdAt)}</span>
              </Box>
            ))}
          </Box>
          <Box className="chat-sender">
            <Box>+</Box>
            <InputEmoji
              value={newMessage}
              onChange={setNewMessage}
              onEnter={handleSend}
            />
            <Box className="send-button button" onClick={handleSend}>
              Send
            </Box>
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

export default ChatBox;
