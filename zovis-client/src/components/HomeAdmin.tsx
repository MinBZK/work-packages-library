import React, { useState, useEffect, useReducer } from "react";
import * as api from '../api';
import { OrgDetail } from "../types/org";
import NewOrgForm from './NewOrgForm';

export default function HomeAdmin() {
  const [loading, setLoading] = useState<boolean>(true);
  const [showNewOrgForm, setShowNewOrgForm] = useReducer((s) => s + 1, 0);

  const [orgs, setOrgs] = useState<Array<OrgDetail>>([]);

  useEffect(() => {
    const getOrgs1 = async () => {
      try {
        const orgs = await api.getOrgsReq();
        setOrgs(orgs);
      } catch (e) {
        console.log('useEffect getOrgs1 e:', e);
        alert('Error listing organizations. ' + e.toString());
      }

      setLoading(false);
    };

    getOrgs1();

  }, []);

  const mkDeleteFunc = (org: OrgDetail) => {
    return async () => {
      if (window.confirm(`${org.name}, inclusief gebruikers en QR codes verwijderen?`)) {
        try {
          const res = await api.delOrg(org.id);

          if (res.code === 200) {
            setOrgs(orgs.filter(u => u.id !== org.id));

          } else {
            alert("Verwijderen mislukt " + res.message);

          }

        } catch (e) {
          console.log('mkDeleteFunc e: ', e);
          alert("Verwijderen mislukt " + e.toString());
        }
      }
    };
  };

  const getOrgsTable = (orgs: OrgDetail[]) => {
    if (orgs.length === 0) {
      return <div>Nog geen organisaties. Voeg een nieuwe toe.</div>;
    }

    return <table className="table table-striped table-hover table-borderless mt-4">
      <tbody>
        {orgs.map(org => {
          return <React.Fragment key={org.id}>
            <tr>
              <td>{org.name}</td>
              <td style={{ width: 150 }}>
                <button className='btn btn-danger' onClick={mkDeleteFunc(org)}>Verwijderen</button>
              </td>
            </tr>
          </React.Fragment>;
        })}
      </tbody>
    </table>;
  };

  const addOrgToUI = (org: OrgDetail) => {
    setOrgs(orgs.concat(org));
  };

  if (loading) return <div style={{ color: '#fff' }}>Bezig...</div>;

  return (
    <>
      <header className="d-flex justify-content-between" style={{ padding: '20px 0' }}>
        <h3>Organisatieoverzicht</h3>
        <button className="btn btn-primary" style={{ width: 110, marginRight: 26 }} onClick={setShowNewOrgForm}>Toevoegen</button>
      </header>

      <NewOrgForm addOrgToUI={addOrgToUI} showForm={showNewOrgForm} />

      {getOrgsTable(orgs)}


    </>
  );
}
