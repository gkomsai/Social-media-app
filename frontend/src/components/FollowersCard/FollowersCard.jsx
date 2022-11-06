import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import User from "../User/User";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../../redux/user/action";
import { useToast } from "@chakra-ui/react";

const FollowersCard = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((store) => store.AuthReducer);
  const { token } = useSelector((store) => store.AuthReducer);
  const { allUser } = useSelector((store) => store.AuthReducer);
  // console.log("allUser",allUser);

  useEffect(() => {
    setPersons(allUser);
  }, [allUser]);

  useEffect(() => {
    if (allUser.length === 0) {
      dispatch(getAllUser(token, toast));
    }
  }, [allUser.length]);

  return (
    <div className="FollowersCard">
      <h3>Who is folllowing you</h3>
      {persons.map((el) => (
        <div key={el._id}>
          {(el._id !== user._id)?<User person={el} />:""}
        </div>
      ))}
    </div>
  );
};

export default FollowersCard;
