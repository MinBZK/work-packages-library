import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Role } from "../types/user";
import HomeAdmin from "./HomeAdmin";
import HomeManager from "./HomeManager";
import HomeUser from "./HomeUser";

import logo from '../assets/img/logo.png'

import { Link } from "react-router-dom";

export default function Dashboard() {
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  const renderUiForRole = (role: Role) => {
    if (role === Role.Admin) {
      return <HomeAdmin />;
    } else if (role === Role.Manager) {
      return <HomeManager />;
    }

    return <HomeUser />;
  };

  return (
    <>
      <header className="logo-header">
        <img src={logo} alt="" width='300' />
        <div className="d-flex justify-content-between w-100">
          <div style={{ color: '#fff', paddingLeft: 10 }}>Welkom, {currentUser.detail.name}</div>
          <div className="d-flex">
            {currentUser.detail.role === Role.Admin &&
              <div>
                <Link className="toplink" to="/users" >
                  Gebruikers
              </Link>
                <Link className="toplink" to="/billing" >
                  Facturatie
              </Link>
              </div>
            }
            <button className="toplink" style={{ paddingRight: 10, cursor: 'pointer' }} onClick={handleLogout} >
              Uitloggen
          </button>
          </div>
        </div>
      </header>

      <Card>
        <Card.Body>
          {renderUiForRole(currentUser.detail.role)}
        </Card.Body>
      </Card>
    </>
  );
}
