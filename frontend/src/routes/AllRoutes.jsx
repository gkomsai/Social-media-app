import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "../components/Error/Error";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Login from "../pages/Auth/Login";
import Auth from "../pages/Auth/Signup";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Auth />} />
        
        <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
      
        <Route path="/profile" element={<PrivateRoute><Profile /> </PrivateRoute> } />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
