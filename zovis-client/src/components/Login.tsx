import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Redirect, Link } from "react-router-dom"

import logo from '../assets/img/logo.png'


export default function Login() {
  const { currentUser, login } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (currentUser) {
    return <Redirect to="/" />
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError("Wrong input")
      setLoading(false)
    }
  }

  return (
    <>
      <header className="logo-header">
        <img src={logo} alt="" width='300' />
      </header>
      <Card style={{ maxWidth: 350, margin: "auto" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Inloggen</h2>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>E-mailadres</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Wachtwoord</Form.Label>
              <Form.Control type="password" ref={passwordRef}
                required />
            </Form.Group>
            <Button disabled={loading} className="w-100 loginbtn" type="submit">
              Log In
            </Button>
          </Form>

          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

        </Card.Body>
      </Card>
    </>
  )
}
