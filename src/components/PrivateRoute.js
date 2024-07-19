import { Navigate, Outlet } from "react-router-dom";

import React from "react";
import useAuthState from "./../hooks/useAuthState";
import Spinner from "./Spinner";

const PrivateRoute = () => {
  const { loggedIn, checkState } = useAuthState();

  if (checkState) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner />
      </div>
    );
  }

  return loggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
