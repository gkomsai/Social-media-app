import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import PostShare from "../PostShare/PostShare";


const ShareModal = ({ onOpen, onClose, isOpen }) => {


  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share Something</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PostShare onClose={onClose} location="shareModal" />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
