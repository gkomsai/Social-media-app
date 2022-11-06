import * as types from "./actionTypes";

const initialState = {
  newPost: {},
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
    case "CREATE SUCCESS" :
      console.log("post created success", payload)
      return {
        ...state,
        newPost: {...payload},
        uploading: false,
        error: false,
      };
    case "CREATE FAILURE":
      return { ...state, uploading: false, error: true };
    case types.RETREIVING_START:
      return { ...state, loading: true, error: false };
    case types.RETREIVING_SUCCESS:
      // console.log("timelinepayload", payload)
      return { ...state, timeLinePosts: [...payload], loading: false, error: false };
    case types.RETREIVING_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
