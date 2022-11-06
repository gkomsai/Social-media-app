import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../redux/user/action";
import defaultProfile from "../../assets/defaultProfile.png";

const Conversation = ({ singleChatMemberData, currentUser, online }) => {
  const [userData, setUserData] = useState(null);
  // const dispatch = useDispatch();

  const userId = singleChatMemberData?.members.find((id) => id !== currentUser); // finding the 2nd member userId
  // console.log({ userId });

  const getUserData = async () => {
    try {
      getUser(userId).then((res) => {
        setUserData(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
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
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstName} {userData?.lastName}
            </span>
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
