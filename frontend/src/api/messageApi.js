import axios from "axios";



export const getMessages = (id, token) =>
  axios.get(`/message/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

export const addMessage = (payload, token) =>
  axios.post("/message/", payload, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
