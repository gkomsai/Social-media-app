import React, { useState } from "react";
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
import { Box, Text } from "@chakra-ui/layout";
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
} from "@chakra-ui/react";
import CustomButton from "../Button/CustomButton";

import { LazyLoadImage } from "react-lazy-load-image-component";

const SinglePost = ({ postData }) => {
  // console.log({postData})
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("");
  const { user, token } = useSelector(
    (state) => state.AuthReducer,
    shallowEqual
  );

  const [liked, setLiked] = useState(postData.likes.includes(user._id));
  const [likes, setLikes] = useState(postData.likes.length);

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
      <LazyLoadImage src={postData?.image} alt="" />

      <Box className="postReactMain">
        <Box className="postReact">
          <Image
            src={liked ? Heart : NotLike}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
          <Image src={Comment} alt="" />
          <Image src={Share} alt="" />
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
        <p style={{whiteSpace: "pre-line"}}>{postData?.description}</p>
      </Box>
    </Box>
  );
};

export default SinglePost;
