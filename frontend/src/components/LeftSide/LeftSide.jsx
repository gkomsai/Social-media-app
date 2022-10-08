import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import ProfileCard from "../ProfileCard/ProfileCard";
import Searchbar from "../Searchbar/Searchbar";
import "./Leftside.css";
const Leftside = () => {
  return (
    <div className="leftside">
      <Searchbar />
      <ProfileCard />
      <FollowersCard />
    </div>
  );
};

export default Leftside;
