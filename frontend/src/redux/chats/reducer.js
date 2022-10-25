const initialState = {
  chats: [],
  chatUsers: [],
  isLoading: false,
  isError: true,
};

export const ChatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "FIND_SUCCESS":
      return { ...state, chats: [...payload] };

    case "SAVE_USER":
      return { ...state, chatUsers: [...state.chatUsers, payload] };
    default:
      return state;
  }
};
