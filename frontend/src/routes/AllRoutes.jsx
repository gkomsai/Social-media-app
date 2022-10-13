import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Auth from "../pages/Auth/Auth";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PrivateRoute> <Home /> </PrivateRoute>} />
        <Route path="auth/login" element={<Auth />} />
        <Route path="*" element={<PrivateRoute><Profile /> </PrivateRoute> } />
        <Route path="*" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
