import React from "react";
import Leftside from "../../components/LeftSide/LeftSide";
import MiddleSide from "../../components/MiddleSide/MiddleSide";
import RightSide from "../../components/RightSide/RightSide";
import "./home.css";
const Home = () => {
  return (
    <div>
      <Leftside />
      <MiddleSide />
      <RightSide />
    </div>
  );
};

export default Home;
