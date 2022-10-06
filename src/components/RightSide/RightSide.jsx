import React from "react";
import "./RightSide.css";
import Home from "../../assets/home.png";
import Notification from "../../assets/noti.png";
import Comment from "../../assets/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../TrendCard/TrendCard";

const RightSide = () => {
  return (
    <div className="RightSide">
      <div className="navIcons">
        <img src={Home} alt="" />
        <UilSetting />
        <img src={Notification} alt="" />
        <img src={Comment} alt="" />
      </div>
      <TrendCard />
      <div>
        <button className="button right-share-btn">
          Share
        </button>
      </div>
    </div>
  );
};

export default RightSide;
