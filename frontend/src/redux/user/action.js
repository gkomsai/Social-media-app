import axios from "axios";
import { notify } from "../../utils/extraFunctions";
import { getItemFromLocal } from "../../utils/localStorage";
import * as types from "./actionTypes";
const token = getItemFromLocal("token");

// console.log({token});
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const getUser = (id, toast) => (dispatch) => {
  dispatch({ type: types.GET_USER_REQUEST });
  axios({
    method: "get",
    url: `/user/${id}`,
    headers: headers,
  })
    .then((res) => {
      console.log(res.data);
      if (res.data) {
        dispatch({ type: types.GET_USER_SUCCESS, payload: res.data });
        notify(toast, "user fetched successfully", "success");
      }
    })

    .catch((err) => {
      // console.error(err);
      notify(toast, err.response.data.message, "error");
      dispatch({ type: types.GET_USER_FAILURE });
    });
};

export const getAllUser = (toast) => (dispatch) => {
  dispatch({ type: types.GET_USER_REQUEST });
  axios({
    method: "get",
    url: `/user`,
    headers: headers,
  })
    .then((res) => {
      // console.log(res.data);
      if (res.data) {
        dispatch({ type: types.GET_USER_SUCCESS, payload: res.data });
        notify(toast, "All user fetched successfully", "success");
      }
    })
    .catch((err) => {
      console.error(err);
      // notify(toast, err.response.data.message, "error");
      dispatch({ type: types.GET_USER_FAILURE });
    });
};

export const upadteUser = (id, payload, toast) => (dispatch) => {
  dispatch({ type: types.UPDATE_USER_REQUEST });
  axios({
    method: "patch",
    url: `/user/update/${id}`,
    data: payload,
    headers: headers,
  })
    .then((res) => {
      console.log("upadteUser res.data",res.data);
      if (res.data) {
        dispatch({ type: types.UPDATE_USER_SUCCESS, payload: res.data });
        notify(toast, "user updated successfully", "success");
      }
    })
    .catch((err) => {
      console.error("update user err",err);
      // notify(toast, err.response.data.message, "error");
      dispatch({ type: types.UPDATE_USER_FAILURE });
    });
};

export const deleteUser = (id, toast) => (dispatch) => {
  dispatch({ type: types.DELETE_USER_REQUEST });
  axios({
    method: "delete",
    url: `/user/delete/${id}`,
    headers: headers,
  })
    .then((res) => {
      console.log(res.data);
      if (res.data) {
        dispatch({ type: types.DELETE_USER_SUCCESS });
        notify(toast, "user deleted successfully", "success");
      }
    })
    .catch((err) => {
      // console.error(err);
      notify(toast, err.response.data.message, "error");
      dispatch({ type: types.DELETE_USER_FAILURE });
    });
};

export const followUser = (id, toast) => (dispatch) => {
  dispatch({ type: types.FOLLOW_USER_REQUEST });
  axios({
    method: "patch",
    url: `/user/${id}/follow`,
    headers: headers,
  })
    .then((res) => {
      console.log(res.data);
      if (res.data) {
        dispatch({ type: types.FOLLOW_USER_SUCCESS });
        notify(toast, res.data.message, "success");
      }
    })
    .catch((err) => {
      console.error(err);
      // notify(toast, err.response.data.message, "error");
      dispatch({ type: types.FOLLOW_USER_FAILURE });
    });
};

export const unfollowUser = (id, toast) => (dispatch) => {
  dispatch({ type: types.UNFOLLOW_USER_REQUEST });
  axios({
    method: "patch",
    url: `/user/${id}/unfollow`,
    headers: headers,
  })
    .then((res) => {
      console.log(res.data);
      if (res.data) {
        dispatch({ type: types.UNFOLLOW_USER_SUCCESS });
        notify(toast, res.data.message, "success");
      }
    })
    .catch((err) => {
      // console.error(err);
      notify(toast, err.response.data.message, "error");
      dispatch({ type: types.UNFOLLOW_USER_FAILURE });
    });
};
