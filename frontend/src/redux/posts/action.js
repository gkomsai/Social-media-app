import axios from "axios";
import { notify } from "../../utils/extraFunctions";
import * as types from "./actionTypes";


/*  ----------------------for Creating a post  -------------------------------- */

export const createPost = (payload, token, toast) => (dispatch) => {
  dispatch({ type: types.CREATE_START });
 return axios({
    method: "post",
    url: `/posts/create`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.data) {
        dispatch({ type: types.CREATE_SUCCESS });
        notify(toast, "Post created successfully", "success");
      }
    })
    .catch((err) => {
      notify(toast, err.response.data.message, "error");
      dispatch({ type: types.CREATE_FAILURE });
    });
};



/*  ----------------------for getting the timeline post of a user -------------------------------- */

export const getTimelinePosts = (id, token, toast) => async (dispatch) => {
  dispatch({ type: types.RETREIVING_START });
  return axios({
    method: "get",
    url: `/posts/${id}/timeline`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.data) {
        dispatch({ type: types.RETREIVING_SUCCESS, payload: res.data });
      }
    })
    .catch((err) => {
      notify(toast, err.response.data.message, "error");
      dispatch({ type: types.RETREIVING_FAILURE });
    });
};



/*  ----------------------for Liking and dislikig the post  -------------------------------- */

export const handleLikeUnlikePost = (id, token, toast) => {
  return axios({
    method: "patch",
    url: `posts/like/${id}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      notify(toast, res.data.message, "success");
    })
    .catch((err) => {
      notify(toast, err.response.data.message, "error");
    });
};



/*  ----------------------for Deleting the Post -------------------------------- */

export const deletePost = (id, token, toast) => (dispatch) => {
  return axios({
    method: "delete",
    url: `posts/delete/${id}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch({ type: types.DELETE_SUCCESS });
      notify(toast, res.data.message, "success");
    })
    .catch((err) => {
      notify(toast, err.response.data.message, "error");
    });
};



/*  ----------------------for Updating the post of a user -------------------------------- */

export const updatePost = (id, payload, token, toast) => (dispatch) => {
  dispatch({ type: types.UPDATE_START });
  return axios({
    method: "patch",
    url: `posts/update/${id}`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      dispatch({ type: types.UPDATE_SUCCESS });
      notify(toast, res.data.message, "success");
    })
    .catch((err) => {
      dispatch({ type: types.UPDATE_FAILURE });
      notify(toast, err.response.data.message, "error");
    });
};
