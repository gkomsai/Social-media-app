import axios from "axios";
import { notify } from "../../utils/extraFunctions";



export const createNewChat = (payload, token, toast) => (dispatch)=>{
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
        console.log(res.data);
      dispatch({type:"CREATE_NEW_CHAT_SUCCESS"});
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  
export const findAllchatingUser = (id,token,toast) =>(dispatch)=>{
 return  axios({
        method: "get",
        url: `/chats/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }).then((res) => {
        // console.log("All Chat Users Data", res.data);
        if (res.data) {
          dispatch({ type: "GET_CHAT_USERS_SUCCESS", payload:res.data });
          notify(toast, "Chat Users fetched successfully", "success");
        }
      })
      .catch((err) => {
        console.error(err);
        notify(toast, err.response.data.message, "error");
        dispatch({ type: "CREATE FAILURE" });
      });
  };

  export const findChats = (firstId,secondId,token) => (dispatch)=>{
    try {
      return axios({
        method: "get",
        url: `/chats/find/${firstId}/${secondId}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }).then((res) => {
      dispatch({type:"FIND_CHAT_SUCCESS",payload:res.data});
      });
    } catch (err) {
      console.error(err);
    }
  };
  








