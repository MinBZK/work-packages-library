import React, { useState, useEffect, useReducer } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as api from '../api';
import { Role, UserDetail } from "../types/user";
import NewManagerForm from './NewManagerForm';
import { Result } from "../types/http";
import { useAuth } from "../contexts/AuthContext";

import logo from '../assets/img/logo.png'

export default function Users() {
  const [showForm, setShowForm] = useReducer((s) => s + 1, 0);
  const [loading, setloading] = useState<boolean>(true);
  const [users, setUsers] = useState<Array<UserDetail>>([]);
  const { currentUser, logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  useEffect(() => {
    const getUsers1 = async () => {
      const users = await api.getUsersReq();
      setUsers(users);
      setloading(false);
    };
    getUsers1();
  }, []);

  const mkDeleteFunc = (user: UserDetail) => {
    return async () => {

      if (window.confirm(`Deleting ${user.name}?`)) {
        try {
          const res: Result = await api.delPerson(user.emailId);

          if (res.code === 200) {
            setUsers(users.filter(u => u.emailId !== user.emailId));
          } else {
            alert(res.message || "Error");
          }

        } catch (e) {
          console.log('mkDeleteFunc e:', e);
          alert("Error " + e.toString());
        }

      }
    };
  };

  const renderTable = (users: UserDetail[]) => {
    if (users.length === 0) {
      return <div>No users yet</div>;
    }

    return <table className="table table-striped table-hover table-borderless mt-4">
      <thead>
        <tr>
          <th>Naam</th>
          <th>E-mail</th>
          <th>Organisatie</th>
          <th>Rol</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {users.map(user => {
          return <React.Fragment key={`${user.emailId}${user.orgId}`}>
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.orgName}</td>
              <td>{user.role === Role.Manager ? "Manager" : "Gebruiker"}</td>
              <td style={{ width: 150 }}>
                <button className='btn btn-danger' onClick={mkDeleteFunc(user)}>Verwijderen</button>
              </td>
            </tr>
          </React.Fragment>;
        })}
      </tbody>
    </table>;
  };

  const addPersonToUI = (person: UserDetail) => {
    setUsers(users.concat(person));
  };

  if (loading) return <div style={{ color: '#fff' }}>Bezig...</div>;


  return (
    <>
      <header className="logo-header">
        <img src={logo} alt="" width='300' />
        <div className="d-flex justify-content-between w-100">
          <div style={{ color: '#fff', paddingLeft: 10 }}>Welkom, {currentUser.detail.name}</div>
          <div className="d-flex">
            {currentUser.detail.role === Role.Admin &&
              <div>
                <Link className="toplink" to="/" >
                  Home
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
          <header className="d-flex justify-content-between" style={{ padding: '20px 0' }}>
            <h3>Gebruikersoverzicht</h3>
            <button className="btn btn-primary" style={{ width: 110, marginRight: 26 }} onClick={setShowForm}>Toevoegen</button>
          </header>

          <NewManagerForm showForm={showForm} addPersonToUI={addPersonToUI} />

          {renderTable(users)}

        </Card.Body>
      </Card>
    </>
  );
}
