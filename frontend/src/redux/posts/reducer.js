import * as types from "./actionTypes";

const initialState = {
  timeLinePosts: [],
  loading: false,
  updateError:false,
  error: false,
  uploading: false,
};

export const PostReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case types.CREATE_START:
      return { ...state, updateError: false, error: false, uploading: true };
    
    case types.CREATE_SUCCESS:
      return { ...state, timeLinePosts: [], uploading: false, updateError: false, error: false };
    
    case types.CREATE_FAILURE:
      return { ...state, uploading: false, updateError: true, error:false };
    
    case types.DELETE_SUCCESS:
      return { ...state, timeLinePosts: [], uploading: false, updateError: false };
    
    case types.UPDATE_START:
      return { ...state, uploading: true, error: false, updateError: false };
    
    case types.UPDATE_SUCCESS:
      return { ...state, timeLinePosts: [], uploading: false,  error: false, updateError: false };
    
    case types.UPDATE_FAILURE:
      return { ...state, uploading: false,  error: false, updateError: true };

    case types.RETREIVING_START:
      return { ...state, loading: true, error: false, updateError: false };
    
    case types.RETREIVING_SUCCESS:
      return {
        ...state,
        timeLinePosts: payload,
        loading: false,
        error: false,
        updateError: false
      };
    
    case types.RETREIVING_FAILURE:
      return { ...state, loading: false, error: true, updateError: false };
    
    default:
      return state;
  }
};
