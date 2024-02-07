import React, { useState } from "react";
import { Card, InputGroup, Form, Button,Alert } from "react-bootstrap";
import "../styles/style.css";
import bcrypt from "bcryptjs";
import "../styles/register_page.css";
import background_login from "../images/british_ai.png";


const Register = (props) => {
  const { handleChange } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(""); // State to store error message

  const handleRegister = async () => {
    try {
      // Simple client-side validation (You may want to perform more thorough validation)
      if (!username || !password || password !== confirmPassword) {
        if(!username)
        setError("Enter username");
        else if(!password)
        setError("Enter Password");
        else
        setError("Password don't match");
        return;
      }
       // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
      // Make a POST request to the backend API
      await fetch(`/api/signup/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password: hashedPassword,confirmPassword: hashedPassword}),
      });

    //   const data = await response.json();
      //console.log(data); // Log the response from the server

      // Redirect to login or handle success accordingly
      // For simplicity, let's assume success redirects to login
      handleChange("LOGIN");
    } catch (error) {
      setError('Server Error!!!')
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-container" >
      <Card className="register-card">
        <Card.Title className="card-title">Tech Amigos Register</Card.Title>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Username</InputGroup.Text>
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
            <Form.Control
              type="password"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Confirm Password</InputGroup.Text>
            <Form.Control
              type="password"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </InputGroup>
          <div className="buttons-login">
            <Button as="input" type="button" value="Register" onClick={handleRegister} />
            <Button
              variant="link"
              onClick={() => {
                handleChange("LOGIN");
              }}
            >Login Now</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
