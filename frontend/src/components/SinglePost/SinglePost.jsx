import React from "react";
import "./SinglePost.css";
import Comment from "../../assets/comment.png";
import Share from "../../assets/share.png";
import Heart from "../../assets/like.png";
import NotLike from "../../assets/notlike.png";
import { useSelector } from "react-redux";

const SinglePost = ({ postData }) => {
  console.log({postData})
  const { user } = useSelector((state) => state.AuthReducer);

  return (
    <div className="SinglePost">
      <img src={postData.image ? process.env.REACT_APP_PUBLIC_FOLDER + postData.image : ""} alt="" />

      <div className="postReact">
        <img
          src={postData.liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>{postData.likes} likes</span>
      <div className="detail">
        <span>
          <b>{postData.name} </b>
        </span>
        <span>{postData.description}</span>
      </div>
    </div>
  );
};

export default SinglePost;
