import * as types from "./actionTypes";



const initialState = {
  chats: [],
  chatUsers: [],
  isLoading: false,
  isError: true,
};

export const ChatReducer = (state = initialState, { type, payload }) => {
  
  switch (type) {

    case types.CREATE_NEW_CHAT_SUCCESS:
      return { ...state, chatUsers:[] };
    
    
    case types.GET_CHAT_USERS_SUCCESS:
      return { ...state, chatUsers: [...payload] };
    
    default:
      return state;
  }
};
