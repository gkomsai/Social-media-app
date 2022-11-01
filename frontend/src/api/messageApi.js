import axios from "axios";
import { getItemFromLocal } from "../utils/localStorage";

const token = getItemFromLocal("token");
// console.log({token});
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const getMessages = (id) => axios.get(`/message/${id}`, { headers });

export const addMessage = (payload) =>
  axios.post("/message/", payload, { headers });
