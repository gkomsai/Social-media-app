import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../redux/user/action";
import defaultProfile from "../../assets/defaultProfile.png";
import "./ChatBox.css";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'


import { addMessage, getMessages } from "../../api/messageApi";
import InputEmoji from "react-input-emoji";

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

  
  TimeAgo.addDefaultLocale(en)
  // Create formatter (English).
  const timeAgo = new TimeAgo('en-US')


  const scroll = useRef();
  const userId = currentChatData?.members.find((id) => id !== currentUser);

  const getUserData = async () => {
    try {
      getUser(userId).then((res) => {
        console.log("getUseres in chatBox", res.data);
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
        const { data } = await getMessages(currentChatData._id);
        console.log("fetch messages data", data);
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
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  // Receiveing Message from parent component and will render as soon as our recevied message is changed so this code is enableling us the real-time chatting
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage && receivedMessage.chatId === currentChatData._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  //  whenever our message changes, then the below code will handle scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="ChatBox-container">
      {currentChatData ? (
        <>
          <div className="chat-header">
            <div className="follower">
              <div>
                <img
                  src={
                    userData?.profilePicture
                      ? userData.profilePicture
                      : defaultProfile
                  }
                  alt="Profile"
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                />
                <div className="name" style={{ fontSize: "0.9rem" }}>
                  <span>
                    {userData?.firstName} {userData?.lastName}
                  </span>
                </div>
              </div>
            </div>
            <hr
              style={{
                width: "95%",
                border: "0.1px solid #ececec",
                marginTop: "20px",
              }}
            />
          </div>
          <div className="chat-body">
            {messages.map((message, i) => (
              <div
                key={i}
                ref={scroll}
                className={
                  message.senderId === currentUser ? "message own" : "message"
                }
              >
                <span>{message.text}</span>{" "}
                <span>{timeAgo.format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <div className="chat-sender">
            <div>+</div>
            <InputEmoji
              value={newMessage}
              onChange={setNewMessage}
              onEnter={handleSend}
            />
            <div className="send-button button" onClick={handleSend}>
              Send
            </div>
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )}
    </div>
  );
};

export default ChatBox;
