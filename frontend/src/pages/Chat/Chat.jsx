import React, { useRef, useState } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import Searchbar from "../../components/Searchbar/Searchbar";
import Conversation from "../../components/Conversations/Conversations";
import NavIcons from "../../components/NavIcons/Navicons";
import { useEffect } from "react";
import { findParticularUser } from "../../redux/chats/action";
import ChatBox from "../../components/ChatBox/ChatBox";
import { io } from "socket.io-client";
const Chat = () => {
  const { user } = useSelector((store) => store.AuthReducer);
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  console.log({ currentChat });
  const [onlineUsers, setOnlineUsers] = useState([]);
  console.log({onlineUsers});
  const socket = useRef();

  useEffect(() => {
    const getChatMembers = async () => {
      try {
        findParticularUser(user._id).then((res) => {
          // console.log(res.data);
          setChats(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    getChatMembers(user._id);
  }, [user._id]);


  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <Searchbar />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats?.map((chat) => (
              <div
                key={Date.now() + user._id + Math.random()}
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  online={true}
                  currentUser={user._id}
                />
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>

        <ChatBox chat={currentChat} currentUser={user._id} />
      </div>
    </div>
  );
};

export default Chat;
