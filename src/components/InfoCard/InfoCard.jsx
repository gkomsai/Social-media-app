import React from "react";
import { useState } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
            
            />
          </div>
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
