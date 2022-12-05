import { Box, Flex, Heading, useToast } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTimelinePosts } from "../../redux/posts/action";
import SinglePost from "../SinglePost/SinglePost";

const Posts = () => {

  const dispatch = useDispatch();
  const toast = useToast();
  const params = useParams();

  const { user, token } = useSelector(
    (state) => state.AuthReducer,
    shallowEqual
  );

  let { timeLinePosts } = useSelector(
    (state) => state.PostReducer,
    shallowEqual
  );


  useEffect(() => {
    if (timeLinePosts.length === 0) {
      dispatch(getTimelinePosts(user._id, token, toast));
    }
  }, [timeLinePosts.length]);


  if (!timeLinePosts) return (
    <Flex placeItems={"center"}>
      <Heading>Please follow any user to see the Posts</Heading>
    </Flex>
  )



  if (params.id) {
    timeLinePosts = timeLinePosts.filter((post) => post.userId === params.id);
  }

  
  return (
    <Flex direction={"column"} gap="2rem">
      {timeLinePosts?.map((el) => {
        return <SinglePost  postData={el} key={el._id} />;
      })}
    </Flex>
  );
};

export default Posts;
