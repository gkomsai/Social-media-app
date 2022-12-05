import axios from "axios";
import { notify } from "../../utils/extraFunctions";
import { getTimelinePosts } from "../posts/action";
import * as types from "./actionTypes";

/*  ----------------------for getting a single User  -------------------------------- */

export const getUser = (id) => {
  return axios({
    method: "get",
    url: `/user/${id}`,
  });
};


/*  ----------------------for getting all User  -------------------------------- */
export const getAllUser = (toast) => (dispatch) => {
  dispatch({ type: types.GET_USER_REQUEST });
  axios({
    method: "get",
    url: `/user`,
  })
    .then((res) => {
      if (res.data) {
        dispatch({ type: types.GET_USER_SUCCESS, payload: res.data });
      }
    })
    .catch((err) => {
      notify(toast, err.response.data.message, "error");
      dispatch({ type: types.GET_USER_FAILURE });
    });
};


/*  ----------------------for Updating a  User  -------------------------------- */

export const upadteUser = (id, payload, token, toast) => (dispatch) => {
  dispatch({ type: types.UPDATE_USER_REQUEST });
  axios({
    method: "patch",
    url: `/user/update/${id}`,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.data) {
        dispatch({ type: types.UPDATE_USER_SUCCESS, payload: res.data });
        notify(toast, "user updated successfully", "success");
      }
    })
    .catch((err) => {
      notify(toast, err.response.data.message, "error");
      dispatch({ type: types.UPDATE_USER_FAILURE });
    });
};

/*  ----------------------for deleting a  User  -------------------------------- */

export const deleteUser = (id, token, toast) => (dispatch) => {
  dispatch({ type: types.DELETE_USER_REQUEST });
  axios({
    method: "delete",
    url: `/user/delete/${id}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.data) {
        notify(toast, "Your account deleted successfully", "success");
        return dispatch({ type: types.DELETE_USER_SUCCESS });
      }
    })
    .catch((err) => {
      notify(toast, err.response.data.message, "error");
      dispatch({ type: types.DELETE_USER_FAILURE });
    });
};

/*  ----------------------for following a User  -------------------------------- */

export const followUser = (id, token, toast, currentUserId) => (dispatch) => {
  dispatch({ type: types.FOLLOW_USER_REQUEST });
 return axios({
    method: "patch",
    url: `/user/${id}/follow`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.data) {
        dispatch({ type: types.FOLLOW_USER_SUCCESS, payload: id });
        notify(toast, res.data.message, "success");
      }
    })
    .then(() => dispatch(getTimelinePosts(currentUserId, token, toast)))
    .catch((err) => {
      console.error(err);
      notify(toast, err.response.data.message, "error");
      dispatch({ type: types.FOLLOW_USER_FAILURE });
    });
};


/*  ----------------------for Unfollowing a User  -------------------------------- */

export const unfollowUser = (id, token, toast, currentUserId) => (dispatch) => {
  dispatch({ type: types.UNFOLLOW_USER_REQUEST });
 return axios({
    method: "patch",
    url: `/user/${id}/unfollow`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.data) {
        dispatch({ type: types.UNFOLLOW_USER_SUCCESS, payload: id });
        notify(toast, res.data.message, "success");
      }
    })
    .then(() => dispatch(getTimelinePosts(currentUserId, token, toast)))
    .catch((err) => {
      notify(toast, err.response.data.message, "error");
      dispatch({ type: types.UNFOLLOW_USER_FAILURE });
    });
};
