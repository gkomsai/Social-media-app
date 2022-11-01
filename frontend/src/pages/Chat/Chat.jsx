import React, { useState } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import Searchbar from "../../components/Searchbar/Searchbar";
import Conversation from "../../components/Conversations/Conversations";
import NavIcons from "../../components/NavIcons/Navicons";
import { useEffect } from "react";
import { findParticularUser } from "../../redux/chats/action";

const Chat = () => {
  const { user } = useSelector((store) => store.AuthReducer);
  const [chats, setChats] = useState([]);


// Get the chat in chat section
useEffect(() => {
    const getChats = async () => {
      try {
        // const data = ;
        console.log("findParticularUserData",findParticularUser(user._id));
        // setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
    <Searchbar />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {/* {chats?.map((chat) => (
              <div>
                <Conversation
                  data={chat}
                  currentUser={user._id}
                    />
              </div>
            ))} */}
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
   
      </div>
    </div>
  );
};

export default Chat;
