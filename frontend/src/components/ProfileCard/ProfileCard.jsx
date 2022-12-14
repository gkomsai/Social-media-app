import { Box, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cover from "../../assets/cover.jpg";
import defaultProfile from "../../assets/defaultProfile.png";
import "./profileCard.css";

const ProfileCard = ({ location }) => {
  
  const { user } = useSelector((store) => store.AuthReducer, shallowEqual);

  const { timeLinePosts } = useSelector( (store) => store.PostReducer,shallowEqual);

  if (!user) {
    return <Heading>user doesn't exist</Heading>;
  }

  return (
    <Box className="profileCard">
      <Box className="profileImages">
        <Image src={user?.coverPicture ? user.coverPicture : cover} alt="" />
        <Image
          src={user?.profilePicture ? user.profilePicture : defaultProfile}
          alt=""
        />
      </Box>
      <Box className="profileName">
        <span>
          {user?.firstName} {user?.lastName}
        </span>
        <span>
          {user?.workStatus ? user?.workStatus : "Write about yourself"}
        </span>
      </Box>

      <Box className="followStatus">
        <hr />
        <Box>
          <Box className="follow">
            <span>{user?.followers?.length}</span>
            <span>Followers</span>
          </Box>
          <Box className="vl"> </Box>

          <Box className="follow">
            <span>{user?.following?.length}</span>
            <span>Following</span>
          </Box>

          {location === "profilePage" && (
            <>
              <Box className="vl"></Box>
              <Box className="follow">
                <span>
                  {
                    timeLinePosts?.filter((post) => post.userId === user?._id)
                      .length
                  }
                </span>
                <span>Posts</span>
              </Box>{" "}
            </>
          )}
        </Box>
        <hr />
      </Box>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            textDecoration="none"
            color="inherit"
          >
            My Profile
          </Link>
        </span>
      )}
    </Box>
  );
};
export default ProfileCard;
