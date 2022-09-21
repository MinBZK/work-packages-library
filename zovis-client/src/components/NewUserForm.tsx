import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { auth } from '../firebase';
import { isValidEmailStr } from "../util";
import * as api from '../api';
import { NewPerson } from "../types/user";

type NewUserFormProps = { showForm: any, addPersonToUI: any, orgNowName: string, orgNowId: string; }

export default function NewUserForm({ addPersonToUI, showForm, orgNowName, orgNowId }: NewUserFormProps) {
  const emailRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

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

      setError("");
      setLoading(true);

      const newPerson: NewPerson = {
        name: nameRef.current.value,
        email,
        orgId: orgNowId,
        isManager: false
      };
      const personCreated = await api.addPerson(newPerson);
      addPersonToUI(personCreated);

      auth.sendPasswordResetEmail(personCreated.email);

    } catch (e) {
      setLoading(false);
      setError("Failed to add user " + e.toString());
      console.log('add user e', e);
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
      {error && <Alert variant="danger">{error}</Alert>}

      <Modal animation={false} show={show} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>Gebruiker toevoegen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Rol</Form.Label>
              <Form.Control type="text" value='User' disabled />
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
              <Form.Label>Organization</Form.Label>

              <Form.Control type="text" value={orgNowName} disabled required />
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
