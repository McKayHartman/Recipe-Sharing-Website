import React, { useState } from "react"
import axios from "axios"
import Input from "../components/Input"
import { useNavigate } from 'react-router-dom' 

export default function CreateAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const account = { email, username, password };

  async function handleSubmit() {
    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('api/create-account', account);
      navigate('/login')
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Error Creating Account");
      }
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create Your Account</h2>

        {errorMessage && <h3 className="errorMessage">{errorMessage}</h3>}

        <form className="auth-form">
          <label>
            Email:
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
            />
          </label>

          <label>
            Username:
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your display name"
            />
          </label>

          <label>
            Password:
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter a safe password"
            />
          </label>

          <label>
            Repeat Password:
            <Input
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              type="password"
              placeholder="Repeat your password"
            />
          </label>

          <button
            type="submit"
            className="auth-button"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
