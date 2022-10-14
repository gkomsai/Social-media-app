import axios from "axios";
import { notify } from "../../utils/extraFunctions";
import { getItemFromLocal } from "../../utils/localStorage";
import * as types from "./actionTypes";

const token = getItemFromLocal("token");
console.log(token);
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};



export const uploadImage = (payload, toast) => (dispatch) => {
    dispatch({type:types.UPLOAD_START});
    axios
      .post(`/upload`, payload, {headers})
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          dispatch({type:types.UPLOAD_SUCCESS,payload:res.data});
          notify(toast, "Image uploaded Successfully", "success");
        }
      })
      .catch((err) => {
        notify(toast, err.response.data.message, "error");
        dispatch({type:types.UPLOAD_FAILURE});
      });
  };

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
    dispatch({type:types.UPLOAD_START});
    axios
      .post(`/posts/create`, payload,{headers})
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          dispatch({type:types.UPLOAD_SUCCESS,payload:res.data});
          notify(toast, res.data.message, "success");
        }
      })
      .catch((err) => {
        console.error(err);
        notify(toast, err.response.data.message, "error");
        dispatch({type:types.UPLOAD_FAILURE});
      });
  };



