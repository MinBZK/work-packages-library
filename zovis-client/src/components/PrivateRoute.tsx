import React from "react";
import { Redirect } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component, onlyRoles, ...rest }) {

  const { currentUser, logout } = useAuth();


  async function handleLogout() {
    await logout();
  }

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if (!currentUser.emailVerified) {
    return <>
      <div>
        <Button variant="link" onClick={handleLogout}>
          Verify later
        </Button>
      </div>

      <h3>Please verify your email to continue</h3>
    </>;
  }

  if (onlyRoles.includes(currentUser.detail.role)) {
    return <Component />;
  }

  return <Redirect to="/" />;
}
