import React,{ Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import Login from "../pages/Auth/Login";
import Auth from "../pages/Auth/Signup";
import Home from "../pages/home/Home";

const Forgotpassword = React.lazy(() => import("../pages/Auth/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../pages/Auth/ResetPassword"));
const Chat = React.lazy(() => import("../pages/Chat/Chat"));
const Profile = React.lazy(() => import("../pages/profile/Profile"));
const Users = React.lazy(() => import("../pages/Users/Users"));
const ChangePassord = React.lazy(() => import("../pages/Auth/ChangePassord"));
const Error = React.lazy(() => import("../components/Error/Error"));

const AllRoutes = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Auth />} />
          <Route path="/forgotten_password" element={<Forgotpassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
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
      </Suspense>
    </>
  );
};

export default AllRoutes;
