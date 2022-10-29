import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { upadteUser } from "../../redux/user/action";
import { notify } from "../../utils/extraFunctions";
import axios from "axios";
import { getItemFromLocal } from "../../utils/localStorage";

const token = getItemFromLocal("token");
// console.log(token);
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};
const ProfileModal = ({ onOpen, onClose, isOpen, userData }) => {
  const { password, ...other } = userData;
  const [formData, setFormData] = useState(other);
  console.log({formData});
  const [profilePicture, setprofilePicture] = useState(null);
  const [coverPicture, setcoverPicture] = useState(null);
  // console.log({profilePicture},{coverPicture})
  const dispatch = useDispatch();
  const {id} = useParams();
  const toast = useToast();
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profilePicture"
        ? setprofilePicture(img)
        : setcoverPicture(img);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedUserData = formData;
    if (profilePicture) {
      const data = new FormData();
      data.append("file", profilePicture);
      axios
        .post(`/posts/upload`, data, { headers })
        .then((res) => {
          console.log("upload wala", res.data);
          if (res.data) {
            notify(toast, "Image uploaded Successfully", "success");
            updatedUserData = {
              ...updatedUserData,
              profilePicture: res.data.secure_url,
              cloudinaryProfilePicture_id: res.data.public_id,
            };
          }
        })
        .catch((err) => {
          console.error(err);
          notify(toast, "something went wrong", "error");
        });
    }
    if (coverPicture) {
      const data = new FormData();
      data.append("file", coverPicture);
      axios
        .post(`/posts/upload`, data, { headers })
        .then((res) => {
          console.log("upload wala", res.data);
          if (res.data) {
            notify(toast, "Image uploaded Successfully", "success");
            updatedUserData = {
              ...updatedUserData,
              coverPicture: res.data.secure_url,
              cloudinaryCoverPicture_id: res.data.public_id,
            };
          }
        })
        .catch((err) => {
          console.error(err);
          notify(toast, "something went wrong", "error");
        });
    }
    setTimeout(() => {
      
      console.log({updatedUserData});
      dispatch(upadteUser(id, updatedUserData,toast));
    }, 5000);
   
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
            <div>
              <input
                onChange={handleChange}
                type="text"
                placeholder="First Name"
                name="firstName"
                className="infoInput"
                value={formData.firstName}
              />
              <input
                onChange={handleChange}
                type="text"
                placeholder="Last Name"
                name="lastName"
                className="infoInput"
                value={formData.lastName}
              />
            </div>

            <div>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Works at"
                name="worksAt"
                className="infoInput"
                value={formData.worksAt}
              />
            </div>

            <div>
              <input
                onChange={handleChange}
                type="text"
                placeholder="Lives in"
                name="livesIn"
                className="infoInput"
                value={formData.livesIn}
              />
              <input
                onChange={handleChange}
                type="text"
                placeholder="Country"
                name="country"
                className="infoInput"
                value={formData.country}
              />
            </div>

            <div>
              <input
                onChange={handleChange}
                type="text"
                className="infoInput"
                placeholder="Relationship status"
                name="relationship"
                value={formData.relationship}
              />
            </div>

            <div>
              Profile image
              <input
                type="file"
                name="profilePicture"
                onChange={handleImageChange}
              />
              Cover image
              <input
                type="file"
                name="coverPicture"
                onChange={handleImageChange}
              />
            </div>

            <button className="button infoButton" onClick={onClose} type="submit">
              Update
            </button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProfileModal;
