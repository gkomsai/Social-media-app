import React, { useEffect } from "react";
import ProfileModal from "../ProfileModal/ProfileModal";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { logoutFun } from "../../redux/auth/action";
import { notify } from "../../utils/extraFunctions";
import CustomButton from "../Button/CustomButton";

const InfoCard = () => {
  const [currentUser, setCurrentUser] = useState({});
  const dispatch = useDispatch();
  const toast = useToast();
  const { id } = useParams();
  // console.log(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((state) => state.AuthReducer,shallowEqual);
  // console.log({user},"info card");
  // console.log(id,user._id);

  const handleLogOut = () => {
    dispatch(logoutFun());
    notify(toast, "Logout Successfully", "success");
  };

  useEffect(() => {
    if (user) {
      if (id === user._id) {
        setCurrentUser(user);
      }
    }
  }, [user]);

  return (
    <Box className="InfoCard">
      <Box className="infoHead">
        <h4>Profile Info</h4>
        {user._id === id ? (
          <Box>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={onOpen}
              backgroundcolor="#24be6a"
            />
            <ProfileModal isOpen={isOpen} userData={user} onClose={onClose} />
          </Box>
        ) : (
          ""
        )}
      </Box>

      <Box className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{currentUser.relationship}</span>
      </Box>
      <Box className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{currentUser.livesIn}</span>
      </Box>
      <Box className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{currentUser.worksAt}</span>
      </Box>
      <CustomButton className={"logout-button"} onClick={handleLogOut} value="Log Out" />
    </Box>
  );
};

export default InfoCard;
