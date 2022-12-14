import axios from "axios";
import { notify } from "../../utils/extraFunctions";
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT_SUCCESS,
} from "./actionTypes";

export const signupRequest = () => {
  return {
    type: USER_SIGNUP_REQUEST,
  };
};

export const signupSuccess = (payload) => {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload,
  };
};

export const signupFailure = () => {
  return {
    type: USER_SIGNUP_FAILURE,
  };
};

export const loginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};

export const loginSuccess = (payload) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload,
  };
};

export const loginFailure = () => {
  return {
    type: USER_LOGIN_FAILURE,
  };
};

export const logoutSuccess = () => {
  return { type: USER_LOGOUT_SUCCESS };
};


/*  ----------------------for Creating an Account on the website  -------------------------------- */

export const signupFun = (payload, toast, navigate) => (dispatch) => {
  dispatch(signupRequest());
  axios
    .post(`/auth/signup`, payload)
    .then((res) => {
      if (res.data) {
        dispatch(signupSuccess(res.data));
        notify(toast, "Account Created Successfully", "success");
        navigate("/auth/login");
      }
    })
    .catch((err) => {
      notify(toast, err.response.data.message, "error",err.response.data.description);
      dispatch(signupFailure());
    });
};



/*  ----------------------for Logging in a User  -------------------------------- */

export const loginFun = (payload, toast, navigate) => (dispatch) => {
  dispatch(loginRequest());
  axios
    .post(`/auth/login`, payload)
    .then((res) => {
      if (res.data.token) {
        dispatch(loginSuccess(res.data));
        notify(toast, res.data.message, "success");
        navigate("/");
      }
    })
    .catch((err) => {
      notify(toast, err.response.data.message, "error");
      dispatch(loginFailure());
    });
};


/*  ----------------------for Logout a user  -------------------------------- */

export const logoutFun =() =>(dispatch)=>{
  return dispatch(logoutSuccess());
}