import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import * as api from '../api';
import { NewOrg } from "../types/org";


export default function NewOrgForm({ addOrgToUI, showForm }) {
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
      setError("");
      setLoading(true);

      const name: string = nameRef.current.value.trim();

      if (!name) {
        alert("Invalid name");
        return;
      }

      const newOrg: NewOrg = {
        name,
      };

      const orgCreated = await api.addOrg(newOrg);
      addOrgToUI(orgCreated);

    } catch (err) {
      //console.log('err: ', e);
      setError("Failed to add organization. " + err.toString());
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
          <Modal.Title>Organisatie toevoegen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control type="text" ref={nameRef} required placeholder="Organisatienaam" />
            </Form.Group>
          </Form>
          {loading && <Alert variant="info">Bezig met toevoegen...</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} variant="primary" onClick={handleSubmit}>
            Toevoegen
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
