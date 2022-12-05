import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/posts/action";
import { Box,  Heading, Image,  useToast } from "@chakra-ui/react";
import axios from "axios";
import { notify } from "../../utils/extraFunctions";
import defaultProfile from "../../assets/defaultProfile.png";
import { useEffect } from "react";
import CustomButton from "../Button/CustomButton";

const PostShare = ({ onClose, location }) => {

  const imageRef = useRef();
  const description = useRef();
  const toast = useToast();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user,token } = useSelector((store) => store.AuthReducer, shallowEqual);
 
  const [width, setWidth] = useState(window.innerWidth);
  
  
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };



  const breakpoint = 990;

  useEffect(() => {
    window.addEventListener("resize", () => setWidth(window.innerWidth));
  }, []);



  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };
 
  const handleUpload = async () => {
    let newPost = {
      userId: user._id,
      description: description.current.value,
    };

    if (!newPost.description) {
      notify(
        toast,
        "Please write something about the posts and then Post",
        "success"
      );
      return;
    }

    // if there is an image with post
    if (image) {
      setIsLoading(true);
      const data = new FormData();
      data.append("file", image);
      axios
        .post(`/posts/upload`, data, { headers })
        .then((res) => {
          if (res.data) {
            newPost = {
              ...newPost,
              image: res.data.secure_url,
              cloudinary_id: res.data.public_id,
            };
            dispatch(createPost(newPost, token, toast));
            if (location === "middleside") {
              resetShare();
           }  
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          notify(
            toast,
            " file type is not supported! Only jpg|jpeg|png|gif|webp files are allowed",
            "error"
          );
        });
    } else {
      setIsLoading(true);
      dispatch(createPost(newPost, token, toast));
      if (location === "middleside") {
        resetShare();
     }  
      setIsLoading(false);
    }
  };


  const handleClick =async () => {
    if (location === "shareModal") {
    await  handleUpload()
      onClose();
    } else {
      handleUpload ()
   } 
  
  }
  


  function resetShare() {
    setImage(null);
    description.current.value = "";
  }



  const handleEnter = async(e) => {
    if (e.keyCode === 13 && !e.shiftKey && location === "shareModal") {
      e.preventDefault();
     await handleUpload();
      onClose();
    } else if (e.keyCode === 13 && !e.shiftKey && location === "middleside") {
      e.preventDefault();
     await handleUpload();
    }
    return
  }

  if (!user) {
    return <Heading>user doesn't exist</Heading>;
  }
  return (
    <Box className="PostShare">
      <Image
        src={user.profilePicture ? user.profilePicture : defaultProfile}
        alt=""
      />
      <Box>
        <textarea
          id="mytextarea"
          placeholder="Share a Post"
          required
          onKeyDown={handleEnter}
          ref={description}
        />
        <Box className="postOptions">
          <Box
            className="option"
            color={"#4cb256"}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </Box>

          <Box className="option" color={"#4a4eb7"}>
            <UilPlayCircle />
            Video
          </Box>
          <Box className="option" color={"#ef5757"}>
            <UilLocationPoint />
            Location
          </Box>
          <Box
            hidden={width < breakpoint ? true : false}
            className="option"
            color={"#e1ae4a"}
          >
            <UilSchedule />
            Shedule
          </Box>
          <CustomButton
            marginTop="0px"
            w="85px"
            isLoading={isLoading}
            onClick={handleClick}  
            value="Share"
          />
          <Box display={"none"}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </Box>
        </Box>

        {image && (
          <Box className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <Image src={URL.createObjectURL(image)} alt="preview" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PostShare;
