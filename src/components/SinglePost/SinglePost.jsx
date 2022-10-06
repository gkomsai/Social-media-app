import React from "react";
import "./SinglePost.css";
import Comment from "../../assets/comment.png";
import Share from "../../assets/share.png";
import Heart from "../../assets/like.png";
import NotLike from "../../assets/notlike.png";

const SinglePost = ({ postData }) => {


  return (
    <div className="SinglePost">
      <img src={postData.img} alt="" />

      <div className="postReact">
        <img
          src={postData.liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>likes</span>
      <div className="detail">
        <span>
          <b>{postData.name} </b>
        </span>
        <span>{postData.desc}</span>
      </div>
    </div>
  );
};

export default SinglePost;
