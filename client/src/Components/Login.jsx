import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, InputGroup, Form, Button, Alert } from "react-bootstrap"; // Import Alert from react-bootstrap
import "../styles/login_page.css";
import background_login from "../images/ai_2.png";

const Login = (props) => {
  const { handleChange } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store error message
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Simple client-side validation
      if (!username || !password) {
        setError('Enter Post Username and password');
        return;
      }

      // Make a POST request to the backend API for login
      const response = await fetch(`/api/login/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.authToken === "username or password donot match") {
        setError("Username or Password don't match");
      } else {
        const expirationTime = 1 * 24 * 60 * 60; // 1 day in seconds

        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + expirationTime * 1000);
        document.cookie = `authToken=${data.authToken}; SameSite=None; Secure; Max-Age=${expirationTime}; Expires=${expirationDate.toUTCString()}`;
        // document.cookie = `authToken=${data.authToken}; SameSite=None; Secure`;
        setPassword("");
        setUsername("");
        navigate(`/profile/${data.id}`);
      }
    } catch (error) {
      setError('Server error during login');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Card.Title className="text-center login-title">Tech Amigos Login</Card.Title>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>} {/* Display error message */}
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Username</InputGroup.Text>
            <Form.Control
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
            <Form.Control
              type="password"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          <div className="buttons-login">
            <Button as="input" type="submit" value="Login" onClick={handleLogin} />
            <Button
              variant="link"
              onClick={() => {
                handleChange("REGISTER");
              }}
              className="register-link"
            >
              Don't have an account?
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
