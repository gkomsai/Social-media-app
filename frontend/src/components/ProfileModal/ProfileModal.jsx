import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const ProfileModal = ({ onOpen, onClose, isOpen }) => {
  const handleChange = () => {};
  const handleSubmit = () => {};

  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form className="infoForm" onSubmit={handleSubmit}>
            <h3>Your Info</h3>
            <div>
              <input
                onChange={handleChange}
                type="text"
                placeholder="First Name"
                name="firstname"
                className="infoInput"
              />
              <input
                onChange={handleChange}
                type="text"
                placeholder="Last Name"
                name="lastname"
                className="infoInput"
              />
            </div>

            <div>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Works at"
                name="worksAt"
                className="infoInput"
              />
            </div>

            <div>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Lives in"
                name="livesIn"
                className="infoInput"
              />
              <input
                onChange={handleChange}
                type="text"
                placeholder="Country"
                name="country"
                className="infoInput"
              />
            </div>

            <div>
              <input
                onChange={handleChange}
                type="text"
                className="infoInput"
                placeholder="Relationship status"
                name="relationship"
              />
            </div>

            <div>
              Profile image
              <input type="file" name="profileImage" />
              Cover image
              <input type="file" name="coverImage" />
            </div>

            <button className="button infoButton" type="submit">
              Update
            </button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
