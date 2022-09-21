import React, { useState, useEffect, useReducer } from "react";
import { Result } from "../types/http";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import * as api from '../api';
import { Role, UserDetail } from "../types/user";
import NewUserForm from "./NewUserForm";

export default function HomeManager() {
  const [showForm, setShowForm] = useReducer((s) => s + 1, 0);
  const [users, setUsers] = useState<Array<UserDetail>>([]);
  const { currentUser } = useAuth();
  const userNow: UserDetail = currentUser.detail;

  useEffect(() => {
    const getUsers1 = async () => {
      const users = await api.getUsersReq(userNow.orgId);
      setUsers(users);
    };

    getUsers1();
  }, [userNow.orgId]);

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
          <th>Rol</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {users.map(user => {
          const isSelf: boolean = user.emailId === userNow.emailId;

          return <React.Fragment key={user.emailId}>
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role === Role.Manager ? "Manager" : "User"}</td>
              <td style={{ width: 150 }}>
                {isSelf || <button className='btn btn-danger' onClick={mkDeleteFunc(user)}>Verwijderen</button>}
              </td>
            </tr>
          </React.Fragment>;
        })}
      </tbody>
    </table>;
  };

  const addPersonToUI = (user: UserDetail) => {
    setUsers(users.concat(user));
  };

  return (
    <>
      <header className="d-flex justify-content-between" style={{ padding: '20px 0' }}>
        <h3>Gebruikers voor {userNow.orgName}</h3>
        <div>
          <Link className="btn btn-secondary" style={{ marginRight: 20 }} to="/new-qr">Maak QR-code</Link>
          <button className="btn btn-primary" style={{ marginRight: 26 }} onClick={setShowForm}>Gebruiker toevoegen</button>
        </div>
      </header>

      <NewUserForm orgNowId={userNow.orgId} orgNowName={userNow.orgName} showForm={showForm} addPersonToUI={addPersonToUI} />

      {renderTable(users)}
    </>
  );
}
