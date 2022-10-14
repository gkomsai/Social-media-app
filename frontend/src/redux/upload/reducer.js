const initialState = {
  posts: [],
  loading: false,
  error: false,
  uploading: false,
};

export const PostReducer = (state = initialState, {type,payload}) => {
    console.log(payload);
  switch (type) {
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts:payload,
        uploading: false,
        error: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };

    default:
      return state;
  }
};

