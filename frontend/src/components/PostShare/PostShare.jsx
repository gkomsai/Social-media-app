import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import profileImg from "../../assets/profileImg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../redux/posts/action";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { notify } from "../../utils/extraFunctions";
import { getItemFromLocal } from "../../utils/localStorage";
import defaultProfile from "../../assets/defaultProfile.png";

const PostShare = () => {
  const [image, setImage] = useState(null);

  const imageRef = useRef();
  const description = useRef();
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.AuthReducer);
  // const PostReducer = useSelector((store) => store.PostReducer);

  // console.log({ PostReducer });
  const token = getItemFromLocal("token");
  // console.log(token);
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
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

    // if there is an image with post
    if (image) {
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
            dispatch(uploadPost(newPost, toast));

            resetShare();
          }
        })
        .catch((err) => {
          console.error(err);
          // notify(toast, err.response.data.message, "error");
          notify(toast, "something went wrong", "error");
        });
    } else {
      dispatch(uploadPost(newPost, toast));
      resetShare();
    }
  };

  // Reset Post Share
  function resetShare() {
    setImage(null);
    description.current.value = "";
  }

  if(!user){
    return <h1>user doesn't exist</h1>
  }
  return (
    <div className="PostShare">
     <img src={user.profilePicture ? user.profilePicture : defaultProfile} alt="" />
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
          <button onClick={handleUpload} className="button ps-button">
            Share
          </button>

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
