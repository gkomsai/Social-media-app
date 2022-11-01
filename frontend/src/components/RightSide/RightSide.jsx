import React from "react";
import "./RightSide.css";

import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModel/ShareModal";
import { useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NavIcons from "../NavIcons/Navicons";

const RightSide = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="RightSide">
     <NavIcons />
      <TrendCard />
      <div>
        <button onClick={onOpen} className="button right-share-btn">
          Share
        </button>
      </div>
      <ShareModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default RightSide;
