import React from "react";
import "./InfoCard.css";

const InfoCard = () => {
  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        <div></div>
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>single</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>Delhi</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>Amazon</span>
      </div>

      <button className="button logout-button">Log Out</button>
    </div>
  );
};

export default InfoCard;
