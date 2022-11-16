import axios from "axios";
import { notify } from "../../utils/extraFunctions";
import * as types from "./actionTypes";

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

export const createPost = (payload, token, toast) => (dispatch) => {
  dispatch({ type: "CREATING START" });
  axios({
    method: "post",
    url: `/posts/create`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log("new created data", res.data);
      if (res.data) {
        dispatch({ type: "CREATE SUCCESS" });
        notify(toast, "Post created successfully", "success");
      }
    })
    .catch((err) => {
      // console.error(err);
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
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      // console.log("timeline data", res.data);
      if (res.data) {
        dispatch({ type: types.RETREIVING_SUCCESS, payload: res.data });
        notify(toast, "post fetched Successfully", "success");
      }
    })
    .catch((err) => {
      // console.error(err);
      notify(toast, err.response.data.message, "error");
      dispatch({ type: types.RETREIVING_FAILURE });
    });
};

export const handleLikeUnlikePost = (id, token, toast) => {
  try {
    return axios({
      method: "patch",
      url: `posts/like/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      // console.log("likes res", res);
      notify(toast, res.data.message, "success");
    });
  } catch (err) {
    // console.log(err);
    notify(toast, err.response.data.message, "error");
  }
};

export const deletePost = (id, token, toast) => (dispatch) => {
  try {
    return axios({
      method: "delete",
      url: `posts/delete/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      dispatch({ type: "DELETE SUCCESS" });
      notify(toast, res.data.message, "success");
    });
  } catch (err) {
    notify(toast, err.response.data.message, "error");
  }
};

export const updatePost = (id, payload, token, toast) => (dispatch) => {
  try {
    return axios({
      method: "patch",
      url: `posts/update/${id}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      // console.log("upadate post",res.data)
      dispatch({ type: "UPDATE SUCCESS" });
      notify(toast, res.data.message, "success");
    });
  } catch (err) {
    notify(toast, err.response.data.message, "error");
  }
};
