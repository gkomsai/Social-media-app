import { useToast } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getTimelinePosts } from "../../redux/posts/action";
import SinglePost from "../SinglePost/SinglePost";

import "./Posts.css";

const Posts = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useSelector((state) => state.AuthReducer);
  let { posts, loading } = useSelector((state) => state.PostReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id, toast));
  }, [getTimelinePosts, dispatch, user]);
  if (!posts) return "No Posts";

  return (
    <div className="Posts">
      {posts?.map((el) => {
        return <SinglePost postData={el} key={Date.now() + Math.random()} />;
      })}
    </div>
  );
};

export default Posts;
