import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/posts/action";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { notify } from "../../utils/extraFunctions";
import defaultProfile from "../../assets/defaultProfile.png";

const PostShare = () => {
  const imageRef = useRef();
  const description = useRef();
  const toast = useToast();
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector((store) => store.AuthReducer);
  const { token } = useSelector((store) => store.AuthReducer);

  // console.log(token);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };
  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    //post data
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
          console.log("upload wala", res.data);
          if (res.data) {
            notify(toast, "Image uploaded Successfully", "success");
            newPost = {
              ...newPost,
              image: res.data.secure_url,
              cloudinary_id: res.data.public_id,
            };
            dispatch(createPost(newPost, token, toast));
            resetShare();
            setIsLoading(false);
          }
        })
        .catch((err) => {
          // console.error(err);
          setIsLoading(false);
          notify(
            toast,
            " file type is not supported! Only jpg|jpeg|png|gif files are allowed",
            "error"
          );
        });
    } else {
      setIsLoading(true);
      dispatch(createPost(newPost, toast));
      resetShare();
      setIsLoading(false);
    }
  };

  // Reset Post Share
  function resetShare() {
    setImage(null);
    description.current.value = "";
  }

  if (!user) {
    return <h1>user doesn't exist</h1>;
  }
  return (
    <div className="PostShare">
      <img
        src={user.profilePicture ? user.profilePicture : defaultProfile}
        alt=""
      />
      <div>
        <input
          type="text"
          placeholder="What's happening?"
          required
          ref={description}
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule />
            Shedule
          </div>
          <Button
            bg="var(--buttonBg)"
            isLoading={isLoading}
            onClick={handleUpload}
            className="button ps-button"
          >
            Share
          </Button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
