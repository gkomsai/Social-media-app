import {
    legacy_createStore,
    applyMiddleware,
    compose,
    combineReducers,
  } from "redux";
  import thunk from "redux-thunk";
  import { AuthReducer,  } from "./auth/reducer";
  import {PostReducer  } from "./upload/reducer";

  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const rootReducers = combineReducers({ AuthReducer,PostReducer});
  
  export const store = legacy_createStore(
    rootReducers,
    composeEnhancers(applyMiddleware(thunk))
  );
  