import React from "react";
import FollowersCard from "../FollowersCard/FollowersCard";
import InfoCard from "../InfoCard/InfoCard";
import Searchbar from "../Searchbar/Searchbar";
import "../LeftSide/Leftside.css"
import '../FollowersCard/FollowersCard.css'
const ProfileLeft = () => {
  return (
    <div className="leftside">
      <Searchbar />
      <InfoCard />
      <FollowersCard />
    </div>
  );
};

export default ProfileLeft;
