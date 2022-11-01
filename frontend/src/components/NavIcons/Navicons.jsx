import React from "react";
import Home from "../../assets/home.png";
import Notification from "../../assets/noti.png";
import Comment from "../../assets/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

const NavIcons = () => {
  return (
    <div className="navIcons">
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <UilSetting />
      <img src={Notification} alt="" />
      <Link to="/chats">
        <img src={Comment} alt="" />
      </Link>
    </div>
  );
};

export default NavIcons;
