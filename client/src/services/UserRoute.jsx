import React from "react";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/auth/authSlice";
import { Navigate } from "react-router-dom";

function UserRoute({ children }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return <> {isLoggedIn === true ? children : <Navigate to={"/"} />}</>;
}

export default UserRoute;
