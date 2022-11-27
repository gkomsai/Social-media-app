import React, { useEffect, useState } from "react";
import "./SinglePost.css";
import Comment from "../../assets/comment.png";
import Share from "../../assets/share.png";
import Heart from "../../assets/like.png";
import NotLike from "../../assets/notlike.png";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  handleLikeUnlikePost,
  updatePost,
} from "../../redux/posts/action";
import { useToast } from "@chakra-ui/toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/hooks";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Image,
  Avatar,
} from "@chakra-ui/react";
import CustomButton from "../Button/CustomButton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import TimeAgo from "timeago-react";
import { MdComment } from "react-icons/md";
import { FaShareAlt } from "react-icons/fa";
import { useMemo } from "react";

const SinglePost = ({ postData }) => {
  // console.log({postData})
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("");
  let { user, token, allUser } = useSelector(
    (state) => state.AuthReducer,
    shallowEqual
  );
  const [showFullText, setShowFullText] = useState(false);
  const [liked, setLiked] = useState(postData.likes.includes(user._id));
  const [likes, setLikes] = useState(postData.likes.length);

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1)+"..." : string;
  };


  if (allUser.length>0) {
 var postUser = allUser.filter((el) => el._id === postData.userId);
}
  


  const handleLike = () => {
    handleLikeUnlikePost(postData._id, token, toast);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleDeltePost = () => {
    dispatch(deletePost(postData._id, token, toast));
  };

  const hadleUpdatePost = (e) => {
    e.preventDefault();

    const payload = {
      description,
    };
    dispatch(updatePost(postData._id, payload, token, toast));
  };

  return (
    <Box className="SinglePost">
      {postUser.length > 0 ? (
        <Flex alignItems={"flex-start"} gap="1rem">
          <Avatar
            name={postUser[0].firstName}
            src={postUser[0].profilePicture}
            alt="profile"
          />
          <Box>
            <Text
              fontWeight={"bold"}
              _hover={{ color: "green", textDecoration: "underline" }}
            >
              {postUser[0].firstName}  {postUser[0].lastName}
            </Text>
            <Text fontSize={"13px"} >{truncate(postUser[0].workStatus, 55)  }</Text>
            <Box fontSize={"10px"}>
            <TimeAgo
             size="12px"
              datetime={postData.createdAt}
           
            />
            </Box>
         
          </Box>
        </Flex>
      ) : null}
      <LazyLoadImage src={postData?.image} alt="" />

      <Box className="postReactMain">
        <Box className="postReact">
          <Image
            src={liked ? Heart : NotLike}
            alt=""
            cursor={"pointer"}
            onClick={handleLike}
          />
        <MdComment size="27px" cursor={"pointer"}/>
        <FaShareAlt size="27px"  cursor={"pointer"}/>
        </Box>

        <Menu>
          <MenuButton>
            {" "}
            <BsThreeDotsVertical />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={onOpen}> Update </MenuItem>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Update your post description</ModalHeader>
                <ModalCloseButton />
                <form action="" onSubmit={hadleUpdatePost}>
                  <ModalBody>
                    <Input
                      defaultValue={postData?.description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </ModalBody>

                  <ModalFooter>
                    <CustomButton
                      type="submit"
                      marginTop="0px"
                      onClick={onClose}
                      value="UPDATE"
                    />
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
            <MenuItem onClick={handleDeltePost}>
              <Text as="span" color={"red"}>
                {" "}
                Delete
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>

      <Text as="span" color={"grey"} fontSize="15px">
        {likes} likes
      </Text>
      <Box className="detail">
        {showFullText ? (
          <Text onClick={() => setShowFullText(false)}>
            {postData?.description + "  "}{" "}
            <Text as="span"  ml="20px" cursor={"pointer"} color="blue">
              see less...
            </Text>
          </Text>
        ) : (
         
          <Text onClick={() => setShowFullText(true)} whiteSpace="pre-line">
            {truncate(postData?.description, 110)}{" "}
            {postData?.description.length > 110 ? (
              <Text ml="20px" as="span" cursor={"pointer"} color="blue">
                See more...
              </Text>
            ) : null}
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default SinglePost;
