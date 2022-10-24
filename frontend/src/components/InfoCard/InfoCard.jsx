import React, { useEffect } from "react";

import ProfileModal from "../ProfileModal/ProfileModal";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";
import { logoutFun } from "../../redux/auth/action";
import { notify } from "../../utils/extraFunctions";

const InfoCard = () => {
  const [currentUser, setCurrentUser] = useState({});
  const dispatch =useDispatch();
  const toast = useToast();
  const { id } = useParams();
console.log(id);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((state) => state.AuthReducer);
  // console.log(id,user._id);

  // const fetchcurrentUser = async () => {
  //   // 
  //   // } else {
  //     // console.log("fetching");
  //     // const fetchedUser = await axios.get(`/user/${currentUserId}`)
  //     // setCurrentUser(fetchedUser);
  //     // console.log({fetchedUser});
  //   }
  // };
  const handleLogOut = ()=> {
    dispatch(logoutFun())
    notify(toast, "Logout Successfully", "success");
  }


  useEffect(() => {
    if (id === user._id) {
      setCurrentUser(user);
}
    // fetchcurrentUser();
  }, [user]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === id ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={onOpen}
              backgroundcolor="#24be6a"
            />
            <ProfileModal isOpen={isOpen} onClose={onClose} />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{currentUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{currentUser.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{currentUser.worksAt}</span>
      </div>

      <button className="button logout-button" onClick={handleLogOut}  >Log Out</button>
    </div>
  );
};

export default InfoCard;
