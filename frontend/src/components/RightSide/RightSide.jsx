import React from "react";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModel/ShareModal";
import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import CustomButton from "../Button/CustomButton";

const RightSide = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  return (
    <Flex direction={"column"} gap="1.9rem" position={"sticky"} top="7rem" height={"calc(100vh - 7rem)"}>
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
    </Flex>
  );
};

export default RightSide ;
