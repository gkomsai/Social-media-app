import axios from "axios";

import { notify } from "../../utils/extraFunctions";
import { getItemFromLocal } from "../../utils/localStorage";
import * as types from "./actionTypes";

const token = getItemFromLocal("token");
const user = getItemFromLocal("user");
// console.log({token});
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
export const uploadPost = (payload, toast) => (dispatch) => {
  dispatch({ type: types.UPLOAD_START });
  axios({
    method: "post",
    url: `/posts/create`,
    data: payload,
    headers: headers,
  })
    .then((res) => {
      console.log(res.data);
      if (res.data) {
        dispatch({ type: types.UPLOAD_SUCCESS });
        notify(toast, "post created Successfully in the Database", "success");
      }
    })
    .then(dispatch(getTimelinePosts(user._id, toast)))
    .catch((err) => {
      console.error(err);
      notify(toast, err.response.data.message, "error");
      dispatch({ type: types.UPLOAD_FAILURE });
    });
};

export const getTimelinePosts = (id, toast) => async (dispatch) => {
  dispatch({ type: types.RETREIVING_START });
  // console.log({headers})
  return axios({
    method: "get",
    url: `/posts/${id}/timeline`,
    headers: headers,
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
export const likePost = (id) => {
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
