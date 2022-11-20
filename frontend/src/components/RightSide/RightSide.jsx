import React from "react";
import "./RightSide.css";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModel/ShareModal";
import { Box, useDisclosure } from "@chakra-ui/react";
import CustomButton from "../Button/CustomButton";

const RightSide = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log("RightSide")

  return (
    <Box className="RightSide">
      <TrendCard />
      <Box>
        <CustomButton
          marginTop="0px"
          bg="var(--buttonBg)"
          w="95%"
          onClick={onOpen}
          value="Share"
        />
      </Box>
      <ShareModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default RightSide ;
