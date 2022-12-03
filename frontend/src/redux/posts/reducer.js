import * as types from "./actionTypes";

const initialState = {
  timeLinePosts: [],
  loading: false,
  error: false,
  uploading: false,
};

export const PostReducer = (state = initialState, { type, payload }) => {
  // console.log({ payload });
  switch (type) {
    case "CREATING START":
      return { ...state, error: false, uploading: true };
    case "CREATE SUCCESS":
      return {...state,timeLinePosts: [], uploading: false, error: false};
    case "CREATE FAILURE":
      return { ...state, uploading: false, error: true };
    case "DELETE SUCCESS":
      return { ...state, timeLinePosts: [], uploading: false, error: false };
    case "UPDATE SUCCESS":
      // console.log("Post update payload", payload);
      return { ...state, timeLinePosts: [], uploading: false, error: false };

    case types.RETREIVING_START:
      return { ...state, loading: true, error: false };
    
    case types.RETREIVING_SUCCESS:
      // console.log("timelinepayload", payload)
      // console.log("newPost", state.newPost);
      return {
        ...state,
        timeLinePosts: [...payload],
        loading: false,
        error: false,
      };
    case types.RETREIVING_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
