import { getItemFromLocal, saveItemToLocal } from "../../utils/localStorage";
import * as types from "../user/actionTypes";
import {
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "./actionTypes";

const initialState = {
  token: getItemFromLocal("token") || false,
  user: getItemFromLocal("user") || {},
  isAuthLoading: false,
  isError: false,
};

export const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_SIGNUP_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case USER_SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthLoading: false,
        isError: false,
      };
    case USER_SIGNUP_FAILURE:
      return {
        ...state,
        isAuthLoading: false,
        token: null,
        isError: true,
      };
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case USER_LOGIN_SUCCESS:
      saveItemToLocal("token", payload.token);
      saveItemToLocal("user", payload.user);
      return {
        ...state,
        isAuthLoading: false,
        token: payload.token,
        user: payload.user,
        isError: false,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        isAuthLoading: false,
        token: null,
        isError: true,
      };
    case USER_LOGOUT_SUCCESS:
      localStorage.clear();
      return {
        ...state,
        isAuthLoading: false,
        token: null,
        user: {},
        isError: true,
      };
    case types.GET_USER_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case types.GET_USER_SUCCESS:
      saveItemToLocal("user", payload);
      return {
        ...state,
        user:payload,
        isAuthLoading: true,
        isError: false,
      };
    case types.GET_USER_FAILURE:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };

    case types.UPDATE_USER_REQUEST:
      saveItemToLocal("user", payload);
      return {
        ...state,
        user: payload,
        isAuthLoading: true,
        isError: false,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case types.UPDATE_USER_FAILURE:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case types.DELETE_USER_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case types.DELETE_USER_SUCCESS:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case types.DELETE_USER_FAILURE:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case types.FOLLOW_USER_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case types.FOLLOW_USER_SUCCESS:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case types.FOLLOW_USER_FAILURE:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case types.UNFOLLOW_USER_REQUEST:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case types.UNFOLLOW_USER_SUCCESS:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    case types.UNFOLLOW_USER_FAILURE:
      return {
        ...state,
        isAuthLoading: true,
        isError: false,
      };
    default:
      return state;
  }
};
