import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/user/action";
import defaultProfile from "../../assets/defaultProfile.png";
import "./ChatBox.css";

const ChatBox = ({ chat, currentUser }) => {
  const [userData, setUserData] = useState(null);
  console.log({userData});


  const userId = chat?.members.find((id) => id !== currentUser);

  const getUserData = async () => {
    try {
      getUser(userId).then((res) => {
        console.log("getUseres in chatBox", res.data);
        setUserData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(chat){
        getUserData();
    }
  
  }, [userId]);

  return (
    <div className="ChatBox-container">
      <div className="chat-header">
        <div className="follower">
          <div>
            <img
              src={
                userData?.profilePicture
                  ? userData.profilePicture
                  : defaultProfile
              }
              alt="Profile"
              className="followerImage"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="name" style={{ fontSize: "0.9rem" }}>
              <span>
                {userData?.firstName} {userData?.lastName}
              </span>
            </div>
          </div>
        </div>
        <hr
          style={{
            width: "95%",
            border: "0.1px solid #ececec",
            marginTop: "20px",
          }}
        />
      </div>
    </div>
  );
};

export default ChatBox;
