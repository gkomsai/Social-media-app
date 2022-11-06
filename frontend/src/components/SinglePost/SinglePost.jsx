import React, { useState } from "react";
import "./SinglePost.css";
import Comment from "../../assets/comment.png";
import Share from "../../assets/share.png";
import Heart from "../../assets/like.png";
import NotLike from "../../assets/notlike.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  getTimelinePosts,
  handleLikeUnlikePost,
  updatePost,
} from "../../redux/posts/action";
import { useToast } from "@chakra-ui/toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { MdAutoDelete } from "react-icons/md";
import { Text } from "@chakra-ui/layout";
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
  Button,
} from "@chakra-ui/react";

const SinglePost = ({ postData }) => {
  // console.log({postData})
  const toast = useToast();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description,setDescription] = useState("")
  const { user } = useSelector((state) => state.AuthReducer);
  const { token } = useSelector((state) => state.AuthReducer);
  const [liked, setLiked] = useState(postData.likes.includes(user._id));
  const [likes, setLikes] = useState(postData.likes.length);

  const handleLike = () => {
    handleLikeUnlikePost(postData._id, token, toast);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleDeltePost = () => {
    dispatch(deletePost(postData._id, token, toast));
    setTimeout(() => {
      dispatch(getTimelinePosts(user._id, token, toast));
    }, 2000);
  };



const hadleUpdatePost = (e)=>{
e.preventDefault();

const payload = {
  description
}
dispatch(updatePost(postData._id, payload, token, toast));

}


  return (
    <div className="SinglePost">
      <img src={postData?.image} alt="" />

      <div className="postReactMain">
        <div className="postReact">
          <img
            src={liked ? Heart : NotLike}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={handleLike}
          />
          <img src={Comment} alt="" />
          <img src={Share} alt="" />
        </div>

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
                  <Input  defaultValue={postData?.description}  onChange={(e)=>setDescription(e.target.value)}  />
                </ModalBody>

                <ModalFooter>
                  <Button type="submit" bg={"var(--buttonBg)"} mr={3} onClick={onClose}>
                    UPDATE
                  </Button>
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
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <div className="detail">
        <span>
          <b>{postData?.name} </b>
        </span>
        <span>{postData?.description}</span>
      </div>
    </div>
  );
};

export default SinglePost;
