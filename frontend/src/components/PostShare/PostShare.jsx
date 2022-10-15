import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import profileImg from "../../assets/profileImg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../redux/upload/action";
import { useToast } from "@chakra-ui/react";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const description = useRef();
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.AuthReducer);
  const PostReducer = useSelector((store) => store.PostReducer);

console.log({PostReducer});




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
    const newPost = {
      userId: user._id,
      description: description.current.value,
    };

    // if there is an image with post
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.image = fileName;
      console.log({newPost});
      try {
        dispatch(uploadImage(data,toast));
      } catch (err) {
        console.error(err);
      }
    }
    dispatch(uploadPost(newPost,toast));
    resetShare();
  };

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    description.current.value = "";
  };



  return (
    <div className="PostShare">
      <img src={profileImg} alt="Profile" />
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
          <button     onClick={handleUpload} className="button ps-button">Share</button>

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
