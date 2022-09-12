import React, { useRef, useState } from "react"
import logo from '../assets/img/logo.png'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, Redirect } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null)

  const { resetPassword, currentUser } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [btnDisabled, setBtnDisabled] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      await resetPassword(emailRef.current.value)
      setBtnDisabled(true)
      setMessage("Please check your email")
    } catch {
      setBtnDisabled(false)
      setError("Something is wrong")
    }
  }

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <>
      <header className="logo-header">
        <img src={logo} alt="Financieel Paspoort" width='300' />
      </header>

      <Card  style={{ maxWidth: 350, margin: "auto" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>E-mailadres</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={btnDisabled} className="w-100 mybtn1" type="submit">
              Continue
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Back to Login</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
