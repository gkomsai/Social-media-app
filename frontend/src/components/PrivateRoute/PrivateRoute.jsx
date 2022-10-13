import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';


function PrivateRoute({ children }) {
    const location =useLocation();
    const token = useSelector((store) => store.AuthReducer.token);
//   console.log(token);
if (token) {
    return children;
  } else {
    return <Navigate to="/auth/login" state={{from: location}} replace />; 
  }
}
  
  export default PrivateRoute;
  