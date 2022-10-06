import React from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
import Searchbar from "../Searchbar/Searchbar";
import "./Leftside.css";
const Leftside = () => {
  return (
    <div className="leftside">
      <Searchbar />
      <ProfileCard />
    </div>
  );
};

export default Leftside;
