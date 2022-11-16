import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = useSelector((store) => store.AuthReducer.token);
  //   console.log(token);
  if (token) {
    return children;
  } else {
    return <Navigate to="/auth/login" />;
  }
}

export default PrivateRoute;
