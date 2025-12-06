import Input from "../components/Input"
import React, { useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


// Full Login page
// handleLogin happens inside of the try block of handleSubmit


export default function Login() {
  const { setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e){
    e.preventDefault();

    const loginInfo = { email, password };

    try {
      const response = await axios.post('api/login', loginInfo);
      handleLogin(response.data.user_id);
    } catch(error){
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setErrorMessage("No matching credentials found: Email or password is incorrect.");
            break;
          default:
            setErrorMessage("Login failed. Try again.");
        }
      }
    }
  }

  function handleLogin(user_id){
    setLoggedInUser(user_id);
    navigate("/");
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        {errorMessage && <p className="errorMessage">{errorMessage}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <Input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              name="email"
              type="email"
            />
          </label>

          <label>
            Password
            <Input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              name="password" 
              type="password"
            />
          </label>

          <button className="auth-button" type="submit">Login</button>
        </form>
      </div>
    </div>
  )
}
