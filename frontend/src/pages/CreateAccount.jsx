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

	const account = {
		email,
		username,
		password
	}
	


	async function handleSubmit(){
		// e.preventDefault();

		// check that the passwords match
		if(password !== repeatPassword){
			setErrorMessage("Passwords do not match");
			return;
		} else {
			try{
				console.log("creating account", account);

			

				const response = await axios.post('api/create-account', account);
				console.log("account created");
				navigate('/login')

				// Return to login page
			} catch (error) {
				if (error.response) {
					setErrorMessage(error.response.data.error);

				} else {
					setErrorMessage("Error Creating Account");
				}
			}
		}
	}

	return (
		<div className="pt-20">
			{errorMessage && <h3 class="errorMessage">{errorMessage}</h3>}
			<form  className="max-w-md">
				<label>
					Email:
					<Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address"/>
				</label>

				<label>
					Username:
					<Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your display name"/>
				</label>
				
				<label>
					Password:
					<Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter a safe password"/>
				</label>

				<label>
					Repeat Password:
					<Input value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} type="password" placeholder="Repeat your password"/>
				</label>
			</form>
			<button type="submit" onClick={handleSubmit}>Create Account</button>
		</div>
	)
}