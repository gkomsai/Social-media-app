import axios from "axios";



export const createNewChat = (payload, token) => (dispatch)=>{
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
        console.log(res);
      dispatch({type:"CREATE_NEW_CHAT_SUCCESS"});
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  
export const findAllchatingUser = (id,token) =>{
 return  axios({
        method: "get",
        url: `/chats/${id}`,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
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
  








