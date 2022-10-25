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
  const { allUser } = useSelector((store) => store.AuthReducer);
console.log("allUser",allUser);


  useEffect(() => {
    setPersons(allUser);

  }, [allUser])
  

  useEffect(() => {
    if (allUser.length === 0) {
      dispatch(getAllUser(toast));
    }
  }, [allUser.length]);

  return (
    <div className="FollowersCard">
      <h3>Who is folllowing you</h3>
      {persons.map((el) => {
        if (el._id !== user._id) return <User person={el} key={el._id} />;
      })}
    </div>
  );
};

export default FollowersCard;
