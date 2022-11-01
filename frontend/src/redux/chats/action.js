import axios from "axios";
import { getItemFromLocal } from "../../utils/localStorage";




const token = getItemFromLocal("token");
// console.log({token});
const headers = {
  "Content-Type": "application/json",
  "Authorization": `Bearer ${token}`,
};

export const createNewChat = (payload) => (dispatch)=>{
    try {
      return axios({
        method: "post",
        url: `/chats`,
        data: payload,
        headers: headers,
      }).then((res) => {
        console.log(res);
      dispatch({type:"CREATE_NEW_CHAT_SUCCESS"});
      });
    } catch (err) {
      console.error(err);
    }
  };
  
  
export const findParticularUser = (id) =>{
    // try {
 return  axios({
        method: "get",
        url: `/chats/${id}`,
        headers: headers,
      })
    //   .then((res) => {
    //     console.log("**********",res.data);
    //     let data =res.data;
    // //   dispatch({type:"FIND_SUCCESS",payload:res.data});
    // return data;
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  export const findChats = (firstId,secondId) => (dispatch)=>{
    try {
      return axios({
        method: "get",
        url: `/chats/find/${firstId}/${secondId}`,
        headers: headers,
      }).then((res) => {
      dispatch({type:"FIND_CHAT_SUCCESS",payload:res.data});
      });
    } catch (err) {
      console.error(err);
    }
  };
  








