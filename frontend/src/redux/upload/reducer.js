import * as types from "./actionTypes";

const initialState = {
  posts: [],
  loading: false,
  error: false,
  uploading: false,
};

export const PostReducer = (state = initialState, { type, payload }) => {
  console.log({ payload });
  switch (type) {
    case types.UPLOAD_START:
      return { ...state, error: false, uploading: true };
    case types.UPLOAD_SUCCESS:
      return {
        ...state,
        uploading: false,
        error: false,
      };
    case types.UPLOAD_FAILURE:
      return { ...state, uploading: false, error: true };
    case types.RETREIVING_START:
      return { ...state, loading: true, error: false };
    case types.RETREIVING_SUCCESS:
      return { ...state, posts: payload, loading: false, error: false };
    case types.RETREIVING_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};
