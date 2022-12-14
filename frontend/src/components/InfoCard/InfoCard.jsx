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

  const dispatch = useDispatch();
  const toast = useToast();
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentUser, setCurrentUser] = useState({});

  const { user } = useSelector((state) => state.AuthReducer, shallowEqual);
 

  const handleLogOut = () => {
    dispatch(logoutFun());
    notify(toast, "Logout Successfully", "success");
  };

  useEffect(() => {
    let isCancelled = false;
    if (user) {
      if (id === user._id) {
        if (!isCancelled) {
          setCurrentUser(user);
        }
      }
    }
    return () => {
      isCancelled = true;
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
          <b>Status: </b>
        </span>
        <span>{currentUser.relationship}</span>
      </Box>
      <Box className="info">
        <span>
          <b>Lives in: </b>
        </span>
        <span>{currentUser.livesIn}</span>
      </Box>
      <Box className="info">
        <span>
          <b>workStatus: </b>
        </span>
        <span>{currentUser.workStatus}</span>
      </Box>
      <CustomButton
        className={"logout-button"}
        onClick={handleLogOut}
        value="Log Out"
      />
    </Box>
  );
};

export default InfoCard;
