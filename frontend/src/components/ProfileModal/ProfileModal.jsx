import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  Box,
  Input,
} from "@chakra-ui/react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { upadteUser } from "../../redux/user/action";
import { notify } from "../../utils/extraFunctions";
import axios from "axios";
import CustomButton from "../Button/CustomButton";
import "./ProfileModal.css";

const ProfileModal = ({ onOpen, onClose, isOpen, userData }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const toast = useToast();

  const [picLoading, setPicLoading] = useState(false);
  const { password, ...other } = userData;
  const [formData, setFormData] = useState(other);
  let [profilePicUrl, setprofilePicUrl] = useState({});
  let [coverPicUrl, setcoverPicUrl] = useState({});

  // console.log({profilePicture},{coverPicture})

  const { token } = useSelector((store) => store.AuthReducer,shallowEqual);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const postDetails = (e) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.name === "profilePicture") {
        setPicLoading(true);
        let img = e.target.files[0];
        const data = new FormData();
        data.append("file", img);
        axios
          .post(`/posts/upload`, data, { headers })
          .then((res) => {
            console.log("upload wala", res.data);
            if (res.data) {
              notify(toast, "Image uploaded Successfully", "success");
              setprofilePicUrl({
                ...profilePicUrl,
                profilePicture: res.data.secure_url,
                cloudinaryProfilePicture_id: res.data.public_id,
              });
              setPicLoading(false);
            }
          })
          .catch((err) => {
            setPicLoading(false);
            notify(
              toast,
              " file type is not supported! Only jpg|jpeg|png|gif files are allowed",
              "error"
            );
          });
      } else {
        setPicLoading(true);
        let coverPicture = e.target.files[0];
        const data = new FormData();
        data.append("file", coverPicture);
        axios
          .post(`/posts/upload`, data, { headers })
          .then((res) => {
            console.log("upload wala", res.data);
            if (res.data) {
              notify(toast, "Image uploaded Successfully", "success");
              setcoverPicUrl({
                ...coverPicUrl,
                coverPicture: res.data.secure_url,
                cloudinaryCoverPicture_id: res.data.public_id,
              });
              setPicLoading(false);
            }
          })
          .catch((err) => {
            setPicLoading(false);
            notify(
              toast,
              " file type is not supported! Only jpg|jpeg|png|gif files are allowed",
              "error"
            );
          });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedUserData = { ...formData, ...profilePicUrl, ...coverPicUrl };
    dispatch(upadteUser(id, updatedUserData, token, toast));
  };

  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update profile</ModalHeader>

        <ModalCloseButton />

        <ModalBody>
          <form className="infoForm" onSubmit={handleSubmit}>
            <h3>Your Info</h3>
            <Box>
              <Input
                onChange={handleChange}
                focusBorderColor="#F9802D"
                type="text"
                placeholder="First Name"
                name="firstName"
                className="infoInput"
                value={formData.firstName}
              />
              <Input
                onChange={handleChange}
                focusBorderColor="#F9802D"
                type="text"
                placeholder="Last Name"
                name="lastName"
                className="infoInput"
                value={formData.lastName}
              />
            </Box>

            <Box>
              <Input
                onChange={handleChange}
                focusBorderColor="#F9802D"
                type="text"
                placeholder="workStatus"
                name="workStatus"
                className="infoInput"
                value={formData.workStatus}
              />
            </Box>

            <Box>
              <Input
                onChange={handleChange}
                focusBorderColor="#F9802D"
                type="text"
                placeholder="Lives in"
                name="livesIn"
                className="infoInput"
                value={formData.livesIn}
              />
              <Input
                onChange={handleChange}
                focusBorderColor="#F9802D"
                type="text"
                placeholder="Country"
                name="country"
                className="infoInput"
                value={formData.country}
              />
            </Box>

            <Box>
              <Input
                onChange={handleChange}
                focusBorderColor="#F9802D"
                type="text"
                className="infoInput"
                placeholder="Relationship status"
                name="relationship"
                value={formData.relationship}
              />
            </Box>

            <Box>
              Profile image
              <Input
                type="file"
                focusBorderColor="#F9802D"
                name="profilePicture"
                onChange={(e) => postDetails(e)}
              />
              Cover image
              <Input
                type="file"
                focusBorderColor="#F9802D"
                name="coverPicture"
                onChange={(e) => postDetails(e)}
              />
            </Box>
            <CustomButton
              className="button"
              type="submit"
              marginTop="0px"
              isLoading={picLoading}
              onClick={onClose}
              value="Update"
              alignSelf="flex-end"
            />
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
