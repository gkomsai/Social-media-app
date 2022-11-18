import React from "react";
import "./RightSide.css";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModel/ShareModal";
import { Box, Button, useDisclosure } from "@chakra-ui/react";


const RightSide = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="RightSide">
      {/* <NavIcons /> */}
      <TrendCard />
      <Box>
        <Button
          w="95%"
          m="auto"
          bg="var(--buttonBg)"
          onClick={onOpen}
          className="button"
        >
          Share
        </Button>
      </Box>
      <ShareModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default RightSide;
