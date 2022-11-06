import axios from "axios";

import { notify } from "../../utils/extraFunctions";
import { getItemFromLocal } from "../../utils/localStorage";
import * as types from "./actionTypes";

const token = getItemFromLocal("token");
const user = getItemFromLocal("user");
// console.log("redux wala",{user});
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
};

// export const uploadImage = (payload, toast) => (dispatch) => {
//   dispatch({ type: types.UPLOAD_START });
//   axios
//     .post(`/posts/upload`, payload, { headers })
//     .then((res) => {
//       console.log("upload wala", res.data);
//       if (res.data) {
//         dispatch({ type: types.UPLOAD_SUCCESS, payload: res.data });
//         notify(toast, "Image uploaded Successfully", "success");
//       }
//     })
//     .catch((err) => {
//       notify(toast, err.response.data.message, "error");
//       dispatch({ type: types.UPLOAD_FAILURE });
//     });
// };

// export const getPost = (payload, toast) => (dispatch) => {
//     dispatch({type:types.UPLOAD_START});
//     axios
//       .post(`/posts`, payload,{headers})
//       .then((res) => {
//         console.log(res.data);
//         if (res.data) {
//           dispatch({type:types.UPLOAD_SUCCESS,payload:res.data});
//           notify(toast, res.data.message, "success");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         notify(toast, err.response.data.message, "error");
//         dispatch({type:types.UPLOAD_FAILURE});
//       });
//   };
export const createPost = (payload, toast) => (dispatch) => {
  console.warn("inside new post")
  dispatch({ type: "CREATING START" });
  axios({
    method: "post",
    url: `/posts/create`,
    data: payload,
    headers: headers,
  })
    .then((res) => {
      console.log("new created data",res.data);
      if (res.data) {
        dispatch({ type: "CREATE SUCCESS" , payload: res.data });
        notify(toast, "post created Successfully in the Database", "success");
      }
    })
    // .then(dispatch(getTimelinePosts(user._id, token, toast)))
    .catch((err) => {
      console.error(err);
      notify(toast, err.response.data.message, "error");
      dispatch({ type: "CREATE FAILURE" });
    });
};

export const getTimelinePosts = (id, token, toast) => async (dispatch) => {
  dispatch({ type: types.RETREIVING_START });
  // console.log({headers})
  return axios({
    method: "get",
    url: `/posts/${id}/timeline`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log("timeline data", res.data);
      if (res.data) {
        dispatch({ type: types.RETREIVING_SUCCESS, payload: res.data });
        notify(toast, "post fetched Successfully from the database", "success");
      }
    })
    .catch((err) => {
      console.error(err);
      notify(toast, err.response.data.message, "error");
      dispatch({ type: types.RETREIVING_FAILURE });
    });
};


export const handleLikeUnlikePost = (id) => {
  try {
    return axios({
      method: "patch",
      url: `posts/like/${id}`,
      headers: headers,
    }).then((res) => {
      console.log("likes res", res);
    });
  } catch (err) {
    console.log(err);
  }
};
