import { Box, useToast } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTimelinePosts } from "../../redux/posts/action";
import SinglePost from "../SinglePost/SinglePost";
import "./Posts.css";

const Posts = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const params = useParams();
  const { user } = useSelector((state) => state.AuthReducer);
  const { token } = useSelector((state) => state.AuthReducer);
  let { timeLinePosts } = useSelector((state) => state.PostReducer);

  useEffect(() => {
    if (timeLinePosts.length === 0) {
      dispatch(getTimelinePosts(user._id, token, toast));
    }
  }, [timeLinePosts.length]);

  if (!timeLinePosts) return "No Posts";

  // For handling the posts indide our Profile page
  if (params.id) {
    timeLinePosts = timeLinePosts.filter((post) => post.userId === params.id);
  }
  return (
    <Box className="Posts">
      {timeLinePosts?.map((el) => {
        return <SinglePost postData={el} key={Date.now() + Math.random()} />;
      })}
    </Box>
  );
};

export default Posts;
