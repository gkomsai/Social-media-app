import React from "react";
import { postsData } from "../../Data/postsData";
import SinglePost from "../SinglePost/SinglePost";

import "./Posts.css";

const Posts = () => {
  return (
    <div className="Posts">
      {postsData.map((el, id) => {
        return <SinglePost postData={el} key={id} />;
      })}
    </div>
  );
};

export default Posts;
