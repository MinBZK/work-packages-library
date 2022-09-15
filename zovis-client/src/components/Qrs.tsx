import React, { useRef, useState, useEffect } from "react";
import { Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as api from '../api';
import { OrgDetail } from "../types/org";
import { Filter, QrAdminDetail } from "../types/qr";
import { Role } from "../types/user";
import { useAuth } from "../contexts/AuthContext";

import logo from '../assets/img/logo.png'

const parseDate = (input: string): number => {
  const dirtyPieces: string[] = input.split('.');

  const clean: string[] = [];
  for (const piece of dirtyPieces) {
    clean.push(piece.trim());
  }

  const [day, month, year] = clean;
  const _miliseconds: number = Date.parse(`${year}-${month}-${day}`);

  return _miliseconds;
};

const getTable = (items: QrAdminDetail[]) => {
  if (items.length === 0) {
    return <div>0 result</div>;
  }

  return <table className="table table-striped table-hover table-borderless mt-4">
    <thead>
      <tr>
        <th>Gebruiker</th>
        <th>Organisatie</th>
        <th>Aanmaakdatum QR</th>
        <th>Gebruiksdatum QR</th>
      </tr>
    </thead>

    <tbody>
      {items.map(item => {
        return <React.Fragment key={item.qrId}>
          <tr>
            <td>{item.creatorName}</td>
            <td>{item.orgName}</td>
            <td>{item.createdAt}</td>
            <td>{item.usedAt}</td>
          </tr>
        </React.Fragment>;
      })}
    </tbody>
  </table>;
};

export default function Qrs() {
  const startRef = useRef<HTMLInputElement>();
  const endRef = useRef<HTMLInputElement>();
  const orgRef = useRef<HTMLSelectElement>();
  const { currentUser, logout } = useAuth();

  const [orgs, setOrgs] = useState<OrgDetail[]>([]);
  const [qrs, setqrs] = useState<QrAdminDetail[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getOrgs1 = async () => {
      const orgs = await api.getOrgsReq();
      setOrgs(orgs);
    };

    getOrgs1();

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const startTimestamp = parseDate(startRef.current.value);
      const formatAdvice: string = 'Gebruik DD.MM.YYYY formaat';

      if (isNaN(startTimestamp)) {
        alert("Startdatum ongeldig. " + formatAdvice);
        return;
      }

      const endTime = parseDate(endRef.current.value);
      if (isNaN(endTime)) {
        alert("Einddatum ongeldig. " + formatAdvice);
        return;
      }

      const filter: Filter = {
        startTime: startTimestamp,
        endTime,
        orgId: orgRef.current.value
      };
      const qrList = await api.searchQrList(filter);
      setqrs(qrList);

    } catch (e) {
      alert("Error. " + e.toString());
    }

    setLoading(false);

  };


  async function handleLogout() {
    await logout();
  }

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
                <Link className="toplink" to="/users" >
                  Gebruikers
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
          <div className="m-4">
            <Form onSubmit={handleSubmit} className="d-flex justify-content-between flex-wrap">
              <Form.Group>
                <Form.Label>Startdatum</Form.Label>
                <Form.Control placeholder="25.12.2020" type="text" ref={startRef} required />
              </Form.Group>

              <Form.Group>
                <Form.Label>Einddatum</Form.Label>
                <Form.Control placeholder="26.12.2020" type="text" ref={endRef} required />
              </Form.Group>

              <Form.Group style={{ minWidth: 330 }}>
                <Form.Label>Organisatie</Form.Label>

                <Form.Control
                  as="select"
                  custom
                  ref={orgRef}
                  required
                >
                  {
                    orgs.map(org => <option key={org.id} value={org.id}>{org.name}</option>)
                  }

                </Form.Control>
              </Form.Group>
              <button type="submit" className="btn btn-primary" style={{ height: 40, marginTop: 30 }} disabled={loading}>{loading ? "Searching..." : "Search"}</button>
            </Form>
          </div>

          {loading || getTable(qrs)}

        </Card.Body>
      </Card>

    </>
  );
}
