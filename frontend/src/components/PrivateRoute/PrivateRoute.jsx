import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = useSelector((store) => store.AuthReducer.token, shallowEqual);
  
  if (token) {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
}

export default PrivateRoute;
