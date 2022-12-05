import * as types from "./actionTypes";
import axios from "axios";
import { notify } from "../../utils/extraFunctions";


/*  ----------------------for Creating a new Chat with other user  -------------------------------- */

export const createNewChat = (payload, token, toast) => (dispatch) => {
  try {
    return axios({
      method: "post",
      url: `/chats`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    }).then((res) => {
      dispatch({ type: types.CREATE_NEW_CHAT_SUCCESS });
      notify(toast, "Member added in your chat list", "success");
    });
  } catch (err) {
    notify(toast, err.response.data.message, "error");
  }
};


/*  ----------------------for Finding the all Chat Users  -------------------------------- */

export const findAllchatingUser = (id, token, toast) => (dispatch) => {
  return axios({
    method: "get",
    url: `/chats/${id}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.data) {
        dispatch({ type: types.GET_CHAT_USERS_SUCCESS, payload: res.data });
      }
    })
    .catch((err) => {
      notify(toast, err.response.data.message, "error");
      dispatch({ type: "CREATE FAILURE" });
    });
};

