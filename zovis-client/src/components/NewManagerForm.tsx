import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Modal, Alert } from "react-bootstrap";
import { auth } from '../firebase';
import { OrgDetail } from "../types/org";
import * as api from '../api';
import { NewPerson } from "../types/user";
import { isValidEmailStr } from "../util";

export default function NewManagerForm({ addPersonToUI, showForm }) {
  const emailRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();
  const orgRef = useRef<HTMLSelectElement>();
  const [orgs, setOrgs] = useState<OrgDetail[]>([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const getOrgs1 = async () => {
      const orgs = await api.getOrgsReq();
      setOrgs(orgs);
    };

    getOrgs1();

  }, []);

  useEffect(() => {
    showForm && setShow(true);
  }, [showForm])

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const email: string = emailRef.current.value.trim();

      if (!isValidEmailStr(email)) {
        alert("Invalid email format");
        return;
      }

      setLoading(true);

      const newPerson: NewPerson = {
        name: nameRef.current.value,
        email,
        orgId: orgRef.current.value,
        isManager: true
      };

      const managerCreated = await api.addPerson(newPerson);
      addPersonToUI(managerCreated);

      auth.sendPasswordResetEmail(managerCreated.email);

    } catch (e) {
      console.log('add manager e: ', e);
      alert("Failed to add user " + e.toString());
    }
    resetForm();

  }

  const resetForm = () => {
    if (!loading) {
      setShow(false);
      setLoading(false);
    }
  }

  return (
    <>
      <Modal animation={false} show={show} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>Gebruiker toevoegen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Rol</Form.Label>
              <Form.Control type="text" value='Manager' disabled />
            </Form.Group>
            <Form.Group>
              <Form.Label>Naam</Form.Label>
              <Form.Control type="text" ref={nameRef} placeholder="Naam"
                required />
            </Form.Group>
            <Form.Group>
              <Form.Label>E-mailadres</Form.Label>
              <Form.Control type="email" ref={emailRef} required placeholder="E-mailadres" />
            </Form.Group>
            <Form.Group>
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
          </Form>
          {loading && <Alert variant="info">Bezig met uitnodigen...</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} variant="primary" onClick={handleSubmit}>
            Uitnodiging sturen
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
