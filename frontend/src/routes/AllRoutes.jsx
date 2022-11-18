import React from "react";
import { Routes, Route } from "react-router-dom";
import Error from "../components/Error/Error";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import ChangePassord from "../pages/Auth/ChangePassord";
import Forgotpassword from "../pages/Auth/ForgotPassword";
import Login from "../pages/Auth/Login";
import ResetPassword from "../pages/Auth/ResetPassword";
import Auth from "../pages/Auth/Signup";
import Chat from "../pages/Chat/Chat";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import Users from "../pages/Users/Users";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Auth />} />
        <Route path="/forgotten_password" element={<Forgotpassword />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              {" "}
              <Home />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/chats"
          element={
            <PrivateRoute>
              {" "}
              <Chat />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              {" "}
              <Users />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/changePassord/:id"
          element={
            <PrivateRoute>
              {" "}
              <ChangePassord />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <Profile />{" "}
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
