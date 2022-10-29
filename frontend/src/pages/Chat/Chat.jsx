import React, { useState } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import Searchbar from "../../components/Searchbar/Searchbar";

const Chat = () => {
  const { user } = useSelector((store) => store.AuthReducer);

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <Searchbar />
        <div className="Chat-container">
          <h2>Chats</h2>
        </div>
      </div>

      {/* Right Side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}></div>
      </div>
    </div>
  );
};

export default Chat;
